"use client";
import { Divider } from "@mui/material";
import { useState } from "react";

const products = [
  {
    name: "COTTON CO-RD SET",
    size: 42,
    price: 1125,
    count: 1,
  },
  {
    name: "COTTON CO-RD SET COTTON CO-RD SET",
    size: 42,
    price: 1125,
    count: 1,
  },
  {
    name: "COTTON CO-RD SET",
    size: 42,
    price: 1125,
    count: 1,
  },
  {
    name: "COTTON CO-RD SET",
    size: 42,
    price: 1125,
    count: 1,
  },
  {
    name: "COTTON CO-RD SET COTTON CO-RD SET",
    size: 42,
    price: 1125,
    count: 1,
  },
  {
    name: "COTTON CO-RD SET",
    size: 42,
    price: 1125,
    count: 1,
  },
  {
    name: "COTTON CO-RD SET",
    size: 42,
    price: 1125,
    count: 1,
  },
  {
    name: "COTTON CO-RD SET",
    size: 42,
    price: 1125,
    count: 1,
  },
];

const HomeCart = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="flex flex-col justify-between sticky top-0 h-[calc(100dvh_-_12dvh)] pb-4">
      {/* Header */}
      <div className="flex justify-between py-2">
        <div className="flex gap-3">
          <h6>Cart</h6>
          <p className="bg-blue-500 px-1 text-white w-min rounded-md">6</p>
        </div>
        <a className="underline text-sm cursor-pointer">Clear cart</a>
      </div>

      {/* Products List */}
      <div className="flex flex-col gap-4 py-8 flex-grow overflow-y-auto">
        {products.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 py-2">
            <p className="font-[500] text-[14px] w-[90%]">{item.name}</p>
            <p className="text-xs">size {item.size}</p>
            <div className="flex justify-between items-center">
              <p className="text-[14px] font-[500]">${item.price}</p>
              <div className="border border-blue-700 rounded-md text-blue-700">
                <span
                  className="hover:bg-sky-50 px-2 cursor-pointer"
                  onClick={() =>
                    setCount((prevCount) => Math.max(1, prevCount - 1))
                  }
                >
                  -
                </span>{" "}
                <span className="px-2 bg-blue-100">{count}</span>{" "}
                <span
                  className="hover:bg-sky-50 px-2 cursor-pointer"
                  onClick={() => setCount((prevCount) => prevCount + 1)}
                >
                  +
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer with Subtotal and Button */}
      <div className="mt-auto flex flex-col gap-4">
        <Divider />
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>1250</p>
        </div>
        <button className="bg-blue-500 w-full p-3 rounded-lg text-white">
          Go to cart
        </button>
      </div>
    </div>
  );
};

export default HomeCart;
