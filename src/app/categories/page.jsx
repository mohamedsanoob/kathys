import { getCategories } from "@/lib/api/get-products";
import Image from "next/image";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategories("categories");

  return (
    <div className="container mx-auto">
      <div className="flex gap-2 mt-8">
        <Link href="/" className="underline text-gray-500 text-sm">
          Home
        </Link>
        <p className="text-gray-500 text-sm">/ categories</p>
      </div>
      <div className="flex flex-wrap gap-6 w-full py-6">
        {categories?.map(({ id, categoryName, images }) => (
          <Link
            href={`/categories/${categoryName}`}
            key={id}
            className="w-[calc(16.66%-32px)] max-w-[calc(16.66%-32px)]" // Adjusted width for 6 cards in a row
          >
            <div className="flex flex-col gap-3">
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                <Image
                  width={1000}
                  height={1000}
                  src={images[0] || "/placeholder.png"}
                  alt={categoryName}
                  className="aspect-[4/5] w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <p className="text-center font-[400]">
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
