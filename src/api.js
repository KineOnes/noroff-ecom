// src/api.js
const BASE_URL = "https://v2.api.noroff.dev/online-shop";

export async function fetchProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Kunne ikke hente produkter");
  const data = await res.json();
  // Noen APIer returnerer { data: [...] } — vi håndterer begge
  return Array.isArray(data) ? data : data.data || [];
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Kunne ikke hente produkt");
  const data = await res.json();
  return data.data || data; // samme grep her
}
