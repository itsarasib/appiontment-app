"use client";
import React, { useEffect, useState } from "react";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getFirestore,
  orderBy,
} from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Clock, Copy, MapPin, Pen, Settings, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BusinessInfoData, EventData } from "@/app/global-types";

const MeetingEventList = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [businessInfo, setBusinessInfo] = useState<BusinessInfoData | null>(
    null
  );
  const [eventList, setEventList] = useState<EventData[]>([]);
  console.log("eventList", eventList);
  console.log("businessInfo", businessInfo);

  useEffect(() => {
    user && getEventList();
    user && BusinessInfo();
  }, [user]);

  const getEventList = async () => {
    setEventList([]); // Clear the list
    const q = query(
      collection(db, "MeetingEvent"),
      where("createdBy", "==", user?.email),
      orderBy("id", "desc")
    );

    const querySnapshot = await getDocs(q);
    const events: EventData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as EventData;
      data.id = doc.id; // Ensure id is set
      events.push(data);
    });
    setEventList(events);
  };

  const BusinessInfo = async () => {
    if (!user?.email) {
      toast.error("error!");
      return;
    }
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);
    setBusinessInfo(docSnap.data() as BusinessInfoData);
  };

  const onDeleteMeetingEvent = async (event: EventData) => {
    await deleteDoc(doc(db, "MeetingEvent", event?.id)).then(() => {
      toast("Event deleted successfully");
      getEventList();
    });
  };

  const onCopyClickHandler = (event: EventData) => {
    const meetingEventUrl =
      process.env.NEXT_PUBLIC_BASE_URL +
      "/" +
      businessInfo?.businessName +
      "/" +
      event.id;
    navigator.clipboard.writeText(meetingEventUrl);
    toast("Copied to clipboard");
  };
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {eventList.length > 0 ? (
        eventList.map((event) => (
          <div
            key={event.id}
            className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3"
            style={{ borderTopColor: event?.themeColor }}
          >
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Settings className="text-gray cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex gap-2">
                    <Pen />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-2"
                    onClick={() => onDeleteMeetingEvent(event)}
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="font-medium text-2xl">{event.eventName}</h2>
            <div className="flex justify-between">
              <h2 className="flex gap-2">
                <Clock />
                Duration: {event.duration} min
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <MapPin />
                Location: {event.locationType}
              </h2>
            </div>
            <hr />
            <div className="flex justify-between">
              <h2
                className="flex gap-2 text-sm items-center text-primary cursor-pointer"
                onClick={() => {
                  onCopyClickHandler(event);
                }}
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </h2>
              <Button
                variant="outline"
                className="rounded-full text-primary border-primary"
              >
                Share
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h2>No Event List</h2>
      )}
    </div>
  );
};

export default MeetingEventList;
