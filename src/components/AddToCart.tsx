"use client";
import { addProductToCart, getCart } from "@/lib/api/add-to-cart";
import { useEffect, useState } from "react";

interface Product {
  id: string;
}

const AddToCart = ({ product }: { product: Product }) => {
  const [productCount, setProductCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get cart items and find quantity for this specific product
    getCart().then((cartItems) => {
      const item = cartItems.find((item) => item.productId === product.id);
      setProductCount(item ? item.quantity : 0);
    });
  }, [product.id]);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      await addProductToCart({
        productId: product.id,
        quantity: 1,
      });
      setProductCount((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReduceCart = async () => {
    try {
      setIsLoading(true);
      await addProductToCart({
        productId: product.id,
        quantity: -1,
      });
      setProductCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to reduce from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {productCount > 0 && (
        <button
          className="border border-blue-500 rounded-md hover:bg-blue-100 px-3 py-0.5 disabled:opacity-50"
          onClick={handleReduceCart}
          disabled={isLoading}
        >
          -
        </button>
      )}
      <button
        className="border border-blue-500 rounded-md hover:bg-blue-100 px-3 py-0.5 disabled:opacity-50"
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : productCount > 0 ? productCount : "ADD"}
      </button>
      {productCount > 0 && (
        <button
          className="border border-blue-500 rounded-md hover:bg-blue-100 px-3 py-0.5 disabled:opacity-50"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          +
        </button>
      )}
    </div>
  );
};

export default AddToCart;
