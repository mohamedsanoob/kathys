import HomeCart from "@/components/HomeCart";
import HomeCollections from "@/components/HomeCollections";
import HomeItems from "@/components/HomeItems";

export default function Home() {
  return (
    <div className="lg:px-[8rem] grid grid-cols-[1fr_2fr_1fr] min-h-screen w-full">
      <div className="pt-4">
        <HomeItems />
      </div>
      <div className="py-4 border-l border-r border-gray-300">
        <HomeCollections />
      </div>
      <div className="pl-8 py-4">
        <HomeCart />
      </div>
    </div>
  );
}
