export interface CartItem {
  id: number;
  name: string;
  price: string;
  type: string;
  warranty: string;
  image: string;
  quantity: number;
}

const CART_STORAGE_KEY = "partgo_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  if (!cartData) return [];

  try {
    return JSON.parse(cartData);
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(
  product: Omit<CartItem, "quantity">,
  quantity: number = 1,
): void {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
}

export function updateCartItemQuantity(
  productId: number,
  quantity: number,
): void {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
}

export function removeFromCart(productId: number): void {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCart(updatedCart);
}

export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[$.]/g, ""));
    return total + price * item.quantity;
  }, 0);
}

export function getCartCount(): number {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}
