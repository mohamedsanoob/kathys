"use client";
import { addProductToCart, getCart } from "@/lib/api/add-to-cart";
import { useEffect, useState, useCallback, useMemo } from "react";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchCartAndProducts = useCallback(async () => {
    try {
      const items = await getCart();
      const validItems = items.filter((item) => item.quantity > 0);
      setCartItems(validItems);

      const productPromises = validItems.map(async (item) => {
        const productRef = doc(db, "products", item.productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          return {
            ...productSnap.data(),
            id: productSnap.id,
            quantity: item.quantity,
          };
        }
        return null;
      });

      const productDetails = await Promise.all(productPromises);
      setProducts(productDetails.filter(Boolean));
    } catch (error) {
      console.error("Failed to fetch cart and products:", error);
    }
  }, []);

  useEffect(() => {
    fetchCartAndProducts();
  }, [fetchCartAndProducts]);

  const totalAmount = useMemo(() => 
    products.reduce((sum, product) => 
      sum + product.productPrice * product.quantity, 0
    ), [products]
  );

  const handleQuantityToggle = useCallback((productId, isOpen) => {
    setProducts(products => 
      products.map(p => ({
        ...p,
        isOpen: p.id === productId ? isOpen : false,
      }))
    );
  }, []);

  const handleRemoveItem = useCallback(async (productId, quantity) => {
    try {
      await addProductToCart({
        productId,
        quantity: -quantity,
      });
      setProducts(products => products.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  }, []);

  const handleQuantityChange = useCallback(async (productId, newQuantity) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      const quantityDiff = newQuantity - product.quantity;
      await addProductToCart({
        productId,
        quantity: quantityDiff,
      });
      
      setProducts(products =>
        products.map(p =>
          p.id === productId
            ? { ...p, quantity: newQuantity, isOpen: false }
            : p
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  }, [products]);

  const ProductQuantityButtons = ({ product }) => (
    <div
      className={`${
        !product.isOpen && "hidden"
      } flex w-[8%] p-1 flex-col gap-2 border border-gray-200 mt-[6rem] rounded-md absolute bg-white shadow-md z-10`}
    >
      {[...Array(3)].map((_, i) => (
        <button
          key={i}
          onClick={() => handleQuantityChange(product.id, i + 1)}
          className={`flex items-center justify-center cursor-pointer hover:bg-black hover:text-white rounded ${
            product.quantity === i + 1 ? "bg-black text-white" : ""
          }`}
          disabled={i + 1 > product.unitQuantity}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-xl font-[500]">Shopping Cart</p>
        <p className="text-lg font-[500]">Total {totalAmount}</p>
      </div>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-start border border-gray-200 p-4 rounded-md"
        >
          <div className="flex gap-4">
            <Image
              src={product.images[0]}
              alt={product.productName}
              width={1000}
              height={1000}
              className="w-[121px] h-[121px] rounded-md border border-gray-200 object-contain"
            />
            <div className="flex flex-col gap-1">
              <p>{product.productName.toUpperCase()}</p>
              <p className="text-gray-600">₹ {product.productPrice}</p>
              <div className="flex justify-between w-[fit-content] gap-2 border border-gray-200 px-2 py-1 rounded-md">
                <p>Qty:{product.quantity}</p>
                {!product.isOpen ? (
                  <ChevronDown
                    onClick={() => handleQuantityToggle(product.id, true)}
                    className="cursor-pointer"
                  />
                ) : (
                  <ChevronUp
                    onClick={() => handleQuantityToggle(product.id, false)}
                    className="cursor-pointer"
                  />
                )}
              </div>
              <ProductQuantityButtons product={product} />
            </div>
          </div>
          <button
            onClick={() => handleRemoveItem(product.id, product.quantity)}
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
