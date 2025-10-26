import Image from "next/image";
import getVenue from "@/libs/getVenue";
import { VenueItem, VenueJson } from "../../../../../interface";
import Link from "next/link";

export default async function VenueDetailPage({ params }: { params: Promise<{ vid: string }> }) {
  const { vid } = await params;
  const result = await getVenue(vid).catch(() => null);

  let venue: VenueItem | undefined;
  if ((result as VenueJson).data !== undefined) {
    const d = (result as VenueJson).data;
    if (Array.isArray(d)) venue = d[0];
    else if (d && typeof d === 'object') venue = d as unknown as VenueItem;
  } else if ((result as VenueItem)._id) {
    venue = result as VenueItem;
  }

  if (!result) return <div>Venue not found</div>;
  if (!venue) return <div>Venue not found</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "32px" }}>
      <Image src={venue.picture} alt={venue.name} width={600} height={400} />
      <h1 className="text-2xl font-bold text-black">{venue.name}</h1>
      <p className="text-black">{venue.address}</p>
      <p className="text-black">
        {venue.district}, {venue.province} {venue.postalcode}
      </p>
      <p className="text-black">Tel: {venue.tel}</p>
      <p className="text-black">Price: {venue.dailyrate}</p>
      <Link href={`/booking?venueId=${venue._id}&venueName=${venue.name}`}>
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
          >
            Make Booking
        </button>
      </Link>
    </div>
  );
}