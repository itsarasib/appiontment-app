import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarCheck, Clock, Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DocumentData } from "firebase/firestore";

interface ScheduledMeetingListProps {
  meetingList: DocumentData[];
}

const ScheduledMeetingList: React.FC<ScheduledMeetingListProps> = ({
  meetingList,
}) => {
  return (
    <div>
      {meetingList &&
        meetingList.map((meeting, index) => (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {meeting?.formatedDate} with {meeting.userName}
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className="mt-5 flex flex-col gap-4">
                    <h2 className="flex gap-2">
                      <Clock />
                      {meeting?.duration} Min{" "}
                    </h2>
                    <h2 className="flex gap-2">
                      <CalendarCheck />
                      {meeting.formatedDate}{" "}
                    </h2>
                    <h2 className="flex gap-2">
                      <Timer />
                      {meeting.selectedTime}{" "}
                    </h2>

                    <Link
                      href={meeting?.locationUrl ? meeting?.locationUrl : "#"}
                      className="text-primary"
                    >
                      {meeting?.locationUrl}
                    </Link>
                  </div>
                  <Link href={meeting.locationUrl}>
                    <Button className="mt-5">Join Now</Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>

    //   <div>
    //       {meetingList && meetingList.map((meeting, index) => (

    //       ))}
    //   </div>
  );
};

export default ScheduledMeetingList;
