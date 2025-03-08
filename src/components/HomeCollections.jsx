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
    <div className="flex flex-col ">
      {categories.map((category) => (
        <div key={category.id} className="relative">
          <div className="sticky top-0">
            <h2 className="sticky top-0 bg-white z-10 py-2 text-[20px] font-[500">
              {category.categoryName.toUpperCase()}
            </h2>
            <hr />
          </div>
          <div className="flex flex-wrap xs:w-[calc(100%+12px)] gap-4 lg:w-[calc(100%+32px)] py-4">
            {products?.map((product) => (
              <div
                key={product.id}
                className="flex flex-col xs:w-[calc(50%-12px)] lg:w-[calc(20%-32px)] h-auto text-left gap-4"
              >
                <Link
                  href={`categories/${category.categoryName}/${product.id}`}
                  className="border border-gray-200 rounded-lg"
                >
                  <Image
                    src={product.images[0]}
                    alt="product"
                    width={1000}
                    height={1000}
                    className="w-full max-h-[220px] h-full object-contain aspect-[4/5] transition-all duration-400"
                  />
                </Link>

                <div className="">
                  <a className="">{product.productName}</a>
                  <div className="">
                    <p>${product.productPrice}</p>
                    <AddToCart product={product} />
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
