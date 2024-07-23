"use client";
import { useEffect, useState } from 'react';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api';
import dynamic from 'next/dynamic';

const DynamicCustomTitleBar = dynamic(() => import("../Components/CustomTitlebar"), {
  ssr: false,
});

export default function Home() {
  const [itemClicked, setItemClicked] = useState(null);



  useEffect(() => {
    const unlisten = listen('item-clicked', (event) => {
      setItemClicked(event.payload);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  const openSecondaryWindow = async () => {
    try {
      await invoke('create_secondary_window');
    } catch (error) {
      console.error("Failed to create secondary window:", error);
    }
  };

  return (
    <>
      <DynamicCustomTitleBar />
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <div>{itemClicked}</div>
        <button 
          onClick={openSecondaryWindow} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Secondary Window
        </button>
      </div>
    </>
  );
}
