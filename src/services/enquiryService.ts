import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Enquiry } from '../types';

const COLLECTION_NAME = 'enquiries';
const LOCAL_STORAGE_KEY = 'bayan_submitted_enquiries';

export function getLocalEnquiries(): Enquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading local enquiries:', err);
  }
  return [];
}

function saveLocalEnquiries(enqs: Enquiry[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(enqs));
    window.dispatchEvent(new Event('bayan_enquiries_updated'));
  } catch (err) {
    console.error('Failed saving local enquiries:', err);
  }
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const remote = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          subject: data.subject || '',
          message: data.message || '',
          createdAt: data.createdAt,
          submittedAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : new Date().toLocaleString(),
        } as Enquiry;
      });

      const local = getLocalEnquiries();
      const existingIds = new Set(remote.map((e) => e.id));
      const combined = [...remote];
      local.forEach((loc) => {
        if (!existingIds.has(loc.id)) combined.push(loc);
      });
      saveLocalEnquiries(combined);
      return combined;
    }
  } catch (error) {
    console.warn('Firestore fetch enquiries failed, using local fallback:', error);
  }

  return getLocalEnquiries();
}

export async function submitEnquiry(
  enquiry: Omit<Enquiry, 'createdAt' | 'id' | 'submittedAt'>
): Promise<{ success: boolean; id?: string }> {
  const timestampStr = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const tempId = 'enq-' + Date.now();
  const localRecord: Enquiry = {
    ...enquiry,
    id: tempId,
    submittedAt: timestampStr,
  };

  const currentLocal = getLocalEnquiries();
  saveLocalEnquiries([localRecord, ...currentLocal]);

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...enquiry,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting enquiry to Firestore:', error);
    return { success: true, id: tempId };
  }
}

export function deleteEnquiry(id: string): void {
  const current = getLocalEnquiries();
  const updated = current.filter((e) => e.id !== id);
  saveLocalEnquiries(updated);
}
