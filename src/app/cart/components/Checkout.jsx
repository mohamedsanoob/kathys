"use client";

import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const renderPage = searchParams.get("page");

  const handleContinue = () => {
    if (renderPage === "shipping") {
      router.push("/cart?page=payment-mode");
    } else if (renderPage === "payment-mode") {
      router.push("/cart?page=checkout");
    } else {
      router.push("/cart?page=shipping");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between gap-3 border border-gray-200 p-4 rounded-md">
        <div className="flex flex-col">
          <p className="text-lg font-[500]">Coupons and offers</p>
          <p className="text-xs text-gray-600">
            Save more with coupon and offers
          </p>
        </div>
        <div className="flex items-center h-[fit-content]">
          <p className="text-sm h-[fit-content] font-[500] cursor-pointer">
            1 Offer{" "}
          </p>
          <ChevronRight className="text-black w-4 h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-3 border border-gray-200 p-4 rounded-md">
        <div className="flex flex-col gap-2 border-b border-dashed border-gray-200 pb-3">
          <div className="flex justify-between">
            <p className="text-sm">Item total</p>
            <p className="text-sm">₹ 1000</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Delivery fee</p>
            <p className="text-sm">₹ 1000</p>
          </div>
        </div>
        <div className="flex flex-col pb-3 border-b border-dashed border-gray-200">
          <div className="flex justify-between">
            <p className="text-md font-[500]">Grant total</p>
            <p className="text-sm">₹ 1000</p>
          </div>
          <p className="text-xs text-gray-500">Inclusive of all taxes</p>
        </div>
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-3">
          <p className="text-sm text-gray-500">
            Average delivery time:
            <span className="text-black font-[500]"> 3-5 days</span>
          </p>
          <p className="bg-slate-100 p-2 rounded-md text-sm text-slate-500">
            You have saved total 1% (₹75) on your order! Yay!
          </p>
        </div>
        <button
          onClick={handleContinue}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Checkout;
