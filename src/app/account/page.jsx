import Adressess from "./_components/Adressess";
import AllOrders from "./_components/AllOrders";
import HomeItems from "./_components/HomeItems";

const page = ({ searchParams }) => {
  const activeComponent = searchParams.category || "MY ORDERS"; // Default to "MY ORDERS"

  const renderComponent = () => {
    switch (activeComponent) {
      case "orders":
        return <AllOrders />;
      case "addresses":
        return <Adressess />;
      case "signout":
        // Handle sign out logic here (e.g., redirect to login page)
        // For now, just return a message
        return <p>Signing out...</p>;
      default:
        return <AllOrders />; // Default to orders if something goes wrong
    }
  };

  return (
    <div>
      <div className="container mx-auto flex w-[90%] justify-between py-4">
        <p className="text-xl font-medium">Account</p>
        <p className="text-lg">+91 7994914856</p>
      </div>
      <div className="flex border border-gray-200 rounded-md shadow-md w-[90%] h-[80dvh] mx-auto">
        <div className="w-[25%] border-r border-gray-200">
          <HomeItems activeCategory={activeComponent} />
        </div>
        <div className="w-[75%] p-4">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default page;
