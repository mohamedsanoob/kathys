import Link from "next/link";
import { getCategories } from "@/lib/api/get-products";

const BestSellers = async () => {
  const categories = await getCategories("categories");
  return (
    <div className="w-full">
      <p>Best selleres</p>
      <div className="flex">
        {categories.map((category) => (
          <Link
            href={`/${category.categoryName}`}
            className="max-w-[124px] flex-1 mx-2"
            key={category.id}
          >
            <div className="relative">
              <p className="absolute text-white">{category.productName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
