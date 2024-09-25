"use client";
import dynamic from "next/dynamic";
import { listen } from '@tauri-apps/api/event';


const DynamicCustomTitleBar = dynamic(() => import("../../Components/CustomTitlebar"), {
  ssr: false,
});

export default function Secondary() {

  listen('item-data', (event) => {
    const data = event.payload;
    console.log('Received data in secondary window:', data);
  });
  
  return (
    <>
    <DynamicCustomTitleBar/>
    <div className=" h-[100vh] text-center justify-start items-center content-center">
        Secondary screen
      </div></>
  );
}

