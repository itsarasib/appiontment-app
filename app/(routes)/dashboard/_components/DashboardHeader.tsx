"use client";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const DashboardHeader = () => {
  const { user } = useKindeBrowserClient();
  const imageUrl = user?.picture || "/profile-icon.svg";
  return (
    <div className="p-4 px-5">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center float-right">
          <Image
            src={imageUrl}
            alt="profile-pic"
            width={40}
            height={40}
            className=" rounded-full"
          />
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Setting</DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutLink>Logout</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardHeader;
