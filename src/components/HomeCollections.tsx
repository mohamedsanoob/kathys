import Image from "next/image";
import React from "react";

const items = [
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
];

const HomeCollections = () => {
  return (
    <div>
      <div className="flex gap-2">
        <p>NEW COLLECTIONS</p>
        <div className="bg-blue-500 px-1 text-white w-min rounded-md">10</div>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Image
              src={item.image}
              alt="item"
              width={80}
              height={50}
              className="border border-slate-400 rounded-md"
            />
            <div className="flex flex-col w-full gap-4">
              <p className="">{item.name}</p>
              <div className="flex justify-between">
                <p>{item.price}</p>
                <div className="border border-blue-700 rounded-sm px-3 text-blue-700">ADD +</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCollections;
