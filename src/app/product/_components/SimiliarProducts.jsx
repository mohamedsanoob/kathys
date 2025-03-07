import Image from "next/image";
import Link from "next/link";

const items = [
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
  {
    name: "NEW COLLECTION",
    price: 12323,
    image:
      "https://dukaan.b-cdn.net/700x700/webp/media/3f47f4cb-6cf7-44d2-ae0a-035c31952678.jpeg",
  },
];

const SimilarProducts = () => {
  return (
    <div className="container mx-auto p-4">
      <h4 className="font-semibold text-xl mb-2">Similar Products</h4>
      <hr className="mb-4" />

      {/* Responsive Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <div key={index} className="">
            <Link href={`categories/${item.name}`}>
              <div className="relative w-full aspect-[4/5] object-contain border border-gray-200 rounded-md">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <p className="">{item.name}</p>
            <p className="">₹{item.price}</p>
            <button className="hover:bg-gray-200 border rounded-md px-4 py-1">Add +</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
