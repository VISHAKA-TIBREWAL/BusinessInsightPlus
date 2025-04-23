import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore
const googleProvider = new GoogleAuthProvider();

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

async function saveUserToDatabase(userData: UserData) {
  try {
    const usersCollection = collection(db, 'users'); // Get the 'users' collection
    const userDocRef = doc(usersCollection, userData.uid); // Create a document with the user's UID

    await setDoc(userDocRef, {
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      lastSignIn: new Date(), // You might want to update this on each sign-in
    }, { merge: true }); // Use merge to update existing documents

    console.log('User saved to database:', userData.uid);
  } catch (error) {
    console.error('Error saving user to database:', error);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user to database
      if (user) {
        await saveUserToDatabase({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
        });
      }
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}