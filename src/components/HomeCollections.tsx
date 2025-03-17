import { getAllProducts, getCategories } from "@/lib/api/get-products";
import AddToCart from "./AddToCart";
import Link from "next/link";
import Image from "next/image";

const HomeCollections = async () => {
  const [categories, products] = await Promise.all([
    getCategories("categories"),
    getAllProducts("products"),
  ]);

  return (
    <div className="flex flex-col gap-8">
      {categories.map((category) => (
        <div key={category.id} className="relative">
          <div className="sticky top-0 z-20 bg-white">
            <h2 className="py-4 text-xl font-medium tracking-wide">
              {category.categoryName.toUpperCase()}
            </h2>
            <hr className="border-gray-200" />
          </div>
          <div className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-3 lg:grid-cols-5">
            {products?.map((product) => (
              <div key={product.id} className="flex flex-col gap-3">
                <Link
                  href={`categories/${category.categoryName}/${product.id}`}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.productName}
                    width={400}
                    height={500}
                    className="aspect-[4/5] w-full object-contain transition-transform duration-300 hover:scale-105"
                    priority
                  />
                </Link>

                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium line-clamp-2">
                    {product.productName}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                      ${product.productPrice}
                    </p>
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
      ))}
    </div>
  );
};

export default HomeCollections;
