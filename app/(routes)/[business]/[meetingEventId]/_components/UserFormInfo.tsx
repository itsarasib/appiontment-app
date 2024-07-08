import { Input } from "@/components/ui/input";
import React from "react";

interface UserFormInfoProps {
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
  setUserNote: (note: string) => void;
}

const UserFormInfo: React.FC<UserFormInfoProps> = ({
  setUserName,
  setUserEmail,
  setUserNote,
}) => {
  return (
    <div className="p-4 px-8 flex flex-col gap-3">
      <h2 className="font-bold text-xl">Enter Details</h2>
      <div>
        <h2>Name*</h2>
        <Input onChange={(event) => setUserName(event.target.value)} />
      </div>
      <div>
        <h2>Email*</h2>
        <Input onChange={(event) => setUserEmail(event.target.value)} />
      </div>
      <div>
        <h2>Share any Notes*</h2>
        <Input onChange={(event) => setUserNote(event.target.value)} />
      </div>
      <div>
        <h2 className="text-xs text-gray-400">
          If the user makes an appointment with the owner of the event, enter
          the owner's email address or leave it blank.
        </h2>
      </div>
    </div>
  );
};

export default UserFormInfo;
