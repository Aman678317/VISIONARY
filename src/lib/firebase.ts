import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

/**
 * Validates connection to Firestore.
 */
async function testConnection() {
  try {
    // Attempt to read a non-existent doc to trigger connection check
    await getDocFromServer(doc(db, 'system_check', 'heartbeat'));
    console.log("Firebase connection established.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or internet connection.");
    } else {
      // Common permission denied on check is expected if doc doesn't exist
      console.log("Firebase initialized.");
    }
  }
}

testConnection();
