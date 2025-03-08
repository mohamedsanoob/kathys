import { db } from "@/firebase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface CartProduct {
  productId: string;
  quantity: number;
}

interface CartData {
  userId: string | null;
  products: CartProduct[];
  createdAt: Date;
  updatedAt: Date;
}

const auth = getAuth();

export async function getCart() {
  const user = auth.currentUser;
  const cartId = user?.uid || localStorage.getItem("guestCartId");

  if (!cartId) return [];

  const isLoggedIn = user && !user.isAnonymous;
  const cartRef = doc(db, `${isLoggedIn ? "" : "guest-"}carts`, cartId);
  const cartSnapshot = await getDoc(cartRef);

  if (!cartSnapshot.exists()) return [];

  const { products } = cartSnapshot.data() as CartData;
  return products;
}

export async function getCartCount() {
  const user = auth.currentUser;
  const cartId = user?.uid || localStorage.getItem("guestCartId");

  if (!cartId) return 0;

  const isLoggedIn = user && !user.isAnonymous;
  const cartRef = doc(db, `${isLoggedIn ? "" : "guest-"}carts`, cartId);
  const cartSnapshot = await getDoc(cartRef);

  if (!cartSnapshot.exists()) return 0;

  const { products } = cartSnapshot.data() as CartData;
  return products.reduce((total, { quantity }) => total + quantity, 0);
}

export async function addProductToCart({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<void> {
  try {
    // Check product stock first
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      throw new Error("Product not found");
    }

    const productData = productSnap.data();
    const stockQuantity = productData.unitQuantity || 0;

    const user = auth.currentUser;
    const isLoggedIn = user && !user.isAnonymous;

    const cartId = isLoggedIn
      ? user.uid
      : localStorage.getItem("guestCartId") || crypto.randomUUID();

    if (!isLoggedIn) {
      localStorage.setItem("guestCartId", cartId);
    }

    const cartRef = doc(db, `${isLoggedIn ? "" : "guest-"}carts`, cartId);
    const cartSnapshot = await getDoc(cartRef);

    if (!cartSnapshot.exists()) {
      // Check if requested quantity is available
      if (quantity > stockQuantity) {
        throw new Error("Requested quantity exceeds available stock");
      }

      await setDoc(cartRef, {
        userId: isLoggedIn ? cartId : null,
        products: [{ productId, quantity }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return;
    }

    const { products } = cartSnapshot.data() as CartData;
    const existingProductIndex = products.findIndex(
      (p) => p.productId === productId
    );

    let newQuantity;
    if (existingProductIndex >= 0) {
      newQuantity = products[existingProductIndex].quantity + quantity;
    } else {
      newQuantity = quantity;
    }

    // Check if total requested quantity is available
    if (newQuantity > stockQuantity) {
      throw new Error("Requested quantity exceeds available stock");
    }

    const updatedProducts =
      existingProductIndex >= 0
        ? products.map((product, index) =>
            index === existingProductIndex
              ? { ...product, quantity: newQuantity }
              : product
          )
        : [...products, { productId, quantity }];

    await updateDoc(cartRef, {
      products: updatedProducts,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error managing cart:", error);
    throw error;
  }
}
