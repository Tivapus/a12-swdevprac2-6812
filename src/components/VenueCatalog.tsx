import Link from "next/link";
import Card from "./Card";
import { VenueJson } from "../../interface";

interface Props {
  venuesJson: Promise<VenueJson>;
}

export default async function VenueCatalog({ venuesJson }: Props) {
  const json = await venuesJson;
  const venues = json.data.slice(0, 3);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-5">
      {venues.map((v) => (
        <Link key={v._id} href={`/venue/${v._id}`} style={{ textDecoration: "none" }}>
          <div>
            <Card venueName={v.name} imgSrc={v.picture} />
          </div>
        </Link>
      ))}
    </div>
  );
}
