import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DocumentData } from "firebase/firestore";
import React from "react";

interface TimeDateSelectionProps {
  date: Date | undefined;
  timeSlots: string[] | undefined;
  enableTimeSlots: boolean;
  handleDateChange: (date: Date) => void;
  setSelectedTime: (time: string) => void;
  selectedTime: string | null;
  prevBooking: DocumentData[];
}

const TimeDateSelection: React.FC<TimeDateSelectionProps> = ({
  date,
  handleDateChange,
  timeSlots,
  enableTimeSlots,
  setSelectedTime,
  selectedTime,
  prevBooking,
}) => {
  const checkTimeSlot = (time: any) => {
    return (
      prevBooking.filter((booking) => booking.selectedTime === time).length > 0
    );
  };

  return (
    <div className="md:col-span-2 flex p-4">
      <div className="flex flex-col">
        <h2 className="font-bold text-lg">Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleDateChange(d as Date)}
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
            disabled={!enableTimeSlots || checkTimeSlot(slot)}
            onClick={() => setSelectedTime(slot)}
            variant="outline"
            className={`border-primary text-primary ${
              slot == selectedTime && "bg-primary text-white"
            }`}
            key={index}
          >
            {slot}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeDateSelection;
