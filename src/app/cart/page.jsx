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

  return (
    <div className="flex justify-between p-4 relative w-full">
      <div className="w-[80%]">
        {renderPage === "shipping" ? (
          <ShippingForm />
        ) : renderPage === "payment-mode" ? (
          <PaymentMode />
        ) : (
          <CartItems />
        )}
      </div>
      <div className="sticky top-0">
        <Checkout />
      </div>
    </div>
  );
};

export default CartPage;
