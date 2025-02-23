// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { auth, db } from '../../firebase';
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut, // Import signOut
// } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// export const signupUser = createAsyncThunk(
//     'auth/signup',
//     async ({ email, password, role }, { rejectWithValue }) => {
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Store additional user data in Firestore, based on role
//             const collectionName = role === 'admin' ? 'admins' : 'clients';
//             await setDoc(doc(db, collectionName, user.uid), {
//                 email: user.email,
//                 role: role,
//             });

//             return user;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const loginUser = createAsyncThunk(
//     'auth/login',
//     async ({ email, password }, { rejectWithValue }) => {
//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Determine the collection to search in based on email suffix (example logic)
//             const collectionName = email.endsWith('@admin.com') ? 'admins' : 'clients';

//             // Get user data from Firestore
//             const userDoc = await getDoc(doc(db, collectionName, user.uid));

//             if (userDoc.exists()) {
//                 const userData = userDoc.data();
//                 return { user: user, role: userData.role };
//             } else {
//                 return rejectWithValue('User not found or invalid credentials.');
//             }
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const logoutUser = createAsyncThunk(
//     'auth/logout',
//     async (_, { rejectWithValue }) => {
//         try {
//             await signOut(auth);
//             return;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );