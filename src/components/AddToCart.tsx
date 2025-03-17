"use client";
import { addProductToCart, getCart } from "@/lib/api/add-to-cart";
import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import Image from "next/image";

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
  productPrice: string;
  variantDetails: VariantDetail[];
  variants: Variants[];
}

const AddToCart = ({ product }: { product: Product }) => {
  const [productCount, setProductCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openDialog, setDialogOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<VariantDetail | null>(
    null
  );
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedVariant(null);
    setSelectedOptions({});
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartItems = await getCart();
        const productItems = cartItems.filter(
          (item) => item.productId === product.id
        );
        const totalProductCount = productItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setProductCount(totalProductCount);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch cart";
        setError(errorMessage);
        setOpen(true);
      }
    };
    fetchCart();
  }, [product.id]);

  const handleAddToCart = async () => {
    console.log(product, "product");
    const inventory =
      product.variantDetails[0]?.inventory ?? product.unitQuantity;
    const variant = product.variantDetails[0] || [];

    if (product?.variantDetails?.length > 1) {
      setDialogOpen(true);
    } else {
      try {
        setIsLoading(true);
        await addProductToCart({
          productId: product.id,
          quantity: 1,
          variantDetails: variant,
          availableStock: inventory,
        });
        setProductCount((prev) => prev + 1);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to add item to cart";
        setError(errorMessage);
        setOpen(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReduceCart = async () => {
    const inventory =
      product.variantDetails[0]?.inventory ?? product.unitQuantity;
    const variant = product.variantDetails[0];

    try {
      setIsLoading(true);
      await addProductToCart({
        productId: product.id,
        quantity: -1,
        variantDetails: variant,
        availableStock: inventory,
      });
      setProductCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove item from cart";
      setError(errorMessage);
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAddToCart = async () => {
    if (selectedVariant) {
      try {
        setIsLoading(true);
        await addProductToCart({
          productId: product.id,
          variantDetails: selectedVariant,
          quantity: 1,
          availableStock: selectedVariant.inventory,
        });
        setProductCount((prev) => prev + 1);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to add item to cart";
        setError(errorMessage);
        setOpen(true);
      } finally {
        setIsLoading(false);
        handleDialogClose();
      }
    } else {
      setError("Please select options");
    }
  };

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

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:gap-4">
      {productCount === 0 ? (
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium border border-black rounded-md hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      ) : (
        <div className="relative flex items-center gap-1 border border-black rounded-md">
          <button
            onClick={handleReduceCart}
            disabled={isLoading}
            className="flex items-center justify-center px-3 py-1 rounded-md transition-colors"
          >
            -
          </button>
          <span className="text-center px-4 font-medium bg-gray-200 py-1 text-sm">
            {isLoading ? (
              <Loader2 className="w-4 h-5 animate-spin mx-auto" />
            ) : (
              productCount
            )}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="flex items-center justify-center px-3 py-1 rounded-md bg-white text-black transition-colors"
          >
            +
          </button>
        </div>
      )}
      {/* ... (rest of the component remains the same) */}
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

      <Dialog
        fullWidth
        open={openDialog}
        onClose={handleDialogClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "1rem",
          },
        }}
      >
        <DialogContent>
          <div className="flex justify-between pb-2">
            <p className="font-medium text-lg">Select options</p>
            <X onClick={handleDialogClose} />
          </div>
          <Divider />
          <p>{error}</p>
          <div className="flex justify-between mt-4 items-center">
            <div className="flex flex-col gap-2">
              <h5 className="font-medium text-lg">{product?.productName}</h5>
              <h5 className="font-medium text-lg">₹ {product?.productPrice}</h5>
            </div>
            <Image
              src={product?.images[0]}
              alt={product?.productName}
              width={1000}
              height={1000}
              className="rounded-lg border border-gray-200 object-contain w-[48px] h-[48px]"
            />
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {product.variants?.map((variant) => (
              <div key={variant.optionName} className="flex flex-col gap-1">
                <p className="font-medium">Select {variant.optionName}</p>
                <div className="flex gap-2 flex-wrap">
                  {variant.optionValue.map((value) => (
                    <p
                      key={value}
                      onClick={() =>
                        handleOptionClick(variant.optionName, value)
                      }
                      className={`border border-gray-200 rounded-lg w-[fit-content] py-2 px-4 flex items-center hover:bg-gray-200 hover:border-black cursor-pointer ${
                        selectedOptions[variant.optionName] === value
                          ? "bg-gray-200 border border-gray-950"
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
        </DialogContent>
        <DialogActions sx={{ padding: "1rem" }}>
          <Button
            fullWidth
            onClick={handleConfirmAddToCart}
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
                <Loader2 className="mr-2 animate-spin" /> <p>Adding...</p>
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>
          <Button
            fullWidth
            onClick={handleDialogClose}
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
            Buy now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddToCart;