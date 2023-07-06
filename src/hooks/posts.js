import {uuidv4} from '@firebase/util';  // Importing the uuidv4 function from the '@firebase/util' module
import { setDoc, doc, query, collection, orderBy, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";  // Importing the setDoc and doc functions from the "firebase/firestore" module
import { useState } from "react";  // Importing the useState hook from the "react" module
import { db } from '../lib/firebase';  // Importing the db object from the '../lib/firebase' module
import { useToast } from '@chakra-ui/react';  // Importing the useToast hook from the '@chakra-ui/react' module
import { useCollectionData } from 'react-firebase-hooks/firestore';

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

export function usePosts() { // this is a hook to make a query to the db to find the posts
    const dbQuery = query(collection(db, "posts"),orderBy('date', 'desc')); // query the Firetore collection "posts" and filter by Date

    const [posts, isLoading, error] = useCollectionData(dbQuery);

    if (error) throw error;
    return {posts, isLoading};

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