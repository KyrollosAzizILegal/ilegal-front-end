"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { AiFillSignature } from "react-icons/ai";
import { BsTranslate } from "react-icons/bs";
import {
  FaHome,
  FaFileAlt,
  FaUsers,
  FaFileContract,
  //   FaCog,
  //   FaPen,
} from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import { RiOrganizationChart } from "react-icons/ri";
// import { BsTranslate } from "react-icons/bs";
// import { AiFillSignature } from "react-icons/ai";
// import { GiInjustice } from "react-icons/gi";

const navLinks = [
  {
    name: "Home",
    icon: <FaHome className="text-2xl" />,
    path: "/home",
  },
  {
    name: "Employees",
    icon: <FaUsers className="text-2xl" />,
    path: "/home/employees",
  },
  {
    name: "Tenants",
    icon: <RiOrganizationChart className="text-2xl" />,
    path: "/home/tenants",
  },
  {
    name: "Templates",
    icon: <FaFileContract className="text-2xl"/> 
    // <FaPen className="text-2xl" />
    ,
    path: "/home/templates",
  },
    {
      name: "Summarization",
      icon: <FaFileAlt className="text-2xl"/>
      // <FaCog className="text-2xl" />
      ,
      path: "/dashboard/summarization",
    },
    {
      name: "Translation",
      icon: <BsTranslate className="text-2xl" />,
      path: "/dashboard/translation",
    },
    {
      name: "Sign Document",
      icon: <AiFillSignature  className="text-2xl" />,
      path: "/dashboard/sign-document",
    },
    {
      name: "Jurisdiction",
      icon: <GiInjustice className="text-2xl" />,
      path: "/dashboard/jurisdiction",
    },
];

const Sidebar = () => {
  return (
    <aside className="w-fit flex flex-col items-center py-4 space-y-8 text-white justify-between bg-gradient-to-b from-lightBlue to-deepBlue
                      mr-2">
      <div className="text-lg font-bold">
        <img src="/download.png" alt="logo" className="w-8 h-8" />
      </div>
      <nav className="flex flex-col items-center space-y-8">
        {navLinks.map((link, index) => (
          <Button
            key={index}
            startContent={link.icon}
            className="bg-transparent text-white hover:text-gray-300"
            as={Link}
            href={`${link.path}`}
          >
            {link.name}
          </Button>
        ))}
      </nav>
      <div></div>
    </aside>
  );
};

export default Sidebar;
