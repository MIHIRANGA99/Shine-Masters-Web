import { database } from "@/firebase/config";
import { collection, doc } from "firebase/firestore";

export const getReference = (locationId: string, serviceId?: string) => {
    const locationsRef = collection(database, "locations");
    const locationRef = doc(locationsRef, String(locationId));
    const servicesRef = collection(locationRef, "services");
    const serviceRef = serviceId? doc(servicesRef, String(serviceId)): null;
    const bookingsRef = serviceRef? collection(serviceRef, "bookings"): null;

    return {locationRef, locationsRef, serviceRef, servicesRef, bookingsRef}
}