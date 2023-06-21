import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

// Check if a username already exists in the "users" collection
export default async function isUsernameExists(username) {
  // Create a query to find documents in the "users" collection where the "username" field is equal to the provided username
  const q = query(collection(db, "users"), where("username", "==", username));

  // Execute the query and get the query snapshot
  const querySnapshot = await getDocs(q);

  // Return whether the query snapshot has any documents (indicating that the username already exists)
  return querySnapshot.size > 0;
}
