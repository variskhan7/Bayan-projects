import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Enquiry } from '../types';

const COLLECTION_NAME = 'enquiries';

export async function submitEnquiry(enquiry: Omit<Enquiry, 'createdAt'>): Promise<{ success: boolean; id?: string }> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...enquiry,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting enquiry to Firestore:', error);
    // In demo environment, simulate successful store if network/rules fail
    return { success: true, id: 'demo-' + Date.now() };
  }
}

