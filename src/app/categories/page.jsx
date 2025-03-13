import { getCategories } from "@/lib/api/get-products";
import Image from "next/image";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategories("categories");

  return (
    <div className="container mx-auto">
      <h2 className="my-6 ml-4 text-xl">All Categories</h2>
      <div className="flex flex-wrap w-full mb-16">
        {categories?.map(({ id, categoryName, images }) => (
          <Link
            href={`/categories/${categoryName}`}
            key={id}
            className="m-4 w-[calc(20%-32px)] max-w-[calc(20%-32px)]"
          >
            <div className="flex flex-col gap-3">
              <div className="rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors shadow-md">
                <Image
                  width={1000}
                  height={1000}
                  src={images[0] || '/placeholder.png'}
                  alt={categoryName}
                  className="aspect-[4/5] w-full object-contain"
                />
              </div>
              <p className="text-center font-medium text-lg">
                {categoryName.toUpperCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
