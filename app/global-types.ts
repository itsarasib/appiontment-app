import { DocumentReference } from "firebase/firestore";

export interface EventData {
  id: string;
  eventName: string;
  duration: number;
  locationType: string;
  locationUrl: string;
  themeColor: string;
  createdBy: string;
  businessId: DocumentReference;
}

export interface DayAvailability {
  [key: string]: boolean;
}

export interface BusinessInfoData {
  businessName: string;
  email: string;
  userName: string;
  startTime: string;
  endTime: string;
  daysAvailable: DayAvailability;
}
