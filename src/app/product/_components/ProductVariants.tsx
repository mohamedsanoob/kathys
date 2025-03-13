"use client";
import { useState } from "react";
import { Product } from "@/app/categories/[categoryName]/page";
import { addProductToCart } from "@/lib/api/add-to-cart"; // Import the add to cart function
import Snackbar from "@mui/material/Snackbar"; // Import Snackbar from Material-UI

interface Variant {
  optionName: string;
  optionValue: string[];
}

const ProductVariants = ({ product }: { product: Product }) => {
  const [selectedOption, setSelectedOption] = useState<string>();
  const [quantity, setQuantity] = useState<number>(0); // Track quantity
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleAddToCart = async () => {
    if (!selectedOption) {
      setSnackbarMessage("Please select an option before adding to cart."); // Set snackbar message if no option is selected
      setSnackbarOpen(true);
      return;
    }
    setIsLoading(true);
    try {
      await addProductToCart({
        productId: product.id,
        quantity: 1, // Assuming we add one item to the cart
      });
      setQuantity((prev) => prev + 1); // Update quantity
      setSnackbarMessage("Product added to cart!"); // Set snackbar message for success
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setSnackbarMessage("Failed to add product to cart."); // Set snackbar message for error
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReduceQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1); // Reduce quantity
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        {product.variants?.map((variant: Variant, index: number) => (
          <div key={index}>
            <div className="flex justify-between">
              <p className="">Select {variant.optionName}</p>
              <p>Size chart</p>
            </div>

            <div className="flex gap-4">
              {variant.optionValue.map((option: string, index: number) => (
                <div
                  key={index}
                  className={`border rounded-md py-2 px-4 text-sm hover:bg-gray-200 hover:border-black ${
                    selectedOption === option && "bg-gray-200 border-black"
                  }`}
                  onClick={() => setSelectedOption(option)}
                  aria-label={"label"} // Added aria label
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleReduceQuantity} // Reduce quantity
          className="mt-4 border hover:bg-red-200 border-red-600 text-red-700 py-2 px-4 rounded"
          disabled={isLoading || quantity === 0} // Disable if no items in cart
        >
          -
        </button>
        <span className="mt-4 text-lg">{quantity}</span> {/* Display quantity */}
        <button
          onClick={handleAddToCart} // Add onClick handler
          className="mt-4 border hover:bg-green-200 border-green-600 text-green-700 py-2 px-4 rounded"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Adding..." : "+"}
        </button>
        <button
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded"
          // disabled={!selectedSize} // Disable if no size selected
        >
          Buy now
        </button>
      </div>
      <div className="flex justify-center w-full items-center">
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </div>
    </div>
  );
};

export default ProductVariants;
