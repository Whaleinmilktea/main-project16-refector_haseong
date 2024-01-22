import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"

export const docRef = await getDocs(collection(db, "handshake"))

