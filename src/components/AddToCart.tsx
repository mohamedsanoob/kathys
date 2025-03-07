'use client'
import { addProductToCart } from "@/lib/api/add-to-cart";

interface Product {
  id: string;
}

const AddToCart = ({ product }: { product: Product }) => {
  const handleAddToCart = () => {
    addProductToCart({
      productId: product.id,
      quantity: 1,
    });
  };

  return (
    <button
      className="border border-blue-500 rounded-md hover:bg-blue-100 w-auto px-3 py-0.5"
      onClick={handleAddToCart}
    >
      ADD +
    </button>
  );
};

export default AddToCart;
