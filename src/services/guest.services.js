import { db } from "../firebase-config";
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

const guestCollectionRef = collection(db, "guests");

class GuestDataService {
    addGuests = (newGuest) => {
        return addDoc(guestCollectionRef, newGuest);
    };

    getAllGuests = () => {
        return getDocs(guestCollectionRef);
    };

    updateGuests = (guests) => {
        guests.forEach(async (g) => {
            const docSnap = doc(db, "guests", g.id.toString());
            await setDoc(docSnap, { ...g });
        });
    };
}

export default new GuestDataService();
