"use client";
import { Button } from "@/components/ui/button";
import { app } from "@/config/FirebaseConfig";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingType from "./meeting-type/page";

const Dashboard = () => {
  //init services
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    user && isBusinessRegistered();
  }, [user]);

  const isBusinessRegistered = async () => {
    if (user?.email) {
      const docRef = doc(db, "Business", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        //navigate to create business page if business is not registered
        setLoading(false);
        router.replace("/create-business");
      }
    } else {
      console.log("No user found");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MeetingType />
    </div>
  );
};

export default Dashboard;
