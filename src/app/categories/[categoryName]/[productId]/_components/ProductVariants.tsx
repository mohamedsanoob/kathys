"use client";
import { useEffect, useState } from "react";
import { addProductToCart, getCart } from "@/lib/api/add-to-cart";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Button } from "@mui/material";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Combination {
  name: string;
  value: string;
}

interface VariantDetail {
  combination: Combination[];
  discountedPrice: number;
  inventory: number;
  price: number;
  sku: string;
}

interface Variants {
  optionName: string;
  optionValue: string[];
}

interface Product {
  id: string;
  unitQuantity: number;
  productName: string;
  images: string[];
  productPrice: number;
  variantDetails: VariantDetail[];
  variants: Variants[];
}

const ProductVariants = ({ product }: { product: Product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [variantCount, setVariantCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<VariantDetail | null>(
    null
  );
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const router = useRouter();

  const fetchCart = async () => {
    try {
      const cartItems = await getCart();
      const productItems = cartItems.filter(
        (item) => item.productId === product.id
      );
      setProductCount(
        productItems.reduce((total, item) => total + item.quantity, 0)
      );

      if (selectedVariant) {
        const matchingItems = cartItems.filter(
          (item) =>
            item.productId === product.id &&
            item.variantDetails &&
            item.variantDetails.sku === selectedVariant.sku
        );
        setVariantCount(
          matchingItems.reduce((total, item) => total + item.quantity, 0)
        );
      } else {
        setVariantCount(0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cart");
      setOpen(true);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [product.id, selectedVariant]);

  const handleOptionClick = (optionName: string, optionValue: string) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: optionValue,
    };
    setSelectedOptions(newSelectedOptions);
    const matchingVariantDetail = product.variantDetails.find((detail) =>
      detail.combination.every(
        (comb) => newSelectedOptions[comb.name] === comb.value
      )
    );
    setSelectedVariant(matchingVariantDetail || null);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const updateCart = async (
    quantity: number,
    variant: VariantDetail,
    inventory: number
  ) => {
    try {
      setIsLoading(true);
      await addProductToCart({
        productId: product.id,
        quantity,
        variantDetails: variant,
        availableStock: inventory,
      });
      fetchCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update cart");
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const inventory =
      product.variantDetails[0]?.inventory ?? product.unitQuantity;
    const variant = product.variantDetails[0];

    if (product.variantDetails.length > 1) {
      if (selectedVariant) {
        await updateCart(1, selectedVariant, selectedVariant.inventory);
      } else {
        setError("Please select options");
        setOpen(true);
      }
    } else {
      await updateCart(1, variant, inventory);
    }
  };

  const handleReduceCart = async () => {
    const inventory =
      product.variantDetails[0]?.inventory ?? product.unitQuantity;
    const variant = product.variantDetails[0];

    if (product.variantDetails.length > 1) {
      if (selectedVariant) {
        if (variantCount > 0) {
          await updateCart(-1, selectedVariant, selectedVariant.inventory);
        } else {
          setError("Cannot reduce further");
          setOpen(true);
        }
      } else {
        setError("Please select options");
        setOpen(true);
      }
    } else {
      if (productCount > 0) {
        await updateCart(-1, variant, inventory);
      } else {
        setError("Cannot reduce further");
        setOpen(true);
      }
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        {product.variants?.map((variant) => (
          <div key={variant.optionName} className="flex flex-col gap-1">
            <p className="font-medium">Select {variant.optionName}</p>
            <div className="flex gap-2 flex-wrap">
              {variant.optionValue.map((value) => (
                <p
                  key={value}
                  onClick={() => handleOptionClick(variant.optionName, value)}
                  className={`border border-gray-200 rounded-lg py-2 px-4 flex items-center hover:bg-gray-200 cursor-pointer ${
                    selectedOptions[variant.optionName] === value
                      ? "bg-gray-200 border-gray-950"
                      : ""
                  }`}
                >
                  {value}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 w-full mt-8">
        {variantCount === 0 ? (
          <Button
            fullWidth
            onClick={handleAddToCart}
            disabled={isLoading || !selectedVariant}
            sx={{
              textTransform: "none",
              border: "1px solid black",
              borderRadius: "0.5rem",
              color: "black !important",
              height: "48px",
              fontFamily: "Poppins",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>
        ) : (
          <Button
            fullWidth
            disabled={isLoading || !selectedVariant}
            sx={{
              textTransform: "none",
              border: "1px solid black",
              borderRadius: "0.5rem",
              color: "black !important",
              height: "48px",
              fontFamily: "Poppins",
              padding: "0",
            }}
          >
            <div className="flex items-center justify-between w-full">
              <p
                onClick={handleReduceCart}
                className="flex-1 text-center cursor-pointer text-xl bg-gray-200 p-2 rounded-l-lg"
              >
                -
              </p>
              <p className="flex flex-1 justify-center items-center">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  variantCount
                )}
              </p>
              <p
                onClick={handleAddToCart}
                className="flex-1 text-center cursor-pointer text-xl bg-gray-200 p-2 rounded-r-lg"
              >
                +
              </p>
            </div>
          </Button>
        )}
        <Button
          fullWidth
          onClick={() => {
            if (selectedVariant) {
              if (variantCount > 0) {
                router.push("/cart");
              } else {
                handleAddToCart();
                router.push("/cart");
              }
            }
          }}
          sx={{
            textTransform: "none",
            border: "1px solid white",
            borderRadius: "0.5rem",
            color: "white",
            background: "black",
            height: "48px",
            fontFamily: "Poppins",
          }}
        >
          {variantCount > 0 ? "Go to Cart" : "Buy now"}
        </Button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            width: "auto",
            maxWidth: "90%",
            margin: "auto",
            transform: "translateX(0%)",
          },
        }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            color: "#fff",
            borderRadius: "4px",
            "& .MuiAlert-icon": {
              color: "#fff",
              marginRight: (theme) => theme.spacing(1),
            },
            "& .MuiAlert-action": {
              padding: 0,
              "& button": {
                color: "#fff",
              },
            },
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductVariants;
