import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { DASHBOARD, LOGIN } from '../lib/routes';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import  isUsernameExists  from '../util/isUsernameExists';


export function useAuth() {
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true); // true because useAuth() always loads when the page loads
    const [user, setUser] = useState(null);

    // everytime authLoading changes, the useEffect hook runs
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const ref = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(ref);
            setUser(docSnap.data());
            setLoading(false);
        }

        if (!authLoading) {
            if (authUser) fetchData();
            else setLoading(false); // Not signed in
          }
        }, [authLoading]);

    return {user, isLoading, error};
}

// hook to sign users in
export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function login({ email, password, redirectTo = DASHBOARD }) {
      setLoading(true);
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        console.log(redirectTo);

        navigate(redirectTo);
        
      } catch (error) {
        toast({
          title: "Logging in failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        setLoading(false);
      } finally {
            setLoading(false);
      }
    }
  
    return { login, isLoading };
  }


// hook to register new users in Firebase
export function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function register({
      username,
      email,
      password,
      redirectTo = DASHBOARD,
    }) {
      setLoading(true);
  
      const usernameExists = await isUsernameExists(username);
  
      if (usernameExists) {
        // message ig username is already in use 
        toast({
          title: "Username already exists",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        setLoading(false);
      } else {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
            // Create a new document in the "users" collection with the user data
          await setDoc(doc(db, "users", res.user.uid), {
            id: res.user.uid,
            username: username.toLowerCase(),
            avatar: "",
            date: Date.now(),
          });
          // message for when account is created successfully
          toast({
            title: "Account created",
            description: "You are logged in",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
          });
        // Redirect the user to the home page
          navigate(redirectTo);
        } catch (error) {
            // error message for when sign up fails
          toast({
            title: "Signing Up failed",
            description: error.message,
            status: "error",
            isClosable: true,
            position: "top",
            duration: 5000,
          });
        } finally {
          setLoading(false);
        }
      }
    }
  
    return { register, isLoading };
  }

// hook to sign users out of app
export function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast(); 
    const navigate = useNavigate(); // used to redirect user to Home screen

    async function logout() {
        if (await signOut()) {
            /* toast notification when users log out */
            toast({
                title: "Successfully Logged Out",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000
            });
            navigate(LOGIN); // redirect users to login page after logging out
        } // else: show error [signOut() returns false if failed]
    }

    return {logout, isLoading};
}