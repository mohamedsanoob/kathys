import AddToCart from "@/components/AddToCart";
import { getAllProducts, getCategoryByName } from "@/lib/api/get-products";
import Image from "next/image";
import Link from "next/link";

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
    <div className="container mx-auto">
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryProducts?.map((product) => (
            <div key={product.id} className="flex flex-col gap-3">
              <Link
                href={`categories/${category.categoryName}/${product.id}`}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors"
              >
                <Image
                  src={product.images[0]}
                  alt={product.productName}
                  width={400}
                  height={500} // Increased height for more image height
                  className="aspect-[4/5] w-full object-contain transition-transform duration-300 hover:scale-105"
                  priority
                />
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
    </div>
  );
};
  

export default Page;
