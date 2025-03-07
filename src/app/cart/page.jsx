import CartItems from "./components/CartItems";
import Checkout from "./components/Checkout";

const page = () => {
  return (
    <div className="flex justify-between p-4 relative">
      <div className="w-[65%]">
        <CartItems />
      </div>
      <div className="top-0 sticky">
        <Checkout />
      </div>
    </div>
  );
};

export default page;
