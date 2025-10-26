"use client";

import Image from "next/image";

export default function TopMenuItem(){
    return (
        <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
            <a href="/booking/" style={{color:"black"}}>Menu Item Booking</a>
            <Image src="/img/logo.png" alt="Logo" width={50} height={50}/>
        </div>
    );
}