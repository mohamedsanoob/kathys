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
  return (
    <div className="flex flex-col">
      {items?.map((item, index) => (
        <div key={index} className="py-2 hover:bg-sky-100 w-full hover:border-r-blue-800 border"> 
          {item.item} ({item.count})
        </div>
      ))}
    </div>
  );
};

export default HomeItems;
