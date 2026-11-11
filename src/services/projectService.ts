import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  doc, 
  getDoc 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Project } from '../types';
import { STATIC_PROJECTS } from '../data/staticData';

const COLLECTION_NAME = 'projects';

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('published', '==', true),
      where('featured', '==', true),
      limit(4)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    }
  } catch (error) {
    console.warn('Firestore fetch failed, using fallback static data:', error);
  }
  return STATIC_PROJECTS.filter(p => p.featured);
}

export async function getAllProjects(filters?: {
  sector?: string;
  status?: string;
  search?: string;
}): Promise<Project[]> {
  try {
    let q = query(
      collection(db, COLLECTION_NAME),
      where('published', '==', true)
    );

    if (filters?.sector && filters.sector !== 'All') {
      q = query(q, where('sector', '==', filters.sector));
    }
    if (filters?.status && filters.status !== 'All') {
      q = query(q, where('status', '==', filters.status));
    }

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      let results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      if (filters?.search) {
        const term = filters.search.toLowerCase();
        results = results.filter(p => 
          p.title.toLowerCase().includes(term) || 
          p.location.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
        );
      }
      return results;
    }
  } catch (error) {
    console.warn('Firestore query failed, using static fallback:', error);
  }

  // Fallback to static data
  let results = [...STATIC_PROJECTS];
  if (filters?.sector && filters.sector !== 'All') {
    results = results.filter(p => p.sector === filters.sector);
  }
  if (filters?.status && filters.status !== 'All') {
    results = results.filter(p => p.status === filters.status);
  }
  if (filters?.search) {
    const term = filters.search.toLowerCase();
    results = results.filter(p => 
      p.title.toLowerCase().includes(term) || 
      p.location.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }
  return results;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('slug', '==', slug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Project;
    }
  } catch (error) {
    console.warn('Firestore fetch project by slug failed, using fallback:', error);
  }
  return STATIC_PROJECTS.find(p => p.slug === slug) || null;
}

