import firebasedb from "./firebase";
import { getFirestore } from "firebase/firestore";

const fireStore = getFirestore(firebasedb.firebase);
export default fireStore;
