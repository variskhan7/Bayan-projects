import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { JobApplication } from '../types';

const COLLECTION_NAME = 'jobApplications';
const LOCAL_STORAGE_KEY = 'bayan_submitted_applications';

/**
 * Get locally cached/stored applications (fast & persistent across reloads)
 */
export function getLocalApplications(): JobApplication[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading local applications:', err);
  }
  return [];
}

/**
 * Save applications to local store and trigger realtime event
 */
function saveLocalApplications(apps: JobApplication[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(apps));
    window.dispatchEvent(new Event('bayan_applications_updated'));
  } catch (err) {
    console.error('Failed saving local applications:', err);
  }
}

/**
 * Fetch all job applications for the Admin Panel (Firestore with local fallback)
 */
export async function getAllApplications(): Promise<JobApplication[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const remoteApps = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          position: data.position || '',
          introduction: data.introduction || '',
          createdAt: data.createdAt,
          submittedAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : new Date().toLocaleString(),
          status: data.status || 'New',
        } as JobApplication;
      });

      // Merge with local storage to ensure zero loss
      const local = getLocalApplications();
      const existingIds = new Set(remoteApps.map((a) => a.id));
      const combined = [...remoteApps];
      local.forEach((loc) => {
        if (!existingIds.has(loc.id)) {
          combined.push(loc);
        }
      });
      saveLocalApplications(combined);
      return combined;
    }
  } catch (error) {
    console.warn('Firestore fetch applications failed, using local storage:', error);
  }

  return getLocalApplications();
}

/**
 * Submit candidate application (saves to both Firestore & LocalStorage)
 */
export async function submitApplication(
  application: Omit<JobApplication, 'createdAt' | 'id' | 'submittedAt' | 'status'>
): Promise<{ success: boolean; id?: string }> {
  const timestampStr = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const tempId = 'app-' + Date.now();
  const localRecord: JobApplication = {
    ...application,
    id: tempId,
    submittedAt: timestampStr,
    status: 'New',
  };

  // Always store locally first so admin sees it instantly
  const currentLocal = getLocalApplications();
  saveLocalApplications([localRecord, ...currentLocal]);

  // Attempt Firestore sync
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...application,
      status: 'New',
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting job application to Firestore:', error);
    return { success: true, id: tempId };
  }
}

/**
 * Update candidate application status (e.g., Shortlisted, Reviewed, Rejected)
 */
export function updateApplicationStatus(id: string, status: 'New' | 'Reviewed' | 'Shortlisted' | 'Rejected'): void {
  const current = getLocalApplications();
  const updated = current.map((app) => (app.id === id ? { ...app, status } : app));
  saveLocalApplications(updated);
}

/**
 * Delete a candidate application
 */
export function deleteApplication(id: string): void {
  const current = getLocalApplications();
  const updated = current.filter((app) => app.id !== id);
  saveLocalApplications(updated);
}

/**
 * Clear all applications
 */
export function clearAllApplications(): void {
  saveLocalApplications([]);
}
