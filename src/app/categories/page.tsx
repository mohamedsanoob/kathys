import { getAllDocuments } from "@/lib/api/get-products";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/9c44a1a9-09ca-4ab4-81fa-8a990934c5e2.jpeg",
    name: "NEW COLLECTION",
  },
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/808d80ee-40f3-4b15-ad05-ed2534018b2b.jpeg",
    name: "NEW COLLECTION",
  },
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/808d80ee-40f3-4b15-ad05-ed2534018b2b.jpeg",
    name: "NEW COLLECTION",
  },
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/808d80ee-40f3-4b15-ad05-ed2534018b2b.jpeg",
    name: "NEW COLLECTION",
  },
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/808d80ee-40f3-4b15-ad05-ed2534018b2b.jpeg",
    name: "NEW COLLECTION",
  },
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/808d80ee-40f3-4b15-ad05-ed2534018b2b.jpeg",
    name: "NEW COLLECTION",
  },
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/808d80ee-40f3-4b15-ad05-ed2534018b2b.jpeg",
    name: "NEW COLLECTION",
  },
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/808d80ee-40f3-4b15-ad05-ed2534018b2b.jpeg",
    name: "NEW COLLECTION",
  },
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/808d80ee-40f3-4b15-ad05-ed2534018b2b.jpeg",
    name: "NEW COLLECTION",
  },
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/808d80ee-40f3-4b15-ad05-ed2534018b2b.jpeg",
    name: "NEW COLLECTION",
  },
  {
    image:
      "https://dukaan.b-cdn.net/250x250/webp/media/808d80ee-40f3-4b15-ad05-ed2534018b2b.jpeg",
    name: "NEW COLLECTION",
  },
];

const Categories = async () => {
  await getAllDocuments("products")
    .then((products) => {
      console.log("All users:", products);
    })
    .catch((error) => {
      console.error("Error getting users:", error);
    });

  return (
    <div className="container mx-auto">
      <p className="my-8 ml-4">All Categories</p>
      <div className="flex flex-wrap w-[calc(90%+32px)] mb-16">
        {items?.map((item, index) => (
          <Link
            href={'/categories/' + item.name.replace(/\s+/g, '-').toLowerCase()}
            key={index}
            className="m-4 w-[calc(20%-32px)] overflow-hidden"
          >
            <div className="relative flex overflow-hidden rounded-xl h-full">
              <div className="w-full relative before:bg-gradient-to-b before:from-transparent before:to-black/60 before:w-full before:h-full before:absolute before:top-0 before:left-0">
                <Image
                width={1}
                height={1}
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain aspect-square"
                />
              </div>
              <p className="absolute bottom-0 left-0 p-3 text-white">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
