import Image from "next/image";
import Link from "next/link";



const page = () => {
  const items = [
    {
      name: "NEW COLLECTION",
      image:
        "https://dukaan.b-cdn.net/700x700/webp/media/d8e8c97d-bb90-4337-b782-3b03c631a87c.jpeg",
    },
    {
      name: "NEW COLLECTION",
      image:
        "https://dukaan.b-cdn.net/700x700/webp/media/53525d27-e4bc-44c0-97d6-f3b8e918820f.jpeg",
    },
  ];


  return (
    <div className="mx-auto w-[960px]">
      <h1>Category: </h1>
      <div className="grid grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div key={index} className="border p-2 rounded-lg">
            <Link href={`/product`}>
              <Image
                src={item.image}
                width={300}
                height={300}
                alt={item.name}
                className="rounded-lg"
              />
            </Link>
            <p>{item.name}</p>
            <p className="text-gray-600">₹ 1660</p>
            <button className="border px-3 text-blue-700 mt-2">ADD +</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
