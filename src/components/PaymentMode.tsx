import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useShippingStore } from "@/store/store";
import { useCallback } from "react";

const PaymentMode = () => {
  const { shippingDetails } = useShippingStore();

  const generateOrderId = () => `ORD${Math.random().toString(36).substring(2, 15)}`;

  const handlePlaceOrder = useCallback(async () => {
    try {
      const orderId = generateOrderId();
      const guestCartId = localStorage.getItem("guestCartId");
      
      await setDoc(doc(db, "orders", orderId), {
        orderId,
        cartId: guestCartId,
        shippingDetails,
        createdAt: new Date(),
        paymentMode: "COD",
        status: "pending",
      });

      // router.push(`/orders/${orderId}`);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }, [shippingDetails]);

  return (
    <div>
      Payment Mode
      <button 
        onClick={handlePlaceOrder}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Place Order
      </button>
    </div>
  );
};

export default PaymentMode;
