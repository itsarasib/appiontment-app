"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocationOption from "@/app/_utils/LocationOption";
import Image from "next/image";

const MeetingForm = () => {
  const [location, setLocation] = useState<string | undefined>(undefined);
  return (
    <div className="p-4">
      <h2 className="flex gap-2">
        <ChevronLeft />
        Cancel
      </h2>
      <div className="mt-4">
        <h2 className="text-2xl font-bold my-4">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name*</h2>
        <Input placeholder="Name your event meeting" />

        <h2 className="font-bold">Duration*</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              30 min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>15 min</DropdownMenuItem>
            <DropdownMenuItem>30 min</DropdownMenuItem>
            <DropdownMenuItem>45 min</DropdownMenuItem>
            <DropdownMenuItem>60 min</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h2 className="font-bold">Location*</h2>
      <div className="grid grid-cols-4 gap-4">
        {LocationOption.map((option, index) => (
          <div
            className="border flex flex-col justify-center items-center rounded-md p-3 hover:bg-primary-100 hover:border-primary cursor-pointer"
            onClick={() => setLocation(option.name)}
          >
            <Image src={option.icon} alt={option.name} width={30} height={30} />
            <h2>{option.name}</h2>
          </div>
        ))}
      </div>
      <h2 className="font-bold">Add Url</h2>
      <Input placeholder="Add Url"></Input>
    </div>
  );
};

export default MeetingForm;
