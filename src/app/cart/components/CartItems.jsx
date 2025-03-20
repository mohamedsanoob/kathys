"use client";
import { addProductToCart, getCart } from "@/lib/api/add-to-cart";
import { useEffect, useState, useCallback, useMemo } from "react";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useStore } from "@/store/store";

const CartItems = () => {
  const { setAmount, setDeliveryCharge } = useStore();
  const [products, setProducts] = useState([]);

  const fetchCartAndProducts = useCallback(async () => {
    try {
      const items = await getCart();
      const validItems = items.filter((item) => item.quantity > 0);

      const productDetails = await Promise.all(
        validItems.map(async (item) => {
          const productRef = doc(db, "products", item.productId);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            return {
              ...productSnap.data(),
              id: productSnap.id,
              quantity: item.quantity,
              variantDetails: item.variantDetails,
            };
          }
          return null;
        })
      );

      const filteredProducts = productDetails.filter(Boolean);
      setProducts(filteredProducts);
      setAmount(
        filteredProducts.reduce(
          (sum, product) =>
            sum + product.variantDetails.discountedPrice * product.quantity,
          0
        )
      );
      setDeliveryCharge(
        filteredProducts.reduce(
          (sum, product) => sum + product.shippingCost * product.quantity,
          0
        )
      );
    } catch (error) {
      console.error("Failed to fetch cart and products:", error);
    }
  }, [setAmount, setDeliveryCharge]);

  useEffect(() => {
    fetchCartAndProducts();
  }, [fetchCartAndProducts]);

  const totalAmount = useMemo(
    () =>
      products.reduce(
        (sum, product) =>
          sum + product.variantDetails.discountedPrice * product.quantity,
        0
      ),
    [products]
  );

  const handleQuantityToggle = useCallback(
    (productId, variantDetails, isOpen) => {
      setProducts((products) =>
        products.map((p) => ({
          ...p,
          isOpen:
            p.id === productId &&
            JSON.stringify(p.variantDetails) === JSON.stringify(variantDetails)
              ? isOpen
              : false,
        }))
      );
    },
    []
  );

  const handleRemoveItem = useCallback(
    async (productId, variantDetails, quantity) => {
      try {
        await addProductToCart({
          productId,
          variantDetails,
          quantity: -quantity,
        });
        setProducts((products) =>
          products.filter(
            (p) =>
              !(
                p.id === productId &&
                JSON.stringify(p.variantDetails) ===
                  JSON.stringify(variantDetails)
              )
          )
        );
      } catch (error) {
        console.error("Failed to remove from cart:", error);
      }
    },
    []
  );

  const handleQuantityChange = useCallback(
    async (productId, variantDetails, newQuantity) => {
      try {
        const product = products.find(
          (p) =>
            p.id === productId &&
            JSON.stringify(p.variantDetails) === JSON.stringify(variantDetails)
        );
        if (!product) return;

        const quantityDiff = newQuantity - product.quantity;
        await addProductToCart({
          productId,
          variantDetails,
          quantity: quantityDiff,
        });

        setProducts((products) =>
          products.map((p) =>
            p.id === productId &&
            JSON.stringify(p.variantDetails) === JSON.stringify(variantDetails)
              ? { ...p, quantity: newQuantity, isOpen: false }
              : p
          )
        );
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    },
    [products]
  );

  const ProductQuantityButtons = ({ product }) => {
    console.log(product, "insode");
    return (
      <div
        className={`flex w-[13%] p-1 flex-col gap-2 border max-h-[90%] overflow-y-auto border-gray-200 mt-[6rem] rounded-md absolute bg-white shadow-md z-10 ${
          !product.isOpen && "hidden"
        }`}
      >
        {[...Array(product.variantDetails.inventory)].map((_, i) => (
          <button
            key={i}
            onClick={() =>
              handleQuantityChange(product.id, product.variantDetails, i + 1)
            }
            className={`flex items-center justify-center cursor-pointer hover:bg-black hover:text-white rounded ${
              product.quantity === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-xl font-[500]">Shopping Cart</p>
        <p className="text-lg font-[500]">Total {totalAmount}</p>
      </div>
      {products.map((product) => (
        <div
          key={`${product.id}-${JSON.stringify(product.variantDetails)}`}
          className="flex justify-between items-start border border-gray-200 p-4 rounded-md relative"
        >
          <div className="flex gap-4">
            <Image
              src={product.images[0]}
              alt={product.productName}
              width={1000}
              height={1000}
              className="w-[121px] h-[121px] rounded-md border border-gray-200 object-contain"
            />
            <div className="flex flex-col gap-1">
              <p>{product.productName.toUpperCase()}</p>
              <p className="text-gray-600">
                ₹ {product.variantDetails.discountedPrice}
              </p>
              <div className="flex justify-between w-[fit-content] gap-2 border border-gray-200 px-2 py-1 rounded-md">
                <p>Qty:{product.quantity}</p>
                {product.isOpen ? (
                  <ChevronUp
                    onClick={() =>
                      handleQuantityToggle(
                        product.id,
                        product.variantDetails,
                        false
                      )
                    }
                    className="cursor-pointer"
                  />
                ) : (
                  <ChevronDown
                    onClick={() =>
                      handleQuantityToggle(
                        product.id,
                        product.variantDetails,
                        true
                      )
                    }
                    className="cursor-pointer"
                  />
                )}
              </div>
              <ProductQuantityButtons product={product} />
            </div>
          </div>
          <button
            onClick={() =>
              handleRemoveItem(
                product.id,
                product.variantDetails,
                product.quantity
              )
            }
            className={`text-red-500 hover:text-red-700 ${
              product.variantDetails.inventory === 0
                ? "border border-red-500 px-2 py-1 rounded"
                : ""
            }`}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
