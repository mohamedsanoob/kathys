import React from "react";

const items = [
  {
    image:
      "https://dukaan.b-cdn.net/200x200/webp/media/9c44a1a9-09ca-4ab4-81fa-8a990934c5e2.jpeg",
    name: "CHURIDAR",
  },
  {
    image:
      "https://dukaan.b-cdn.net/200x200/webp/media/9c44a1a9-09ca-4ab4-81fa-8a990934c5e2.jpeg",
    name: "CHURIDAR",
  },
  {
    image:
      "https://dukaan.b-cdn.net/200x200/webp/media/9c44a1a9-09ca-4ab4-81fa-8a990934c5e2.jpeg",
    name: "CHURIDAR",
  },
  {
    image:
      "https://dukaan.b-cdn.net/200x200/webp/media/9c44a1a9-09ca-4ab4-81fa-8a990934c5e2.jpeg",
    name: "CHURIDAR",
  },
  {
    image:
      "https://dukaan.b-cdn.net/200x200/webp/media/9c44a1a9-09ca-4ab4-81fa-8a990934c5e2.jpeg",
    name: "CHURIDAR",
  },
  {
    image:
      "https://dukaan.b-cdn.net/200x200/webp/media/9c44a1a9-09ca-4ab4-81fa-8a990934c5e2.jpeg",
    name: "CHURIDAR",
  },
];

const BestSellers = () => {
  return (
    <div className="w-full">
      <p>Best selleres</p>
      <div className="flex">
        {items.map((item, index) => (
          <a className="max-w-[124px] flex-1 mx-2" key={index}>
            <div className="relative">
              <img src={item.image} />
              <p className="absolute text-white">{item.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
