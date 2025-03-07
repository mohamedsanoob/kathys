import { getProductById } from "@/lib/api/get-products";
import ProductImage from "./ProductImage";
import ProductVariants from "./ProductVariants";

// Define interfaces for our data

const ProductDetails = async ({ productId }: { productId: string }) => {
  const product = await getProductById(productId, "products");

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="w-full flex items-start py-[12]">
      <div className="container mx-auto p-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          Home / Categories / Kurthis /{" "}
          <span className="font-semibold">{product.productName}</span>
        </nav>

        <div className="flex justify-start align-start mx-auto">
          {/* Left Side - Thumbnails */}

          <ProductImage product={product} />
          <div className="flex flex-col gap-4">
            <h4 className="text-xl">{product.productName}</h4>
            <h3 className="font-semibold">{product.productPrice}</h3>
            <ProductVariants product={product} />

           
            <div className="flex gap-8"></div>
            <div className="flex flex-col gap-2">
              <p>Product Details</p>
              {/* <div>
                {items[0]?.details?.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
