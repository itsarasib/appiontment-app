import { Input } from "@/components/ui/input";
import MeetingEventList from "./_components/MeetingEventList";

const MeetingType = () => {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-3xl">Meeting Event Types</h2>
        <Input placeholder="Search" className="max-w-sm" />
        <hr />
      </div>
      <MeetingEventList />
    </div>
  );
};

export default MeetingType;
