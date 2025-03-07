import BestSellers from "@/components/BestSellers";
import Footer from "@/components/Footer";
import HomeCollections from "@/components/HomeCollections";

export default async function Home() {
  return (
    <>
      <div className="relative lg:w-[1200px] m-auto">
        <BestSellers />
        <HomeCollections />
      </div>
      <Footer />
    </>
  );
}
