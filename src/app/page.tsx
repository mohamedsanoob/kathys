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
        <div className="lg:px-[3rem] xl:px-[5rem] flex items-stretch justify-center w-full overflow-visible relative ">
          {/* Left Section: Fixed HomeItems */}
          <div className="relative top-0 z-10 lg:block hidden ] lg:w-[30%] xl:w-[25%]">
            <HomeItems />
          </div>

          {/* Center Section: Scrollable HomeCollections */}
          <div
            className=" md:border-l md:border-r md:border-gray-300 overflow-visible"
            style={{ width: "min(605px, 100vw)" }}
          >
            <HomeCollections />
          </div>

          {/* Right Section: Fixed HomeCart */}
          <div className="pl-8 sticky top-0 z-10 lg:block hidden">
            <HomeCart />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
