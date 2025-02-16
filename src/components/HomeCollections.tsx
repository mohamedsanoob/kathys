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
    <div className="flex flex-col h-full justify-between">
      <div className="flex gap-2 py-2 px-8">
        <p className=" text-[20px] font-[500] tracking-wide">NEW COLLECTIONS</p>
        <div className="bg-blue-500 px-1 text-white w-min rounded-md">10</div>
      </div>
      <div className="flex-1 overflow-y-auto h-full">
        <div className="flex flex-col gap-4 ">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex  gap-4 items-center py-2 hover:bg-gray-50 px-8"
            >
              <div className="w-[140px] h-[140px] border border-gray-200 rounded-md items-center flex">
                <Image
                  src={item.image}
                  alt="item"
                  width={80}
                  height={50}
                  className="w-[120px] h-[120px] object-contain"
                />
              </div>
              <div className="flex flex-col w-full gap-4">
                <a className="text-[18px] font-[500] w-[90%]  leading-7 cursor-pointer hover:underline">
                  {item.name}
                </a>
                <div className="flex justify-between">
                  <p>{item.price}</p>
                  <div className="border border-blue-700 rounded-sm px-3 text-blue-700">
                    ADD +
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCollections;
