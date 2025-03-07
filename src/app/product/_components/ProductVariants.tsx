"use client";
import { useState } from "react";
import { Product } from "@/app/categories/[categoryName]/page";

interface Variant {
  optionName: string;
  optionValue: string[];
}

const ProductVariants = ({ product }: { product: Product }) => {
  const [selectedOption, setSelectedOption] = useState<string>();
  return (
    <div>
      <div className="flex flex-col gap-4">
        {product.variants?.map((variant: Variant, index: number) => (
          <div key={index}>
            <div className="flex justify-between">
              <p className="">Select {variant.optionName}</p>
              <p>Size chart</p>
            </div>

            <div className="flex gap-4">
              {variant.optionValue.map((option: string, index: number) => (
                <div
                  key={index}
                  className={`border rounded-md py-2 px-4 text-sm hover:bg-gray-200 hover:border-black ${
                    selectedOption === option && "bg-gray-200 border-black"
                  }`}
                  onClick={() => setSelectedOption(option)}
                  aria-label={"label"} // Added aria label
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          className="mt-4 border hover:bg-green-200 border-green-600 text-green-700 py-2 px-4 rounded"
          // disabled={!selectedSize} // Disable if no size selected
        >
          Add to Cart
        </button>
        <button
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded"
          // disabled={!selectedSize} // Disable if no size selected
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductVariants;
