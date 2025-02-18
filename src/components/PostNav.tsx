import { Home, LayoutGrid, ShoppingBag, User } from "lucide-react";

const PostNav = () => {
  return (
    <div className="relative">
      <div className="absolute right-[50%] translate-x-[50%] top-[-100%] radius-[50%] bg-slate-600 text-white p-3 cursor-pointer">
        <LayoutGrid />
      </div>
      <div className="py-2 px-6 flex items-center justify-center gap-5 shadow-[0_-1px_3px_0_rgba(0,0,0,0.12)]">
        <div className="flex p-2 gap-1">
          <Home />
          <p>Home</p>
        </div>
        <div className="flex p-2 gap-1">
          <ShoppingBag />
          <p>Cart</p>
        </div>
        <div className="flex p-2 gap-1">
          <User />
          <p>Account</p>
        </div>
      </div>
    </div>
  );
};

export default PostNav;
