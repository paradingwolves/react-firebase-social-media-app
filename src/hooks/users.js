import { doc, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

/**
 * Custom hook for fetching a user's data from Firebase Firestore.
 * @param {string} id - The ID of the user.
 * @returns {Object} - An object containing the user data and loading status.
 */
export function useUser(id) {
    const q = query(doc(db, "users", id)); // Creating a Firestore query to fetch the user document
    const [user, isLoading, error] = useDocumentData(q); // Fetching the user data and loading status using the useDocumentData hook

    return { user, isLoading };
}
