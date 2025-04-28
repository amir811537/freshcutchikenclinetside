/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";

 export const AuthContext=createContext(null);
 
const auth = getAuth(app);



const AuthProvider = ({children}) => {

    const googleProvider= new GoogleAuthProvider();
    const googleSignin=(value)=>{
        setloading(true);
        return signInWithPopup(auth,googleProvider);
       }

    const [user,setuser]=useState(null);
    const [loading,setloading]=useState(true);



    const signuprg =(email,password)=>{
        setloading(true);
        return signInWithEmailAndPassword(auth,email,password);
      }

const createUser =(email,password)=>{
    setloading(true)
    return createUserWithEmailAndPassword(auth,email,password);
}

const logOut =()=>{
    return signOut(auth);
}



useEffect(()=>{
 const unsubcribe=   onAuthStateChanged(auth,currentuser =>{
        console.log('user in the auth state changed', currentuser);
        setuser(currentuser);
        setloading(false);
    });
    return ()=>{
        unsubcribe();
    }
},[])

const authinfo ={
    user,createUser,logOut,signuprg,googleSignin,loading
}

    return (
       <AuthContext.Provider value={authinfo}>

{children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;