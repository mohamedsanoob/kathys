const CartItems = () => {
  const items = [
    {
      name: "NEW COLLECTION",
      image: "",
      price: 1660,
      size: 42,
      quantity: 1,
    },
    {
      name: "NEW COLLECTION",
      image: "",
      price: 1660,
      size: 42,
      quantity: 1,
    },
    {
      name: "NEW COLLECTION",
      image: "",
      price: 1660,
      size: 42,
      quantity: 1,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      {items?.map((item, index) => (
        <div key={index} className="flex justify-between">
            <div>
            <p>{item.name}</p>
            <p className="text-gray-600">₹ {item.price}</p>
            <p>Size: {item.size}</p>
            <p>Quantity: {item.quantity}</p>
            </div>
            <div>
                Remove
            </div>
           
        </div>
      ))}
    </div>
  );
};

export default CartItems;
