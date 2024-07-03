"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React, { use, useEffect, useState } from "react";
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
import Link from "next/link";
import ThemeOptions from "@/app/_utils/ThemeOptions";
import { FormValues } from "@/app/_utils/CreateMeetingType";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { create } from "domain";

interface MeetingFormProps {
  setFormValue: (v: FormValues) => void;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ setFormValue }) => {
  const [eventName, setEventName] = useState<string | undefined>(undefined);
  const [duration, setDuration] = useState<number | undefined>(30);
  const [locationType, setLocationType] = useState<string | undefined>(
    undefined
  );
  const [locationUrl, setLocationUrl] = useState<string | undefined>(undefined);
  const [themeColor, setThemeColor] = useState<string | undefined>(undefined);

  const { user } = useKindeBrowserClient();
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    setFormValue({
      eventName: eventName,
      duration: duration,
      locationType: locationType,
      locationUrl: locationUrl,
      themeColor: themeColor,
    });
  }, [eventName, duration, locationType, locationUrl, themeColor]);

  const onCreateClick = async () => {
    if (!user?.email) {
      toast.error("User email is required to create an event");
      return;
    }

    const id = Date.now().toString();
    await setDoc(doc(db, "MeetingEvent", id), {
      id: id,
      eventName: eventName,
      duration: duration,
      locationType: locationType,
      locationUrl: locationUrl,
      themeColor: themeColor,
      businessId: doc(db, "Business", user?.email),
      createdBy: user?.email,
    }).then((resp) => {
      toast("New Event created successfully!");
      router.replace("/dashboard/meeting-type");
    });
  };

  return (
    <div className="p-8">
      <Link href={"/dashboard"}>
        <h2 className="flex gap-2">
          <ChevronLeft />
          Cancel
        </h2>
      </Link>
      <div className="mt-4">
        <h2 className="text-2xl font-bold my-4">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name*</h2>
        <Input
          placeholder="Name your event meeting"
          onChange={(e) => setEventName(e.target.value)}
        />

        <h2 className="font-bold">Duration*</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {duration} min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setDuration(15)}>
              15 min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(30)}>
              30 min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(45)}>
              45 min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(60)}>
              60 min
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location*</h2>
        <div className="grid grid-cols-4 gap-4">
          {LocationOption.map((option, index) => (
            <div
              key={index}
              className={`border flex flex-col justify-center items-center rounded-md p-3 hover:bg-primary-100 hover:border-primary cursor-pointer ${
                locationType === option.name && "bg-primary-100 border-primary"
              }`}
              onClick={() => setLocationType(option.name)}
            >
              <Image
                src={option.icon}
                alt={option.name}
                width={30}
                height={30}
              />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>
        {locationType && (
          <>
            <h2 className="font-bold">Add {locationType} Url</h2>
            <Input
              placeholder="Add Url"
              onChange={(e) => setLocationUrl(e.target.value)}
            ></Input>
          </>
        )}
        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-evenly">
          {ThemeOptions.map((color, index) => (
            <div
              key={index}
              className={`h-5 w-5 rounded-full ${
                themeColor === color && "border-2 border-black"
              } cursor-pointer`}
              style={{ backgroundColor: color }}
              onClick={() => setThemeColor(color)}
            ></div>
          ))}
        </div>
      </div>

      <Button
        className="w-full mt-9"
        disabled={!eventName || !duration || !locationType || !locationUrl}
        onClick={() => onCreateClick()}
      >
        Create
      </Button>
    </div>
  );
};

export default MeetingForm;
