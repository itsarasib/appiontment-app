"use client";
import DaysList from "@/app/_utils/DaysList";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

const Availability = () => {
  const [dayAvailable, setDayAvailable] = useState([]);
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);
  const { user } = useKindeBrowserClient();
  const db = getFirestore(app);

  const onHandleChange = (day: string, value: boolean) => {
    setDayAvailable({
      ...dayAvailable,
      [day]: value,
    });
    console.log(dayAvailable);
  };

  const handleSave = async () => {
    console.log(dayAvailable, startTime, endTime);
    if (!user?.email) {
      toast.error("User email is required to create an event");
      return;
    }
    const docRef = doc(db, "Business", user?.email);
    await updateDoc(docRef, {
      dayAvailable: dayAvailable,
      startTime: startTime,
      endTime: endTime,
    }).then(() => {
      toast("Setup Availability successfully!");
    });
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7" />
      <div>
        <h2>Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList.map((item, index) => (
            <div key={index}>
              <h2>
                <Checkbox
                  className="mr-1"
                  onCheckedChange={(e) =>
                    onHandleChange(item.day, e as unknown as boolean)
                  }
                />
                {item.day}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-10">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input type="time" onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input type="time" onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default Availability;
