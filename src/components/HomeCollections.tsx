'use client';
import Image from "next/image";
import React, { useState } from "react";

// Dummy data for items
const categories = [
  {
    title: "New Collections",
    items: [
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
    ],
  },
  {
    title: "Churidars",
    items: [
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
    ],
  },
  {
    title: "New Collections",
    items: [
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "BLOCK PRINTED MASHRU SILK FABRIC",
        price: 1125,
      },
    ],
  },
  {
    title: "Churidars",
    items: [
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
      {
        image:
          "https://dukaan.b-cdn.net/200x200/webp/media/712b3178-3816-4a1b-9474-f152fb7c0762.jpeg",
        name: "CHURIDAR SET",
        price: 1500,
      },
    ],
  },
];

const HomeCollections = () => {
  const [visibleItems, setVisibleItems] = useState(8);

  const handleShowAll = () => {
    setVisibleItems((prev) => prev + 8); // Load more items
  };

  return (
    <div className="flex flex-col">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="category-container">
          <div className="category-title-container">
            <h2 className="category-title sticky top-0 bg-white z-10 py-2 text-[20px] font-[500] lg:px-8 px-4">
              {category.title}
            </h2>
          </div>
          <div className="overflow-y-auto lg:px-8 px-4">
            <div className="flex flex-col gap-4">
              {category.items.slice(0, visibleItems).map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center py-2 hover:bg-gray-50"
                >
                  <div className="w-[140px] h-[140px] border border-gray-200 rounded-md">
                    <Image
                      src={item.image}
                      alt="item"
                      width={80}
                      height={50}
                      className="w-[120px] h-[120px] object-contain"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-4">
                    <a className="text-[18px] font-[500] w-[90%] leading-7 cursor-pointer hover:underline">
                      {item.name}
                    </a>
                    <div className="flex justify-between">
                      <p>${item.price}</p>
                      <div className="border border-blue-700 rounded-sm px-3 text-blue-700 cursor-pointer">
                        ADD +
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {category.items.length > visibleItems && (
              <button
                onClick={handleShowAll}
                className="text-blue-500 mt-4 py-2 rounded bg-gray-100 px-4 text-md-center flex items-center justify-center" 
              >
                See All
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeCollections;
