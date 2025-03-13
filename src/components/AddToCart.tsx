"use client";
import { addProductToCart, getCart } from "@/lib/api/add-to-cart";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Snackbar, Alert } from "@mui/material";

interface Product {
  id: string;
}

const AddToCart = ({ product }: { product: Product }) => {
  const [productCount, setProductCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartItems = await getCart();
        const item = cartItems.find((item) => item.productId === product.id);
        setProductCount(item ? item.quantity : 0);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch cart";
        setError(errorMessage);
        setOpen(true);
        throw error;
      }
    };

    fetchCart();
  }, [product.id]);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      await addProductToCart({
        productId: product.id,
        quantity: 1,
      });
      setProductCount((prev) => prev + 1);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to add item to cart";
      setError(errorMessage);
      setOpen(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleReduceCart = async () => {
    try {
      setIsLoading(true);
      await addProductToCart({
        productId: product.id,
        quantity: -1,
      });
      setProductCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to remove item from cart";
      setError(errorMessage);
      setOpen(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
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
            className="flex items-center justify-center px-3 py-1rounded-md bg-white text-black transition-colors"
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
    </div>
  );
};

export default AddToCart;
