import { db } from '../contexts/AuthContext';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp,
  collection,
  query,
  getDocs,
  deleteDoc
} from 'firebase/firestore';

interface NewsData {
  title: string | null;
  summary: string[] | null;
  imageUrl: string | null;
  publishedAt: string | null;
  source: string | null;
  url: string | null;
}

export interface SavedNewsItem extends NewsData {
  id: string;
  savedAt: string;
}



// Option 1: Using subcollections (recommended)
export const saveNewsForUser = async (userId: string, newsId: string, newsData: NewsData): Promise<boolean | string> => {
  try {
    const userSavedNewsRef = doc(db, 'users', userId, 'savedNews', newsId);
    const docSnap = await getDoc(userSavedNewsRef);
    
    if (docSnap.exists()) {
      return "already there";
    }
    
    await setDoc(userSavedNewsRef, {
      ...newsData,
      savedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error('Error saving news:', error);
    return false;
  }
};

export const unsaveNewsForUser = async (userId: string, newsId: string): Promise<boolean> => {
  try {
    const userSavedNewsRef = doc(db, 'users', userId, 'savedNews', newsId);
    await deleteDoc(userSavedNewsRef); // Directly delete the document
    return true;
  } catch (error) {
    console.error('Error unsaving news:', error);
    return false;
  }
};

export const getUserSavedNews = async (userId: string): Promise<SavedNewsItem[]> => {
  try {
    const userSavedNewsRef = collection(db, 'users', userId, 'savedNews');
    const q = query(userSavedNewsRef);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as SavedNewsItem));
  } catch (error) {
    console.error('Error fetching saved news:', error);
    return [];
  }
};
