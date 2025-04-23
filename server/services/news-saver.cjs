const admin = require('firebase-admin');
const axios = require('axios');

// Initialize Firebase using environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const NEWS_API_KEY = '6b688c16d3fc4837bbad8aeb8e22c31b';

async function fetchAndSaveNews() {
  try {
    // 1. Fetch news
    const { data } = await axios.get(
            `https://newsapi.org/v2/top-headlines?category=business&apiKey=${NEWS_API_KEY}` // Added category=business
        );

    // 2. Determine the collection name based on today's date (YYYYMMDD format)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    const collectionName = `${year}${month}${day}`;

    const batch = admin.firestore().batch();
    data.articles.forEach(article => {
      const ref = admin.firestore().collection(collectionName).doc(); // Use the dynamic collection name
      batch.set(ref, {
        title: article.title,
        url: article.url,
        imageUrl: article.urlToImage || null,
        publishedAt: new Date(article.publishedAt),
        savedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    await batch.commit();
    console.log(`Business news saved successfully to collection: ${collectionName}!`);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchAndSaveNews();