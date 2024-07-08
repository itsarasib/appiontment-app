import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BusinessInfoProps, EventInfoProps } from "../page";
import { format } from "date-fns";
import TimeDateSelection from "./TimeDateSelection";
import UserFormInfo from "./UserFormInfo";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { toast } from "sonner";

export interface MeetingTimeDateSelectionProps {
  eventInfo: EventInfoProps | null;
  businessInfo: BusinessInfoProps | null;
}

const MeetingTimeDateSelection: React.FC<MeetingTimeDateSelectionProps> = ({
  eventInfo,
  businessInfo,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [enableTimeSlots, setEnableTimeSlots] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userNote, setUserNote] = useState<string | null>("");

  const db = getFirestore(app);

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);

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

  const handleDateChange = (date: Date) => {
    setDate(date);
    const day = format(date, "EEEE");
    if (
      businessInfo?.daysAvailable?.[
        day as keyof BusinessInfoProps["daysAvailable"]
      ]
    ) {
      setEnableTimeSlots(true);
    } else {
      setEnableTimeSlots(false);
    }
  };

  const handleScheduleEvent = async () => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]{2,4}$/;
    if (regex.test(userEmail ?? "") == false) {
      toast("Enter a valid email address");
      return;
    }

    const docId = Date.now().toString();
    await setDoc(doc(db, "ScheduledMeeting", docId), {
      businessName: businessInfo?.businessName,
      businessEmail: businessInfo?.email,
      selectedTime: selectedTime,
      selectedDate: date,
      duration: eventInfo?.duration,
      locationUrl: eventInfo?.locationUrl,
      eventId: eventInfo?.id,
      id: docId,
      userName: userName,
      userEmail: userEmail,
      userNote: userNote,
    }).then(() => {
      toast("Meeting Scheduled Successfully!");
    });
  };

  return (
    <div className="m-5">
      <h1 className="font-bold text-2xl mb-2">Please select date & time</h1>
      <div
        className="p-5 py-10 shadow-lg border-t-8 mx-10 md:mx-26 lg:mx-56 my-10 "
        style={{ borderTopColor: eventInfo?.themeColor }}
      >
        <Image src="/logo.svg" alt="logo" width={150} height={150} />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Meeting info */}
          <div className="p-4 border-r">
            <h2>{businessInfo?.businessName}</h2>
            <h2 className="font-bold text-2xl">
              {eventInfo?.eventName ? eventInfo?.eventName : "Meeting Name"}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              <h2 className="flex gap-2">
                <Clock />
                {eventInfo?.duration} Min
              </h2>
              <h2 className="flex gap-2">
                <MapPin />
                {eventInfo?.locationType} Meeting
              </h2>
              <h2 className="flex gap-2">
                <CalendarCheck />
                {format(date as Date, "PPP")}
              </h2>
              <h2 className="flex gap-2">
                <Timer />
                {selectedTime ? (
                  selectedTime
                ) : (
                  <div className="text-red-500">Not select time yet</div>
                )}
              </h2>
              <Link
                href={eventInfo?.locationUrl ? eventInfo?.locationUrl : "#"}
                className="text-primary"
              >
                {eventInfo?.locationUrl}
              </Link>
            </div>
          </div>
          {/* Time and Date selection */}

          {step == 1 ? (
            <TimeDateSelection
              date={date}
              timeSlots={timeSlots}
              enableTimeSlots={enableTimeSlots}
              handleDateChange={handleDateChange}
              setSelectedTime={setSelectedTime}
              selectedTime={selectedTime}
            />
          ) : (
            <UserFormInfo
              setUserName={setUserName}
              setUserEmail={setUserEmail}
              setUserNote={setUserNote}
            />
          )}
        </div>

        <div className="flex gap-3 justify-end items-end">
          {step == 2 && (
            <Button
              variant="outline"
              className="mt-10 border-primary text-primary"
              onClick={() => setStep(1)}
            >
              Previous
            </Button>
          )}
          {step == 1 ? (
            <Button
              className=" float-right"
              disabled={!selectedTime || !date}
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              disabled={!userEmail || !userName}
              onClick={handleScheduleEvent}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingTimeDateSelection;
