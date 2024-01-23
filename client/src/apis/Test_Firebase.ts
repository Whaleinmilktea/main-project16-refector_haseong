import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"

export const docRef = async () => {
    const res = await getDocs(collection(db, "handshake"))
    return res.docs.forEach((doc) => {
      console.log(doc.data());
    })
}

// export const docRef = await getDocs(collection(db, "handshake"))