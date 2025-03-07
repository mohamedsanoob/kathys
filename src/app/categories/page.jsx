import { getCategories } from "@/lib/api/get-products";
import Image from "next/image";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategories("categories");

  return (
    <div className="container mx-auto">
      <p className="my-8 ml-4">All Categories</p>
      <div className="flex flex-wrap w-[calc(90%+32px)] mb-16">
        {categories?.map((category) => (
          <Link
            href={"/categories/" + category.categoryName}
            key={category.id}
            className="m-4 w-[calc(20%-32px)] overflow-hidden"
          >
            <div className="relative flex overflow-hidden rounded-xl h-full">
              <div className="w-full relative before:bg-gradient-to-b before:from-transparent before:to-black/60 before:w-full before:h-full before:absolute before:top-0 before:left-0">
                <Image
                  width={1}
                  height={1}
                  src={category.images[0] === "" ? null : category.images[0]}
                  alt={category.categoryName}
                  className="h-full w-full object-contain aspect-square"
                />
              </div>
              <p className="absolute bottom-0 left-0 p-3 text-white">
                {category.categoryName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
