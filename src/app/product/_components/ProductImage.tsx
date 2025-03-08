"use client";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/app/categories/[categoryName]/page";

const ProductImage = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  return (
    <div>
      <div className="flex scroll-smooth overflow-hidden min-w-[552px] gap-4">
        <div className="flex flex-col gap-4">
          {product?.images.map((img: string, index: number) => (
            <div
              onClick={() => setSelectedImage(img)}
              key={index}
              className="w-[80px] h-[100px] border border-gray-200"
            >
              <Image
                width={1000}
                height={1000}
                src={img}
                alt={`Kurthi thumbnail`}
                className="w-full h-full object-contain aspect-square"
              />
            </div>
          ))}
        </div>
        <div className="w-[452px] h-[564px]">
          <Image
            width={1000}
            height={1000}
            src={selectedImage}
            alt="Selected Kurthi"
            className="w-full h-full aspect-square object-contain" // Added aspect ratio
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
