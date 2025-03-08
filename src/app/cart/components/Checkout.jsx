'use client';

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
    <div>
      Checkout
      <button 
        onClick={handleContinue}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
