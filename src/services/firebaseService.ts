import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { auth, db, storage } from '../lib/firebase';

// ==========================================
// 1. AUTHENTICATION HELPERS
// ==========================================

/**
 * Sign up a new user with email and password
 */
export const signUp = async (email: string, pass: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    return userCredential.user;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

/**
 * Log in an existing user
 */
export const logIn = async (email: string, pass: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

/**
 * Sign in with Google Popup
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Auth Error:", error);
    throw error;
  }
};

/**
 * Sign out current user
 */
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};

// ==========================================
// 2. FIRESTORE DATABASE HELPERS
// ==========================================

/**
 * Add a new document to a collection
 */
export const createData = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Firestore Add Error:", error);
    throw error;
  }
};

/**
 * Read all documents from a collection
 */
export const readData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore Read Error:", error);
    throw error;
  }
};

/**
 * Update a specific document
 */
export const updateData = async (collectionName: string, docId: string, newData: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, newData);
  } catch (error) {
    console.error("Firestore Update Error:", error);
    throw error;
  }
};

/**
 * Delete a document
 */
export const deleteData = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error("Firestore Delete Error:", error);
    throw error;
  }
};

// ==========================================
// 3. STORAGE HELPERS
// ==========================================

/**
 * Upload a file and get its download URL
 */
export const uploadFile = async (file: File, folder: string = 'uploads') => {
  try {
    // Create a reference (path) in storage
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the final URL
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Storage Upload Error:", error);
    throw error;
  }
};
