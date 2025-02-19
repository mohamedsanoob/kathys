import BestSellers from "@/components/BestSellers";
import Footer from "@/components/Footer";
import HomeCart from "@/components/HomeCart";
import HomeCollections from "@/components/HomeCollections";
import HomeItems from "@/components/HomeItems";

export default function Home() {
  return (
    <>
      <div className="relative ">
        <div className="lg:hidden">
          <BestSellers />
        </div>
        <div className="lg:px-[5rem] flex items-stretch justify-center w-full overflow-hidden relative bg-red-500">
          {/* Left Section: Fixed HomeItems */}
          <div className="pt-4 relative bg-gray-500 top-0 z-10 lg:block hidden">
            <HomeItems />
          </div>

          {/* Center Section: Scrollable HomeCollections */}
          <div
            className="mt-4 md:border-l md:border-r md:border-gray-300 overflow-visible"
            style={{ width: "min(605px, 100vw)" }}
          >
            <HomeCollections />
          </div>

          {/* Right Section: Fixed HomeCart */}
          <div className="pl-8 py-4 sticky top-0 z-10 lg:block hidden">
            <HomeCart />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
