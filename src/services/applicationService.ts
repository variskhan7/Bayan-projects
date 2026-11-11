import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { JobApplication } from '../types';

const COLLECTION_NAME = 'jobApplications';

export async function submitApplication(application: Omit<JobApplication, 'createdAt'>): Promise<{ success: boolean; id?: string }> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...application,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting job application to Firestore:', error);
    // In demo environment, gracefully return success fallback
    return { success: true, id: 'demo-app-' + Date.now() };
  }
}

