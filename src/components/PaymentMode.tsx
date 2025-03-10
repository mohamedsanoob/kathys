'use client'
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useShippingStore } from "@/store/store";
import { useCallback, useMemo, useState } from "react";
import { CreditCard, HandCoins } from "lucide-react";

const PaymentMode = () => {
  const { shippingDetails } = useShippingStore();
  const [selectedPayment, setSelectedPayment] = useState<string>('online');

  const generateOrderId = useCallback(() => 
    `ORD${Math.random().toString(36).substring(2, 15)}`, 
    []
  );

  const guestCartId = useMemo(() => 
    typeof window !== 'undefined' ? localStorage.getItem("guestCartId") : null,
    []
  );

  const handlePlaceOrder = useCallback(async () => {
    try {
      const orderId = generateOrderId();
      
      await setDoc(doc(db, "orders", orderId), {
        orderId,
        cartId: guestCartId,
        shippingDetails,
        createdAt: new Date(),
        paymentMode: selectedPayment.toUpperCase(),
        status: "pending",
      });

      // router.push(`/orders/${orderId}`);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }, [shippingDetails, generateOrderId, guestCartId, selectedPayment]);

  const paymentOptions = useMemo(() => [
    {
      id: 'online',
      icon: CreditCard,
      label: 'Online payment'
    },
    {
      id: 'cod', 
      icon: HandCoins,
      label: 'Cash on delivery'
    }
  ], []);

  return (
    <div className="flex border border-gray-200 rounded-md">
      <div className="flex flex-col bg-gray-100 border-r border-gray-200 w-[40%]">
        {paymentOptions.map(({id, icon: Icon, label}) => (
          <div
            key={id}
            className={`flex font-[500] gap-2 items-center border-b border-gray-200 p-4 cursor-pointer ${
              selectedPayment === id ? "bg-white" : ""
            }`}
            onClick={() => setSelectedPayment(id)}
          >
            <Icon className="w-6 h-6" />
            <p>{label}</p>
          </div>
        ))}
      </div>
      <div className="p-4 flex flex-col justify-between gap-8 w-[60%]">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-[500]">Pay online</p>
          <p className="text-sm text-gray-500">
            Use credit/debit card, net-banking, UPI, wallets to complete the
            payment.
          </p>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={!selectedPayment}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentMode;
