import { FormValues } from "@/app/_utils/CreateMeetingType";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PreviewMeetingProps {
  formValue: FormValues | undefined;
}

const PreviewMeeting: React.FC<PreviewMeetingProps> = ({ formValue }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    formValue?.duration && createTimeSlot(formValue?.duration);
  }, [formValue]);

  const createTimeSlot = (interval: number) => {
    const startTime = 8 * 60; // 8:00 AM
    const endTime = 22 * 60; // 10:00 PM
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });
    console.log(slots);
    setTimeSlots(slots);
  };

  return (
    <div className="m-5">
      <h1 className="font-bold text-2xl mb-2">Preview Dashboard</h1>
      <div
        className="p-5 py-10 shadow-lg border-t-8"
        style={{ borderTopColor: formValue?.themeColor }}
      >
        <Image src="/logo.svg" alt="logo" width={150} height={150} />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Meeting info */}
          <div className="p-4 border-r">
            <h2>Business Name</h2>
            <h2 className="font-bold text-2xl">
              {formValue?.eventName ? formValue?.eventName : "Meeting Name"}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              <h2 className="flex gap-2">
                <Clock />
                {formValue?.duration} Min
              </h2>
              <h2 className="flex gap-2">
                <MapPin />
                {formValue?.locationType} Meeting
              </h2>
              <Link
                href={formValue?.locationUrl ? formValue?.locationUrl : "#"}
                className="text-primary"
              >
                {formValue?.locationUrl}
              </Link>
            </div>
          </div>
          {/* Time and Date selection */}
          <div className="md:col-span-2 flex p-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-lg">Select Date & Time</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mt-5"
                disabled={(date) => date <= new Date()}
              />
            </div>
            <div
              className="flex flex-col w-full overflow-auto gap-4 p-5"
              style={{ maxHeight: "400px" }}
            >
              {timeSlots?.map((slot, index) => (
                <Button
                  variant="outline"
                  className="border-primary text-primary"
                  key={index}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMeeting;
