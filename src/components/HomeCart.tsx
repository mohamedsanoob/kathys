const products = [
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

function HomeCart() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <h6>Cart</h6>
          <p className="bg-blue-500 px-1 text-white w-min rounded-md">6</p>
        </div>
        <p>Clear cart</p>
      </div>
      <div>
        {products.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
            <p>size {item.size}</p>
            <div className="flex justify-between">
              <p>{item.price}</p>
              <div className="border border-blue-700 rounded-md px-2 text-blue-700">
                - <span className="px-2 bg-blue-100">{item.count}</span> +
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeCart;
