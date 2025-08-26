import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

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

  // lagre i localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // avledet data
  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    [cart]
  );

  const value = {
    cart,
    count,
    total,
    add: (product) => {
      // vi bruker alltid discountedPrice om den finnes
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
    },
    decrement: (id) => dispatch({ type: "DECREMENT", payload: id }),
    remove: (id) => dispatch({ type: "REMOVE", payload: id }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider/>");
  return ctx;
}
