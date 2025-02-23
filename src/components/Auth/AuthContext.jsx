// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { auth } from '../../firebase';
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged,
// } from 'firebase/auth';

// const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true); // Add loading state

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setCurrentUser(user);
//             setLoading(false); // Set loading to false after authentication state is determined
//         });

//         return () => unsubscribe(); // Cleanup on unmount
//     }, []);

//     const signup = (email, password) => {
//         return createUserWithEmailAndPassword(auth, email, password);
//     };

//     const login = (email, password) => {
//         return signInWithEmailAndPassword(auth, email, password);
//     };

//     const logout = () => {
//         return signOut(auth);
//     };

//     const value = {
//         currentUser,
//         signup,
//         login,
//         logout,
//         loading, // Expose loading state
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children} {/*  Only render children when not loading */}
//         </AuthContext.Provider>
//     );
// };