import {uuidv4} from '@firebase/util';  // Importing the uuidv4 function from the '@firebase/util' module
import { arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where } from "firebase/firestore";  // Importing the setDoc and doc functions from the "firebase/firestore" module
import { useState } from "react";  // Importing the useState hook from the "react" module
import { db } from '../lib/firebase';  // Importing the db object from the '../lib/firebase' module
import { useToast } from '@chakra-ui/react';  // Importing the useToast hook from the '@chakra-ui/react' module
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

export default function useAddPost() {

    const [isLoading, setLoading] = useState(false);  // Creating a state variable 'isLoading' and a corresponding 'setLoading' function, initialized with 'false'
    const toast = useToast();  // Creating a 'toast' variable using the useToast hook

    async function addPost(post) {
        setLoading(true);  // Setting the 'isLoading' state variable to 'true'
        const id = uuidv4();  // Generating a unique identifier using the uuidv4 function
        await setDoc(doc(db, "posts", id), {  // Storing the post object in the Firestore database at the specified path, with the generated ID as the document ID
            ...post,  // Spreading the properties of the 'post' object
            id,  // Adding the generated ID to the 'post' object
            date: Date.now(),  // Adding the current timestamp to the 'post' object
            likes: []  // Adding an empty array for the 'likes' property in the 'post' object
        });
        toast({  // Displaying a toast notification
            title: "Post Added Successfully!",  // Title of the toast notification
            status: "success",  // Status of the toast notification (success, error, warning, info)
            isClosable: true,  // Allowing the toast notification to be closable
            position: "top",  // Position of the toast notification on the screen (top, bottom)
            duration: 5000,  // Duration of the toast notification in milliseconds (5 seconds)
        });
        setLoading(false);  // Setting the 'isLoading' state variable back to 'false'

    }

    return {addPost, isLoading};  // Returning an object with the 'addPost' function and the 'isLoading' state variable
}



/**
 * Custom hook for toggling the like status of a post.
 * @param {Object} options - Options for toggling the like.
 * @param {string} options.id - The ID of the post.
 * @param {boolean} options.isLiked - Indicates if the post is already liked.
 * @param {string} options.uid - The ID of the user performing the like.
 * @returns {Object} - An object containing the toggle function and loading status.
 */
export function useToggleLike({ id, isLiked, uid }) {
    const [isLoading, setLoading] = useState(false);
    /**
     * Toggle the like status of the post.
     */
    async function toggleLike() {
        setLoading(true);
        const docRef = doc(db, "posts", id);
        await updateDoc(docRef, {
            likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
        });
        setLoading(false);
    }

    return {toggleLike, isLoading}
}

export function useDeletePost(id) {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
  
    async function deletePost() {
      const res = window.confirm("Are you sure you want to delete this post?");
  
      if (res) {
        setLoading(true);
  
        // Delete post document
        await deleteDoc(doc(db, "posts", id));
  
        // Delete comments
        const q = query(collection(db, "comments"), where("postID", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));
  
        toast({
          title: "Post deleted!",
          status: "info",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
  
        setLoading(false);
      }
    }
  
    return { deletePost, isLoading };
  }

export function usePost(id)  { // hook for displaying a specific post
    const q = doc(db, "posts", id);
    const [post, isLoading] = useDocumentData(q);

    return {post, isLoading};
}

/**
 * Custom hook for fetching posts from the database.
 * @param {string} uid - Optional user ID to filter posts by user.
 * @returns {Object} - The fetched posts and loading status.
 */
export function usePosts(uid = null) {
    // Create a Firestore query based on the provided user ID (if any)
    const q = uid
      ? query(
          collection(db, 'posts'),
          orderBy('date', 'desc'),
          where('uid', '==', uid)
        )
      : query(collection(db, 'posts'), orderBy('date', 'desc'));
  
    // Use the useCollectionData hook to fetch the posts and loading status
    const [posts, isLoading, error] = useCollectionData(q);
  
    if (error) throw error; // Throw an error if there's an error in fetching the posts
  
    return { posts, isLoading };
  }