// components/Navbar.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import AddEmployeeModal from "./addEmployeeComponent";

const Navbar = () => {

  return (
    <nav className="bg-gray-800 text-white shadow-md p-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/home" passHref>
        <Image
          src="/logo-light.png" // Path to the logo in the public folder
          alt="Legal Solutions Logo"
          width={150} // Adjust as necessary
          height={50} // Adjust as necessary
          priority // Optimizes the image loading
        />
      </Link>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Button color="primary">Add Tenant</Button>

        <AddEmployeeModal/>
      </div>
    </nav>
  );
};

export default Navbar;
