import Footer from "@/components/Footer";
import HomeCollections from "@/components/HomeCollections";

export default function Home() {

  return (
    <div className="relative lg:w-[1200px] m-auto">
      <HomeCollections />
      <Footer />
    </div>
  );
}
