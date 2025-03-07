import React from "react";
import ProductDetails from "./_components/ProductDetails";
import SimiliarProducts from "./_components/SimiliarProducts";
import Review from "./_components/Review";

const page = () => {
  
  return (
    <div className="w-[90%] mx-auto flex flex-col">
      <ProductDetails />
      <SimiliarProducts />
      <Review />
    </div>
  );
};

export default page;
