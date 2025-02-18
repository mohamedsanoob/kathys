"use client";
import { useState } from "react";

const categories = [
  { item: "NEW COLLECTIONS", count: 84 },
  { item: "CHURIDARS", count: 42 },
  { item: "SAREES", count: 30 },
];

const HomeItems = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col py-2">
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => setActive(index)}
          className={`py-2 px-4 cursor-pointer hover:bg-gradient-to-r hover:from-white hover:to-sky-100 border-r-4 ${
            active === index
              ? "border-blue-600 text-blue-500"
              : "border-transparent"
          }`}
        >
          {category.item} ({category.count})
        </div>
      ))}
    </div>
  );
};

export default HomeItems;
