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
  const [variantCount, setVariantCount] = useState(0);
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

  useEffect(() => {
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
          const totalVariantCount = cartItems
            .filter(
              (item) =>
                item.productId === product.id &&
                item.variantDetails?.sku === selectedVariant.sku
            )
            .reduce((total, item) => total + item.quantity, 0);
          setVariantCount(totalVariantCount);
        } else {
          setVariantCount(0);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch cart");
        setOpen(true);
      }
    };
    fetchCart();
  }, [product.id, selectedVariant]);

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedVariant(null);
    setSelectedOptions({});
    setVariantCount(0);
  };

  const handleAddToCart = async () => {
    const inventory =
      product.variantDetails[0]?.inventory ?? product.unitQuantity;
    const variant = product.variantDetails[0] || [];

    if (product.variantDetails.length > 1) {
      setDialogOpen(true);
    } else {
      await updateCart(1, variant, inventory);
    }
  };

  const handleReduceCart = async () => {
    const inventory =
      product.variantDetails[0]?.inventory ?? product.unitQuantity;
    const variant = product.variantDetails[0];

    if (product.variantDetails.length > 1) {
      setDialogOpen(true);
    } else {
      await updateCart(-1, variant, inventory);
    }
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
      setProductCount((prev) => Math.max(0, prev + quantity));
      setVariantCount((prev) => Math.max(0, prev + quantity));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update cart");
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAddToCart = async () => {
    if (selectedVariant) {
      await updateCart(1, selectedVariant, selectedVariant.inventory);
    } else {
      setError("Please select options");
    }
  };

  const handleRemoveCart = async () => {
    if (selectedVariant) {
      await updateCart(-1, selectedVariant, selectedVariant.inventory);
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
            <X onClick={handleDialogClose} className="cursor-pointer" />
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
          {variantCount > 0 ? (
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
                  onClick={handleRemoveCart}
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
                  onClick={handleConfirmAddToCart}
                  className="flex-1 text-center cursor-pointer text-xl bg-gray-200 p-2 rounded-r-lg"
                >
                  +
                </p>
              </div>
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
              onClick={handleConfirmAddToCart}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" /> <p>Adding..</p>
                </div>
              ) : (
                "Add to Cart"
              )}
            </Button>
          )}

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
