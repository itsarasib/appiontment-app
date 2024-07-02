"use client";

import React, { useState } from "react";
import MeetingForm from "./_components/MeetingForm";
import PreviewMeeting from "./_components/PreviewMeeting";
import { FormValues } from "@/app/_utils/CreateMeetingType";

const CreateMeeting = () => {
  const [formValue, setFormValue] = useState<FormValues | undefined>(undefined);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {/* Meeting form */}
      <div className=" shadow-md border h-screen">
        <MeetingForm setFormValue={(v: FormValues) => setFormValue(v)} />
      </div>
      {/* Preview */}
      <div className="md:col-span-2">
        <PreviewMeeting formValue={formValue} />
      </div>
    </div>
  );
};

export default CreateMeeting;
