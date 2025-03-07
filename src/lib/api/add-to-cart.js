import { db } from "@/firebase/firebase";
import {  doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Generate a unique session ID
// Generate a unique session ID for unregistered users



// Add product to cart for unregistered user
export async function addProductToCart(product, userId = null) {
  let cartId;

  if (userId) {
    // For registered users, use the userId as the cart ID
    cartId = userId;
  } else {
    // For unregistered users, use the sessionId or sign in anonymously
    const user = auth.currentUser;

    if (user) {
      // If the user is already signed in anonymously, use their UID
      cartId = user.uid;
    } else {
      // Sign in anonymously and get the UID
      try {
        const userCredential = await signInAnonymously(auth);
        cartId = userCredential.user.uid;
      } catch (error) {
        console.error("Error signing in anonymously: ", error);
        return;
      }
    }
  }

  const cartRef = doc(db, "carts", cartId);

  try {
    const cartSnapshot = await getDoc(cartRef);

    if (!cartSnapshot.exists()) {
      // If the cart doesn't exist, create a new cart with the product
      await setDoc(cartRef, {
        userId: cartId,
        products: [{ ...product, quantity: 1 }], // Add the first product with quantity 1
        createdAt: new Date(),
      });
      console.log("New cart created and product added!");
    } else {
      // If the cart exists, check if the product is already in the cart
      const cartData = cartSnapshot.data();
      const existingProductIndex = cartData.products.findIndex(
        (p) => p.id === product.id
      );

      if (existingProductIndex !== -1) {
        // If the product exists, increment the quantity
        const updatedProducts = [...cartData.products];
        updatedProducts[existingProductIndex].quantity += 1;

        await updateDoc(cartRef, {
          products: updatedProducts,
        });
        console.log("Product quantity updated in cart!");
      } else {
        // If the product doesn't exist, add it to the cart
        await updateDoc(cartRef, {
          products: [...cartData.products, { ...product, quantity: 1 }],
        });
        console.log("New product added to cart!");
      }
    }
  } catch (error) {
    console.error("Error adding product to cart: ", error);
  }
}