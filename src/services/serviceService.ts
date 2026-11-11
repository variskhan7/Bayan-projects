import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Service } from '../types';
import { STATIC_SERVICES } from '../data/staticData';

const COLLECTION_NAME = 'services';

export async function getAllServices(): Promise<Service[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('published', '==', true)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    }
  } catch (error) {
    console.warn('Firestore fetch services failed, using static data fallback:', error);
  }
  return STATIC_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('slug', '==', slug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Service;
    }
  } catch (error) {
    console.warn('Firestore fetch service by slug failed, using fallback:', error);
  }
  return STATIC_SERVICES.find(s => s.slug === slug) || null;
}

