import React, { useEffect, useRef } from "react";

export default function AdsterraAd({ id, height = 300, width = 160, src }) {
  const adRef = useRef(null);

  useEffect(() => {
    if (!id || !src) return;

    // Create a unique atOptions object for this instance
    window.atOptions = {
      key: id,
      format: "iframe",
      height,
      width,
      params: {},
    };

    // Load the script
    const script = document.createElement("script");
    script.src = `${src}/${id}/invoke.js`;
    script.async = true;

    if (adRef.current) adRef.current.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (adRef.current && script.parentNode === adRef.current) {
        adRef.current.removeChild(script);
      }
    };
  }, [id, height, width, src]);

  return <div ref={adRef} style={{ width, height }} />;
}