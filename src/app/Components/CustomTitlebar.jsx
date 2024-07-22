"use client";
import { useEffect, useState } from 'react';
import { appWindow } from '@tauri-apps/api/window';

const CustomTitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const checkMaximized = async () => {
      const maximized = await appWindow.isMaximized();
      setIsMaximized(maximized);
    };

   
    checkMaximized();

  
    const minimizeButton = document.getElementById('titlebar-minimize');
    const maximizeButton = document.getElementById('titlebar-maximize');
    const closeButton = document.getElementById('titlebar-close');

    const handleMinimize = () => appWindow.minimize();
    const handleMaximize = async () => {
      const maximized = await appWindow.isMaximized();
      if (maximized) {
        appWindow.unmaximize();
      } else {
        appWindow.maximize();
      }
      setIsMaximized(!maximized);
    };
    const handleClose = () => appWindow.close();

    minimizeButton.addEventListener('click', handleMinimize);
    maximizeButton.addEventListener('click', handleMaximize);
    closeButton.addEventListener('click', handleClose);

    
    return () => {
      minimizeButton.removeEventListener('click', handleMinimize);
      maximizeButton.removeEventListener('click', handleMaximize);
      closeButton.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <>
      <div data-tauri-drag-region className="titlebar">
        <div className="titlebar-button" id="titlebar-close">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IndoaXRlIiBkPSJNMTguMyA1LjcxYS45OTYuOTk2IDAgMCAwLTEuNDEgMEwxMiAxMC41OUw3LjExIDUuN0EuOTk2Ljk5NiAwIDEgMCA1LjcgNy4xMUwxMC41OSAxMkw1LjcgMTYuODlhLjk5Ni45OTYgMCAxIDAgMS40MSAxLjQxTDEyIDEzLjQxbDQuODkgNC44OWEuOTk2Ljk5NiAwIDEgMCAxLjQxLTEuNDFMMTMuNDEgMTJsNC44OS00Ljg5Yy4zOC0uMzguMzgtMS4wMiAwLTEuNCIvPjwvc3ZnPg==" alt="close" />
        </div>
        <div className="titlebar-button" id="titlebar-maximize">
          <img
            src={
              isMaximized
                ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzYgMzYiPjxwYXRoIGZpbGw9IndoaXRlIiBkPSJNMjggOEgxNGEyIDIgMCAwIDAtMiAydjJoMnYtMmgxNHYxMGgtMnYyaDJhMiAyIDAgMCAwIDItMlYxMGEyIDIgMCAwIDAtMi0yIiBjbGFzcz0iY2xyLWktb3V0bGluZSBjbHItaS1vdXRsaW5lLXBhdGgtMSIvPjxwYXRoIGZpbGw9IndoaXRlIiBkPSJNMjIgMTRIOGEyIDIgMCAwIDAtMiAydjEwYTIgMiAwIDAgMCAyIDJoMTRhMiAyIDAgMCAwIDItMlYxNmEyIDIgMCAwIDAtMi0yTTggMjZWMTZoMTR2MTBaIiBjbGFzcz0iY2xyLWktb3V0bGluZSBjbHItaS1vdXRsaW5lLXBhdGgtMiIvPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMzZ2MzZIMHoiLz48L3N2Zz4="
                : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IndoaXRlIiBkPSJNMyAzdjEwaDEwVjN6bTkgOUg0VjRoOHoiLz48L3N2Zz4="
            }
            alt="maximize"
          />
        </div>
        <div className="titlebar-button" id="titlebar-minimize">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IndoaXRlIiBkPSJNMyA4YS41LjUgMCAwIDEgLjUtLjVoOWEuNS41IDAgMCAxIDAgMWgtOUEuNS41IDAgMCAxIDMgOCIvPjwvc3ZnPg=="
            alt="minimize"
          />
        </div>
      </div>
    </>
  );
};

export default CustomTitleBar;
