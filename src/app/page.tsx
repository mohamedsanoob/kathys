import HomeCart from "@/components/HomeCart";
import HomeCollections from "@/components/HomeCollections";
import HomeItems from "@/components/HomeItems";

export default function Home() {
  return (
    <div className="lg:px-[5rem] flex items-stretch h-[calc(100dvh_-_17dvh)] justify-center lg:h-[calc(100dvh_-_10dvh)] w-full overflow-hidden">
      {/* Left Section: Fixed HomeItems */}
      <div className="pt-4 sticky top-0 z-10 lg:block hidden">
        <HomeItems />
      </div>

      {/* Center Section: Scrollable HomeCollections */}
      <div
        className="md:border-l md:border-r md:border-gray-300 overflow-y-auto"
        style={{ width: "min(605px, 100vw)" }}
      >
        <HomeCollections />
      </div>

      {/* Right Section: Fixed HomeCart */}
      <div className="pl-8 py-4 sticky top-0 z-10 lg:block hidden">
        <HomeCart />
      </div>
    </div>
  );
}
