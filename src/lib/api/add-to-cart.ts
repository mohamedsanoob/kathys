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

interface Combination {
  name: string;
  value: string;
}

interface VariantDetail {
  combination: Combination[];
  discountedPrice: number;
  inventory: number;
  price: number;
  sku: string;
}

interface CartProduct {
  productId: string;
  quantity: number;
  variantDetails?: VariantDetail;
}

interface CartData {
  userId: string | null;
  products: CartProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export async function addProductToCart({
  productId,
  variantDetails,
  quantity,
  availableStock,
}: {
  productId: string;
  variantDetails?: VariantDetail;
  quantity: number;
  availableStock?: number;
}): Promise<void> {
  console.log(variantDetails, "variantDetails");
  console.log(quantity, "quantiyi");

  try {
    const stockQuantity = variantDetails?.inventory ?? availableStock ?? 0; // Use availableStock if variantDetails.inventory is not present

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
      if (quantity > stockQuantity) {
        throw new Error("Requested quantity exceeds available stock");
      }

      await setDoc(cartRef, {
        userId: isLoggedIn ? cartId : null,
        products: [{ productId, quantity, variantDetails }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return;
    }

    const { products } = cartSnapshot.data() as CartData;
    const existingProductIndex = products.findIndex(
      (p) =>
        p.productId === productId &&
        JSON.stringify(p.variantDetails?.combination || []) ===
          JSON.stringify(variantDetails?.combination || [])
    );

    console.log(existingProductIndex, "existingProductIndex");

    let newQuantity;
    if (existingProductIndex >= 0) {
      newQuantity = products[existingProductIndex].quantity + quantity;
    } else {
      newQuantity = quantity;
    }

    if (newQuantity > stockQuantity) {
      throw new Error(
        `Requested quantity exceeds available stock. Available: ${stockQuantity}`
      );
    }

    const updatedProducts =
      existingProductIndex >= 0
        ? products.map((product, index) =>
            index === existingProductIndex
              ? { ...product, quantity: newQuantity }
              : product
          )
        : [...products, { productId, quantity, variantDetails }];

    console.log(updatedProducts, "updatedProducts");

    await updateDoc(cartRef, {
      products: updatedProducts,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error managing cart:", error);
    throw error;
  }
}
