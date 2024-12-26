// components/Navbar.tsx

'use client';
import { useSelector } from "react-redux";
import UserDropdown from "./profileComponent";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const name = useSelector((state:RootState) => state.Home.name);
  return (
    <nav className="bg-deepBlue text-white shadow-md p-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold">{name}</h1>

      {/* Buttons */}
      <div className="flex space-x-4">
        <UserDropdown/>
      </div>
    </nav>
  );
};

export default Navbar;
