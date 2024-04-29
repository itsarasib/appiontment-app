import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <div className="hidden lg:block">
        <Image
          src="/profile/profile1.png"
          alt="profile1"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-36"
        />
        <Image
          src="/profile/profile2.png"
          alt="profile1"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute top-48 left-16"
        />
        <Image
          src="/profile/profile3.png"
          alt="profile1"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute bottom-20 left-36"
        />
        <Image
          src="/profile/profile4.png"
          alt="profile1"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-16 bottom-32"
        />
      </div>
      <div className="text-center max-w-3xl">
        <h2 className="font-bold text-[60px]">Easy scheduling ahead</h2>
        <h2 className="text-xl mt-5 text-slate-500">
          Calendly is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time and so much more.
        </h2>
        <div className="flex flex-col gap-4 mt-5">
          <h3>Sign Up free with Google and Facebook</h3>
          <div className="flex justify-center gap-8">
            <Button className="flex gap-4 p-7">
              <Image
                src="/google-icon.png"
                alt="google"
                width={40}
                height={40}
              />
              Sign Up with Google
            </Button>
            <Button className="flex gap-4 p-7">
              <Image
                src="/facebook-icon.png"
                alt="facebook"
                width={40}
                height={40}
              />
              Sign Up with Facebook
            </Button>
          </div>
          <hr />
          <h2>
            <Link href="" className=" text-primary">
              Sign up Free with Email.{" "}
            </Link>{" "}
            No Credit Card Required.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
