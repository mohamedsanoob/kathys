import AddToCart from "@/components/AddToCart";
import { getAllProducts, getCategoryByName } from "@/lib/api/get-products";
import Image from "next/image";
import Link from "next/link";
import FilterSection from "./_components/FilterSection";

// Export the interfaces so they can be imported in other files
export interface Category {
  active: boolean;
  categoryName: string;
  description: string;
  desktopBanner: string | null;
  id: string;
  images: string[];
  isSubcategory: boolean;
  mobileBanner: string | null;
  parentCategory: {
    categoryId: string;
    categoryName: string;
  };
  products: string[]; // Array of product IDs
}

interface Combination {
  optionName: string;
  optionValue: string[];
}

interface VariantDetail {
  combination: Combination[];
  discountedPrice: number;
  inventory: number;
  price: number;
  sku: string;
}
export interface Product {
  active: boolean;
  categories: string[]; // Array of category IDs
  description: string;
  id: string;
  images: string[];
  productCategory: string;
  productDiscountedPrice: number;
  productName: string;
  productPrice: number;
  productUnit: string;
  quantity: number;
  shippingCost: number;
  skuId: string;
  taxRate: number;
  unitQuantity: number;
  variants?: Array<{
    optionName: string;
    optionValue: string[];
  }>;
  variantDetails: VariantDetail[] | [];
}

const Page = async ({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = await params;
  const [category, products] = await Promise.all([
    getCategoryByName(categoryName),
    getAllProducts("products"),
  ]);

  if (!category) {
    return <div className="text-center text-red-500">Category not found</div>; // Handle case where category is not found
  }

  const categoryProducts = products.filter((product) =>
    category.products.includes(product.id)
  );

  return (
    <div className="container w-[90%] mx-auto flex gap-6 py-6">
      <div className="w-1/4">
        <FilterSection />
      </div>
      <div className="grid grid-cols-2 gap-6  sm:grid-cols-2 lg:grid-cols-4">
        {categoryProducts?.map((product) => (
          <div key={product.id} className="flex flex-col gap-3">
            <Link
              href={`categories/${category.categoryName}/${product.id}`}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors"
            >
              <div className="h-64">
                <Image
                  src={product.images[0]}
                  alt={product.productName}
                  width={400}
                  height={400} // Original height for the image
                  className="aspect-[4/5] w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
            </Link>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">{product.productName}</h3>
              <div className="flex items-center justify-between">
                <p className="font-semibold">${product.productPrice}</p>
                <AddToCart
                  product={{
                    id: product.id,
                    unitQuantity: product.unitQuantity,
                    productName: product.productName,
                    images: product.images,
                    productPrice: product.productPrice,
                    variantDetails: product.variantDetails,
                    variants: product.variants,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
