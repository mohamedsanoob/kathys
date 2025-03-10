"use client";
import { useStore } from "@/store/store";
import CartItems from "./components/CartItems";
import Checkout from "./components/Checkout";
import ShippingForm from "@/components/ShippingForm";
import { useSearchParams } from "next/navigation";
import PaymentMode from "@/components/PaymentMode";

const CartPage = () => {
  const searchParams = useSearchParams();
  const renderPage = searchParams.get("page");

  const renderContent = () => {
    switch (renderPage) {
      case "shipping":
        return <ShippingForm />;
      case "payment-mode":
        return <PaymentMode />;
      default:
        return <CartItems />;
    }
  };

  return (
    <div className="flex justify-between p-12 relative w-full gap-8">
      <div className="w-[65%]">
        {renderContent()}
      </div>
      <div className="w-[35%] sticky top-[14%] h-fit">
        <Checkout />
      </div>
    </div>
  );
};

export default CartPage;
