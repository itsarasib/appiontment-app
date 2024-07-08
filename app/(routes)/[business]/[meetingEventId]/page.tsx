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
  DocumentReference,
} from "firebase/firestore";
import MeetingTimeDateSelection from "./_components/MeetingTimeDateSelection";

interface Params {
  business: string;
  meetingEventId: string;
}

export interface BusinessInfoProps {
  businessName: string;
  email: string;
  endTime: string;
  startTime: string;
  userName: string;
  daysAvailable: {
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
    Sunday: boolean;
  };
}

export interface EventInfoProps {
  businessId: DocumentReference;
  createdBy: string;
  duration: number;
  eventName: string;
  id: string;
  locationType: string;
  locationUrl: string;
  themeColor: string;
}

const SharedMeetingEvent: React.FC<{ params: Params }> = ({ params }) => {
  const db = getFirestore(app);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfoProps | null>(
    null
  );
  const [eventInfo, setEventInfo] = useState<EventInfoProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      setBusinessInfo(doc.data() as BusinessInfoProps);
    });

    // Get the meeting event details
    const docRef = doc(db, "MeetingEvent", params.meetingEventId);
    const docSnapMeetingEvent = await getDoc(docRef);
    if (docSnapMeetingEvent.exists()) {
      setEventInfo(docSnapMeetingEvent.data() as EventInfoProps);
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
