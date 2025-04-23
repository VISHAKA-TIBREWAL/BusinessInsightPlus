// In your newsService.tsx (for your frontend)

import { getFirestore, collection, query, orderBy, limit, getDocs, DocumentData } from 'firebase/firestore';
import { app } from './AuthContext'; // Assuming your Firebase app is initialized in AuthContext.tsx

const db = getFirestore(app);

export interface NewsItemFromFirestore extends DocumentData {
  id: string; // Firestore document ID - Explicitly included
  title?: string;
  summary?: string[];
  imageUrl?: string;
  publishedAt?: string;
  source?: string;
  url?: string;
  savedAt?: any; // Firestore Timestamp
  // Add other fields as necessary based on your Firestore document structure
}

export async function getLatestNewsFromFirestore(): Promise<NewsItemFromFirestore[]> {
  try {
    // 1. Get today's collection name (YYYYMMDD format)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const collectionName = `${year}${month}${day}`;

    // 2. Create a reference to the news collection for today
    const newsCollectionRef = collection(db, collectionName);

    // 3. Create a query to fetch documents ordered by savedAt (descending) and limit to 6
    const q = query(newsCollectionRef, orderBy('savedAt', 'desc'), limit(12));

    // 4. Execute the query
    const querySnapshot = await getDocs(q);

    // 5. Extract data
    const latestNews: NewsItemFromFirestore[] = [];
    querySnapshot.forEach((doc) => {
      latestNews.push({
        id: doc.id,
        ...doc.data() as Omit<NewsItemFromFirestore, 'id'>, // Omit id from doc.data()
      });
    });

    console.log('Latest news from Firestore (Client SDK):', latestNews);
    return latestNews;
  } catch (error) {
    console.error('Error fetching latest news from Firestore (Client SDK):', error);
    return [];
  }
}