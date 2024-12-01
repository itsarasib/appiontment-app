"use client";
import React, { useEffect, useState } from "react";
import { app } from "@/config/FirebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import MeetingTimeDateSelection from "../_components/MeetingTimeDateSelection";
import { BusinessInfoData, EventData } from "@/app/global-types";

interface ParamsProps {
  business: string;
  meetingEventId: string;
}

const SharedMeetingEvent: React.FC<{ params: ParamsProps }> = ({ params }) => {
  const db = getFirestore(app);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfoData | null>(
    null
  );
  const [eventInfo, setEventInfo] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log("businessInfo", businessInfo);
  console.log("eventInfo", eventInfo);

  useEffect(() => {
    if (params) {
      getMeetingBusinessAndEventDetails();
    }
  }, [params]);

  const getMeetingBusinessAndEventDetails = async () => {
    setLoading(true);
    // Get the business details
    const q = query(
      collection(db, "Business"),
      where("businessName", "==", params.business)
    );
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      setBusinessInfo(doc.data() as BusinessInfoData);
    });

    // Get the meeting event details
    const docRef = doc(db, "MeetingEvent", params.meetingEventId);
    const docSnapMeetingEvent = await getDoc(docRef);
    if (docSnapMeetingEvent.exists()) {
      setEventInfo(docSnapMeetingEvent.data() as EventData);
      console.log(docSnapMeetingEvent.data());
    }

    setLoading(false);
  };

  return (
    <div>
      <MeetingTimeDateSelection
        eventInfo={eventInfo}
        businessInfo={businessInfo}
      />
    </div>
  );
};

export default SharedMeetingEvent;
