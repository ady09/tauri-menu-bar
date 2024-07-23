"use client";
import dynamic from "next/dynamic";

const DynamicCustomTitleBar = dynamic(() => import("../../Components/CustomTitlebar"), {
  ssr: false,
});

export default function Secondary() {
  return (
    <>
    <DynamicCustomTitleBar/>
    <div className=" h-[100vh] text-center justify-start items-center content-center">
        Secondary screen
      </div></>
  );
}

