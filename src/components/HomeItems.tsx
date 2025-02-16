import { useState } from "react";

const items = [
  {
    item: "NEW ITEM",
    count: 84,
  },
  {
    item: "NEW ITEM",
    count: 84,
  },
  {
    item: "NEW ITEM",
    count: 84,
  },
  {
    item: "NEW ITEM",
    count: 84,
  },
  {
    item: "NEW ITEM",
    count: 84,
  },
];
const HomeItems = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col py-2">
      {items?.map((item, index) => (
        <div
          key={index}
          onClick={() => setActive(index)}
          className={`py-2 hover:bg-gradient-to-r hover:from-white hover:to-sky-100 w-full hover:border-r-4 hover:border-blue-600 ${
            active === index && "text-blue-500"
          }`}
        >
          {item.item} ({item.count})
        </div>
      ))}
    </div>
  );
};

export default HomeItems;
