"use client";

import { useEffect, useState } from "react";
import DateReserve from "@/components/DateReserve";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interface";
import { addBooking } from "@/redux/features/bookSlice";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default function BookingPage() {
  const session = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectVenue, setSelectVenue] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [nameLastname, setNameLastname] = useState<string>("");

  useEffect(() => {
    if (profile) {
      setNameLastname(profile.name);
      setContactNumber(profile.tel);
    }
  }, [profile]);

  useEffect(() => {
    let mounted = true;
    const fetchProfile = async () => {
      setProfileError(null);
      const token = (session.data as any)?.accessToken ?? (session.data as any)?.user?.token ?? null;
      if (!token) return;
      try {
        const res = await getUserProfile(token);
        if (!mounted) return;
        if (res && res.data) setProfile(res.data);
        else setProfileError("No profile returned");
      } catch (err) {
        console.error("getUserProfile error", err);
        if (mounted) setProfileError(String(err));
      }
    };
    fetchProfile();
    return () => {
      mounted = false;
    };
  }, [session.data]);

  const searchParams = useSearchParams();
  const venueId = searchParams.get("venueId");
  const venueName = searchParams.get("venueName")?.toString().split(' ');
  const venueNameLabel = venueName?.length === 2 ? `${venueName[0]}` : venueName?.[1];

  const dispatch = useDispatch<AppDispatch>();

  const makeBooking = () => {
    if(!nameLastname || !contactNumber || !selectedDate || !selectVenue) {
      return window.alert("Please complete all booking details.");
    }
    const bookingData: BookingItem = {
      nameLastname: nameLastname,
      tel: contactNumber,
      bookDate: selectedDate?.toDateString() || "",
      venue: selectVenue || "",
    };
    dispatch(addBooking(bookingData));
    window.alert("Booking successful!");
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Venue Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded p-4 w-full">
            <h2 className="text-lg font-medium text-black font-bold">My Profile</h2>
            {profile ? (
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-medium">Name:</span> {profile.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {profile.email}
                </div>
                <div>
                  <span className="font-medium">Tel:</span> {profile.tel ?? "-"}
                </div>
                <div>
                  <span className="font-medium">Member Since:</span>{" "}
                  {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "-"}
                </div>
              </div>
            ) : (
              <div className="mt-3 text-sm text-gray-500">Please sign in to view your profile.</div>
            )}
            {profileError && <div className="mt-2 text-sm text-red-600">{profileError}</div>}
          </div>
        </div>

        <div className="md:col-span-2">
            <div className="flex flex-col bg-white shadow rounded p-4 space-y-4 gap-4">
            <h2 className="text-lg font-medium text-gray-900">Reservation</h2>
            <TextField
              name="Name-Lastname"
              value={nameLastname}
              onChange={(e) => setNameLastname(e.target.value)}
              label="Name-Lastname"
            />
            <TextField
              name="Contact-Number"
              label="Contact-Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="venue-label">Venue</InputLabel>
              <Select
              id="venue"
              labelId="venue-label"
              defaultValue={venueNameLabel || ''}
              value={selectVenue}
              onChange={(e) => setSelectVenue(e.target.value)}
              >
              <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
              <MenuItem value="Spark">Spark Space</MenuItem>
              <MenuItem value="GrandTable">The Grand Table</MenuItem>
              </Select>
            </FormControl>
            <DateReserve selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <Button 
              name="Book Venue"
              variant="contained" 
              color="primary"
              fullWidth
              onClick={makeBooking}
            >
              Book Venue
            </Button>
            </div>
        </div>
      </div>
    </div>
  );
}