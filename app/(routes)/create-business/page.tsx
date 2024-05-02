"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateBusiness = () => {
  const [businessName, setBusinessName] = useState<string>();
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const onCreateBusiness = async () => {
    console.log("Button Clicked", businessName);
    if (user && user.email) {
      await setDoc(doc(db, "Business", user.email), {
        businessName,
        email: user.email,
        userName: user?.given_name + " " + user?.family_name,
      }).then((resp) => {
        console.log("Document saved");
        toast("New Business Created");
        router.replace("/dashboard");
      });
    } else {
      console.log("User is not logged in or missing email");
    }
  };

  return (
    <div className="flex flex-col items-center p-14">
      <Image src="/logo.svg" alt="logo" width={200} height={200} />
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">
          What should we call your business?
        </h2>
        <p className="text-slate-500">
          You can always change this later from settings
        </p>
        <div className=" w-full">
          <label className=" text-slate-500">Team Name?</label>
          <Input
            placeholder="Ex. Night Party"
            className="mt-2"
            onChange={(event) => setBusinessName(event.target.value)}
          />
        </div>
        <Button
          className=" w-full"
          disabled={!businessName}
          onClick={onCreateBusiness}
        >
          Create Business
        </Button>
      </div>
    </div>
  );
};

export default CreateBusiness;
