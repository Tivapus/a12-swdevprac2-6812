import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";

export default function VenuePage() {
  const venuesPromise = getVenues();

  return <VenueCatalog venuesJson={venuesPromise} />;
}