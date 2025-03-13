"use client";
import { useShippingStore } from "@/store/store";
import { useCallback, useMemo, useState } from "react";
import { CreditCard, HandCoins } from "lucide-react";

interface OrderItem {
  variant_details: {
    material?: string;
    pattern?: string;
    color?: string;
    size?: string;
  };
  quantity: number;
  product_description: string;
  product_sku: string;
  product_price: number;
  product_id: string;
  discounted_price: number;
  product_name: string;
}

interface CustomerDetails {
  mobile_number: string;
  address: string;
  landmark: string;
  pincode: string;
  name: string;
  city: string;
  state: string;
  locality_area: string;
}

interface Order {
  cartId: string | null;
  additional_info: string;
  delivery: number;
  tax_amount: number;
  channel: string;
  items_total: number;
  quantity_each: OrderItem[];
  payment_mode: string;
  coupon_discount: number;
  status: string;
  customer_details: CustomerDetails;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  Razorpay: new (options: RazorpayOptions) => { open: () => void };
}

interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

const PaymentMode = () => {
  const { shippingDetails } = useShippingStore();
  const [selectedPayment, setSelectedPayment] = useState<"online" | "cod">(
    "online"
  );

  const generateOrderId = useCallback(
    () => `ORD${Math.random().toString(36).substring(2, 15)}`,
    []
  );

  const guestCartId = useMemo(
    () =>
      typeof window !== "undefined"
        ? localStorage.getItem("guestCartId")
        : null,
    []
  );

  const loadScript = useCallback((src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const displayRazorpay = useCallback(
    async (order: Order) => {
      console.log(order, "Displaying Razorpay");
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const result = await fetch(
        "https://d5c7-2402-3a80-1cb4-f67e-e063-c17e-2605-e7ac.ngrok-free.app/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 5, order, currency: "INR" }),
        }
      );

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      const data = await result.json();
      const { amount, id: order_id, currency } = data.order;
      console.log(data);

      const options = {
        key: "rzp_test_JVAADu0HKWPio9",
        amount: amount.toString(),
        currency,
        name: "Soumya Corp.",
        description: "Test Transaction",
        order_id,
        handler: async (response: RazorpayResponse) => {
          console.log(response);
          // const paymentData = {
          //   orderCreationId: order_id,
          //   razorpayPaymentId: response.razorpay_payment_id,
          //   razorpayOrderId: response.razorpay_order_id,
          //   razorpaySignature: response.razorpay_signature,
          // };
          // Handle payment data here
        },
        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
        },
        notes: { address: "Soumya Dey Corporate Office" },
        theme: { color: "#61dafb" },
      };

      const paymentObject = new (
        window as unknown as RazorpayInstance
      ).Razorpay(options);
      paymentObject.open();
    },
    [loadScript]
  );

  const handlePlaceOrder = useCallback(async () => {
    const order: Order = {
      cartId: guestCartId,
      additional_info: "Deliver after 5 PM",
      delivery: 10,
      tax_amount: 17,
      channel: "Mobile App",
      items_total: 175,
      quantity_each: [
        {
          variant_details: {
            material: "Cotton",
            pattern: "Striped",
          },
          quantity: 3,
          product_description:
            "Lightweight striped cotton shirt, ideal for summer.",
          product_sku: "SKU003",
          product_price: 30,
          product_id: "PROD003",
          discounted_price: 25,
          product_name: "Striped Cotton Shirt",
        },
        {
          variant_details: {
            color: "Black",
            size: "XL",
          },
          quantity: 1,
          product_description:
            "Premium black leather jacket with a sleek design.",
          product_sku: "SKU004",
          product_price: 120,
          product_id: "PROD004",
          discounted_price: 100,
          product_name: "Black Leather Jacket",
        },
      ],
      payment_mode: "PayPal",
      coupon_discount: 15,
      status: "Shipped",
      customer_details: {
        mobile_number: "+9876543210",
        address: "456 Elm Street",
        landmark: "Near City Mall",
        pincode: "67890",
        name: "Jane Smith",
        city: "Gotham",
        state: "New Jersey",
        locality_area: "Uptown",
      },
    };
    displayRazorpay(order);
  }, [
    shippingDetails,
    generateOrderId,
    guestCartId,
    selectedPayment,
    displayRazorpay,
  ]);

  const paymentOptions = useMemo(
    () => [
      { id: "online" as const, icon: CreditCard, label: "Online payment" },
      { id: "cod" as const, icon: HandCoins, label: "Cash on delivery" },
    ],
    []
  );

  return (
    <div className="flex border border-gray-200 rounded-md">
      <div className="flex flex-col bg-gray-100 border-r border-gray-200 w-[40%]">
        {paymentOptions.map(({ id, icon: Icon, label }) => (
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
