import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-slate-900 items-center text-white gap-8 py-6">
      <div className="flex flex-col lg:flex-col gap-12">
        <div className="">
          <img src="" />
          <p>Fast delivery (₹75 per order)</p>
          <p>Delivery happens within: 3-5 days</p>
        </div>
        <div>
          <img src="" />
          <p>Fast delivery (₹75 per order)</p>
          <p>Delivery happens within: 3-5 days</p>
        </div>
        <div>
          <img src="" />
          <p>Fast delivery (₹75 per order)</p>
          <p>Delivery happens within: 3-5 days</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p>STORE DETAILS</p>
        <p>STORE DETAILS</p>
        <p>STORE DETAILS</p>
      </div>
      <div className="text-center flex flex-col gap-2">
        <p>FOLLOW US</p>
        <div className="flex gap-4 text-sm">
          <div className="flex gap-2">
            <Facebook />
            <p className="hidden lg:flex">Facebook</p>
          </div>
          <div className="flex gap-2">
            <Youtube />
            <p className="hidden lg:flex">Facebook</p>
          </div>
          <div className="flex gap-2">
            <Instagram />
            <p className="hidden lg:flex">Facebook</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
