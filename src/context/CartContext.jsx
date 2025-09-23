// src/context/CartContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useCallback,
} from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const item = action.payload;
      const idx = state.findIndex((p) => p.id === item.id);
      if (idx === -1) {
        return [...state, { ...item, quantity: 1 }];
      }
      return state.map((p, i) =>
        i === idx ? { ...p, quantity: p.quantity + 1 } : p
      );
    }
    case "DECREMENT": {
      const id = action.payload;
      return state
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0);
    }
    case "REMOVE": {
      const id = action.payload;
      return state.filter((p) => p.id !== id);
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

const STORAGE_KEY = "cart";

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Derived data
  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    [cart]
  );

  // 👇 Memoize action creators so their references are stable
  const add = useCallback((product) => {
    const unitPrice =
      typeof product.discountedPrice === "number"
        ? product.discountedPrice
        : product.price;

    const safe = {
      id: product.id,
      title: product.title,
      image: product.image?.url || product.imageUrl || "",
      unitPrice,
    };

    dispatch({ type: "ADD", payload: safe });
  }, []);

  const decrement = useCallback((id) => {
    dispatch({ type: "DECREMENT", payload: id });
  }, []);

  const remove = useCallback((id) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  // 👇 Memoize the context value object. Had issue with infinite loop, now solved.
  const value = useMemo(
    () => ({ cart, count, total, add, decrement, remove, clear }),
    [cart, count, total, add, decrement, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider/>");
  return ctx;
}
