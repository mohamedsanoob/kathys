'use client';
import { addProductToCart, getCart } from "@/lib/api/add-to-cart";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      const items = await getCart();
      // Only keep items with quantity > 0
      const validItems = items.filter(item => item.quantity > 0);
      setCartItems(validItems);

      // Fetch product details for each valid cart item
      const productPromises = validItems.map(async (item) => {
        const productRef = doc(db, "products", item.productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          return {
            ...productSnap.data(),
            id: productSnap.id,
            quantity: item.quantity
          };
        }
        return null;
      });

      const productDetails = await Promise.all(productPromises);
      setProducts(productDetails.filter(Boolean));
    };

    fetchCartAndProducts();
  }, []);


  console.log(products,'===============')
  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <div key={product.id} className="flex justify-between">
          <div>
            <p>{product.productName}</p>
            <p className="text-gray-600">₹ {product.productPrice}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
          <button
            onClick={async () => {
              try {
                await addProductToCart({
                  productId: product.id,
                  quantity: -product.quantity,
                });
                setProducts(products.filter((p) => p.id !== product.id));
              } catch (error) {
                console.error("Failed to remove from cart:", error);
              }
            }}
            className={`text-red-500 hover:text-red-700 ${
              product.unitQuantity === 0
                ? "border border-red-500 px-2 py-1 rounded"
                : ""
            }`}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
