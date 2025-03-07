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
    return <div>Category not found</div>; // Handle case where category is not found
  }

  const categoryProducts = products.filter((product) =>
    category.products.includes(product.id)
  );

  return (
    <div className="mx-auto w-[960px]">
      <div>
        <div key={category.id} className="mb-8">
          <div className="grid grid-cols-2 gap-6">
            {categoryProducts.map((product) => (
              <div key={product.id} className="border p-2 rounded-lg">
                <Link href={`/categories/${categoryName}/${product.id}`}>
                  {product.images && product.images.length > 0 && (
                    <Image
                      src={product.images[0]}
                      width={300}
                      height={300}
                      alt={product.productName}
                      className="rounded-lg"
                    />
                  )}
                </Link>
                <p>{product.productName}</p>
                <p className="text-gray-600">₹ {product.productPrice}</p>
                <button className="border px-3 text-blue-700 mt-2">
                  ADD +
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
