import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { NewsArticle } from '../types';
import { STATIC_NEWS } from '../data/staticData';

const COLLECTION_NAME = 'news';

export async function getLatestNews(limitCount = 3): Promise<NewsArticle[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('published', '==', true),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
    }
  } catch (error) {
    console.warn('Firestore fetch latest news failed, using fallback:', error);
  }
  return STATIC_NEWS.slice(0, limitCount);
}

export async function getAllNews(filters?: {
  category?: string;
  search?: string;
}): Promise<NewsArticle[]> {
  try {
    let q = query(
      collection(db, COLLECTION_NAME),
      where('published', '==', true)
    );

    if (filters?.category && filters.category !== 'All') {
      q = query(q, where('category', '==', filters.category));
    }

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      let results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
      if (filters?.search) {
        const term = filters.search.toLowerCase();
        results = results.filter(n =>
          n.title.toLowerCase().includes(term) ||
          n.description.toLowerCase().includes(term) ||
          n.content.toLowerCase().includes(term)
        );
      }
      return results;
    }
  } catch (error) {
    console.warn('Firestore fetch all news failed, using fallback:', error);
  }

  // Fallback
  let results = [...STATIC_NEWS];
  if (filters?.category && filters.category !== 'All') {
    results = results.filter(n => n.category === filters.category);
  }
  if (filters?.search) {
    const term = filters.search.toLowerCase();
    results = results.filter(n =>
      n.title.toLowerCase().includes(term) ||
      n.description.toLowerCase().includes(term) ||
      n.content.toLowerCase().includes(term)
    );
  }
  return results;
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('slug', '==', slug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as NewsArticle;
    }
  } catch (error) {
    console.warn('Firestore fetch news by slug failed, using fallback:', error);
  }
  return STATIC_NEWS.find(n => n.slug === slug) || null;
}

