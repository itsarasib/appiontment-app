"use client";

import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Clock, Plus, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideNavBar = () => {
  const menu = [
    {
      id: 1,
      name: "Meeting Type",
      path: "/dashboard/meeting-type",
      icon: Briefcase,
    },
    {
      id: 2,
      name: "Scheduled Meeting",
      path: "/dashboard/scheduled-meeting",
      icon: Calendar,
    },
    {
      id: 3,
      name: "Availability",
      path: "/dashboard/availability",
      icon: Clock,
    },
    {
      id: 4,
      name: "Setting",
      path: "/dashboard/setting",
      icon: Settings,
    },
  ];

  const path = usePathname();
  const [activePath, setActivePath] = useState(path);

  useEffect(() => {
    path && setActivePath(path);
  }, [path]);

  return (
    <div className="p-5 py-14">
      <div
        className="flex
       justify-center"
      >
        <Image src="/logo.svg" alt="logo" width={150} height={150} />
      </div>

      <Link href="/create-meeting">
        <Button className="flex gap-2 w-full rounded-full mt-7">
          <Plus />
          Create
        </Button>
      </Link>

      <div className="mt-5 flex flex-col gap-5">
        {menu.map((item) => (
          <Link href={item.path} key={item.id}>
            <Button
              variant="ghost"
              className={`w-full flex gap-2 justify-start hover:bg-primary-100 ${
                activePath == item.path && "bg-primary-100 text-primary"
              }`}
            >
              <item.icon />
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;
