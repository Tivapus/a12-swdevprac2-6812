"use client";

import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function TopMenu(){
    const { data: session } = useSession();
    return (
        <div className="flex justify-between items-center py-2.5 px-5 z-50 bg-white">
            <div className="flex flex-row gap-4">
                <div>
                    {session ? (
                        <a href="#" onClick={(e)=>{e.preventDefault(); signOut();}} style={{color:"black"}}>Sign Out</a>
                    ) : (
                        <Link href="/auth/signin" style={{color:"black"}}>Sign In</Link>
                    )}
                </div>
                <Link href="/mybooking" style={{color:"black"}}>My Bookings</Link>
            </div>
            <TopMenuItem />
        </div>
    );
}