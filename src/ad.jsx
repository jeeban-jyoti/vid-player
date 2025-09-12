import React, { useEffect, useRef } from "react";

export default function AdsterraAd() {
  const adRef = useRef(null);

  useEffect(() => {
    // First, create the global `atOptions` object
    window.atOptions = {
      key: "a5b8814324665b8d221ed341ba486cc9",
      format: "iframe",
      height: 300,
      width: 160,
      params: {},
    };

    // Then load the script
    const script = document.createElement("script");
    script.src = "//www.highperformanceformat.com/a5b8814324665b8d221ed341ba486cc9/invoke.js";
    script.async = true;

    if (adRef.current) adRef.current.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (adRef.current) adRef.current.removeChild(script);
    };
  }, []);

  return <div ref={adRef} style={{ width: 160, height: 300 }} />;
}