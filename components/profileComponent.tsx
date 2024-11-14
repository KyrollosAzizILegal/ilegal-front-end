"use client";

import { removeToken } from "@/utils";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";


export default function UserDropdown() {
  const signOut = () => {
    // Implement sign out logic here
    removeToken('token')
    // Redirect to the login page
    window.location.reload();
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          {/* <DropdownItem key="profile">
            <span className="font-semibold">Signed in as</span>
            <span className="text-gray-500">zoey@example.com</span>
          </DropdownItem> */}
          <DropdownItem key="signout" color="danger" onClick={signOut}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
