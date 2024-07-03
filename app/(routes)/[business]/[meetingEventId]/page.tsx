import React from "react";
import MeetingTimeDateSelection from "./_components/MeetingTimeDateSelection";
import { get } from "http";
import { collection, getFirestore, query, where } from "firebase/firestore";

const SharedMeetingEvent = () => {
  const db = getFirestore();

  const getMeetingBusinessAndEventDetails = () => {
    const q = query(
      collection(db, "Business"),
      where("businessName", "==", "Sib Party")
    );
  };
  return (
    <div>
      <MeetingTimeDateSelection />
    </div>
  );
};

export default SharedMeetingEvent;
