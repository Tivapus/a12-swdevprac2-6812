"use client";

import Image from "next/image";
import styles from "./banner.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const covers = [
  "/img/cover.jpg",
  "/img/cover2.jpg",
  "/img/cover3.jpg",
  "/img/cover4.jpg",
];

export default function Banner() {
  const [coverIndex, setCoverIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  const handleBannerClick = () => {
    setCoverIndex((prev) => (prev + 1) % covers.length);
  };

  const handleSelectVenue = () => {
    router.push("/venue");
  };

  return (
    <div className={`${styles.banner} relative overflow-hidden`}> 
      <Image
        src={covers[coverIndex]}
        alt="Banner Image"
        fill
        style={{ objectFit: "cover", cursor: "pointer" }}
        onClick={handleBannerClick}
        data-testid="banner-image"
      />
      <div className={`${styles.bannerText} bg-gradient-to-r from-black/60 to-transparent`}> 
        <h2 className="text-white text-3xl sm:text-4xl font-semibold">where every event finds its venue</h2>
        <p className="text-gray-200 mt-2">Find and book the perfect space for your next event.</p>
      </div>
      {session && session.user && (
        <div className="absolute top-4 right-6 z-40 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-md">
          Welcome <span className="font-semibold">{session.user.name}</span>
        </div>
      )}
      <button
        style={{
          position: "absolute",
          bottom: "24px",
          right: "24px",
          padding: "12px 24px",
          borderRadius: "8px",
          background: "#6d9468",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          zIndex: 30,
        }}
        onClick={handleSelectVenue}
      >
        Select Venue
      </button>
    </div>
  );
}