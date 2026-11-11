import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Sector } from '../types';
import { STATIC_SECTORS } from '../data/staticData';

const COLLECTION_NAME = 'sectors';

export async function getAllSectors(): Promise<Sector[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('published', '==', true)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sector));
    }
  } catch (error) {
    console.warn('Firestore fetch sectors failed, using static data fallback:', error);
  }
  return STATIC_SECTORS;
}

export async function getSectorBySlug(slug: string): Promise<Sector | null> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('slug', '==', slug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Sector;
    }
  } catch (error) {
    console.warn('Firestore fetch sector by slug failed, using fallback:', error);
  }
  return STATIC_SECTORS.find(s => s.slug === slug) || null;
}

