"use client";

import React, { useState } from "react";
import MeetingForm from "./_components/MeetingForm";

export type FormValues = {
  eventName: string | undefined;
  duration: number | undefined;
  locationType: string | undefined;
  locationUrl: string | undefined;
  themeColor: string | undefined;
};

const CreateMeeting = () => {
  const [formValue, setFormValue] = useState<FormValues | undefined>(undefined);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {/* Meeting form */}
      <div className=" shadow-md border h-screen">
        <MeetingForm setFormValue={(v: FormValues) => console.log(v)} />
      </div>
      {/* Preview */}
      <div className="md:col-span-2"></div>
    </div>
  );
};

export default CreateMeeting;
