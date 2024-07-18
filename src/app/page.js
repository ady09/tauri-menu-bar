"use client";
import { useEffect } from 'react';
import { listen } from '@tauri-apps/api/event';
import { useState } from "react";

export default function Home() {
  const [itemClicked, setItemClicked] = useState(null)
  useEffect(() => {
    const unlisten = listen('item-clicked', (event) => {
      setItemClicked(event.payload)
    });
    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return (
    <div className=" h-[100vh] text-center justify-center items-center content-center">
     <div>{itemClicked}</div>
    </div>
  );
}

