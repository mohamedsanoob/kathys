import { getProductById } from "@/lib/api/get-products";
import { Product } from "@/app/categories/[categoryName]/page";
import ProductVariants from "./ProductVariants";
import ProductImage from "./ProductImage";

// Define interfaces for our data

const ProductDetails = async ({
  productId,
  categoryName,
}: {
  productId: string;
  categoryName: string;
}) => {
  const productData = await getProductById(productId, "products");

  if (!productData) {
    return <div>Product not found</div>;
  }

  // Type assertion to convert DocumentInterface to Product
  const product = productData as unknown as Product;

  return (
    <div className="w-full flex items-start py-[12]">
      <div className="container mx-auto p-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          Home / Categories / {categoryName} /
          <span className="font-semibold">{product.productName}</span>
        </nav>

        <div className="flex justify-start align-start mx-auto">
          {/* Left Side - Thumbnails */}

          <ProductImage product={product} />
          <div className="flex flex-col gap-4 w-[50%]">
            <div className="flex flex-col gap-1">
              <h4 className="text-xl">{product.productName?.toUpperCase()}</h4>
              <h3 className="font-semibold text-xl">
                ₹ {product.productPrice}
              </h3>
            </div>
            <ProductVariants
              product={{
                id: product.id,
                unitQuantity: product.unitQuantity,
                productName: product.productName,
                images: product.images,
                productPrice: product.productPrice,
                variantDetails: productData.variantDetails || [], 
                variants: productData.variants || [],
              }}
            />

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
