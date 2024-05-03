"use client";

import { Button } from "@/components/ui/button";
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
      icon: "/breifcase.svg",
    },
    {
      id: 2,
      name: "Scheduled Meeting",
      path: "/dashboard/scheduled",
      icon: "/calendar.svg",
    },
    {
      id: 3,
      name: "Availability",
      path: "/dashboard/availability",
      icon: "/clock.svg",
    },
    {
      id: 4,
      name: "Setting",
      path: "/dashboard/setting",
      icon: "/setting.svg",
    },
  ];

  const path = usePathname();
  const [activePath, setActivePath] = useState(path);

  useEffect(() => {
    path && setActivePath(path);
  }, []);

  return (
    <div className="p-5 py-14">
      <div
        className="flex
       justify-center"
      >
        <Image src="/logo.svg" alt="logo" width={150} height={150} />
      </div>

      <Button className="flex gap-2 w-full rounded-full mt-7">
        <Image src="/plus.svg" alt="plus" width={20} height={20} />
        Create
      </Button>

      <div className="mt-5 flex flex-col gap-5">
        {menu.map((item) => (
          <Link href={item.path} key={item.id}>
            <Button
              variant="ghost"
              className={`w-full flex gap-2 justify-start hover:bg-primary-100 ${
                activePath == item.path && "bg-primary-100 text-primary"
              }`}
            >
              <Image src={item.icon} alt={item.name} width={20} height={20} />
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;
