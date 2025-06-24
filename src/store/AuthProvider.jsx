import React, { useEffect, useState } from 'react'
import { AuthContext } from './authContext';
import {createUserWithEmailAndPassword ,GoogleAuthProvider,onAuthStateChanged,signInWithEmailAndPassword,signInWithPopup} from 'firebase/auth';
import {auth} from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AuthProvider({children}) {

    const googleProvider = new GoogleAuthProvider();
    const [user,setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    
     useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoggedIn(!!firebaseUser); // this converts the firebaseUser to a boolean means true, false
    });

    return () => unsubscribe();
  }, []);

    const signUp = ({email,password}) => {
        console.log({email,password}, "userData in signup");

        createUserWithEmailAndPassword(auth,email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                setIsLoggedIn(true);
                toast.success('User created successfully and logged in');
                navigate('/');
                console.log("User logged in:", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsLoggedIn(false);
                setUser(null);
                // console.log('Error Code= ', error.code);
                if (errorCode === 'auth/email-already-in-use') {
                    toast.error('User already exists , Try Login ');
                    // console.error("Email already in use. Please use a different email.");
                }
                console.error("Error logging in:", errorCode, errorMessage);
            });
    };
    const login = async ({email,password})=>{

        try {
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            console.log("User logged in:", user);
             setUser(user);
           setIsLoggedIn(true);
            toast.success('User logged in successfully');
            navigate('/');
            console.log("User log in", user);
            console.log("is user Log in in AuthProvider:", isLoggedIn);

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === 'auth/invalid-credential'){
                toast.error('Invalid credentials, try again or sign up');
            }
            console.error("Error while logging in:", errorCode, errorMessage);
        }
    };

    const signInWithGoogle =()=>{
        signInWithPopup(auth,googleProvider)
        .then((result)=>{
            // it will give us a google access token , we can use it to use google Api
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // user information that is signed in
            const user = result.user;
            setUser(user);
            setIsLoggedIn(true);
            toast.success('User logged in with Google successfully');

        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("Error while signing in with Google:", errorCode, errorMessage, credential);
           

            
        })
    };


    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        toast.success('User logged out successfully');
        auth.signOut();
    };

    console.log('user log in nh bgrtkmefmdiub',isLoggedIn);
    
  return (
    <AuthContext.Provider value={{user,setUser,signUp,login,logout,isLoggedIn,setIsLoggedIn,signInWithGoogle}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider