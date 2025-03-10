"use client";
import { useState } from "react";

const categories = [
  { item: "NEW COLLECTIONS", count: 84 },
  { item: "CHURIDARS", count: 42 },
  { item: "SAREES", count: 30 },
];

const HomeItems = ({category}) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col py-2 sticky top-0 h-[calc(100dvh_-_14dvh)">
      {category.map((category, index) => (
        <div
          key={index}
          onClick={() => setActive(index)}
          className={`py-2 px-4 cursor-pointer hover:text-blue-500 border-r-4 ${
            active === index
              ? "border-blue-600 text-blue-500 bg-gradient-to-r from-white to-sky-100"
              : "border-transparent"
          }`}
        >
          {category.categoryName} ({category?.products?.length})
        </div>
      ))}
    </div>
  );
};

export default HomeItems;
