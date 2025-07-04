import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //for mapping our Links
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Network", path: "/network" },
    { name: "Franchisee Inquiry", path: "/franchisee-inquiry" },
    { name: "Pickup Request", path: "/pickup-request" },
    { name: "Complain", path: "/complain" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <div className="flex justify-between items-center py-2 shadow-lg">
      <div className="md:px-5">
        {" "}
        {/* Logo & name Component */}
        <img
          className="w-60"
          src={"/assets/ShreeXpressLogo.png"}
          alt="ShreeMahavir courier Logo"
        />
      </div>
      <div className="pr-4 first:text-[#E31E25] hidden md:flex">
        {" "}
        {/* Navigation Component */}
        {navigationLinks.map((link, index) => (
          <a
            key={index}
            href={link.path}
            className={`mx-2 uppercase text-[13px] pb-[2px] transition duration-200 border-b-2 border-transparent hover:border-[#E31E25] hover:text-[#E31E25]
              ${index === 0 ? "text-[#E31E25]" : ""}`}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* ------------------------------------*/}

      {/* Mobile View Nav Link's */}
      <button
        className="md:hidden sm:flex border px-4 py-4 text-2xl mx-2 cursor-pointer"
        onClick={() => setIsSidebarOpen(true)}
      >
        <RxHamburgerMenu />
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 
                             ${isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

                             ${isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-2xl cursor-pointer">
            <IoMdClose />
          </button>
        </div>
        <nav className="flex flex-col p-4">
          {navigationLinks.map((link, index) => (
            <a
              key={index}
              href={link.path}
              className="py-2 text-base font-medium uppercase border-b hover:text-[#E31E25]"
              onClick={() => setIsSidebarOpen(false)} // close sidebar on link click
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay Background (optional for outside click) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Header;
