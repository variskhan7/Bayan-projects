import { JobOpening } from '../types';

const JOBS_STORAGE_KEY = 'bayan_admin_jobs';

/**
 * Get all jobs saved by admin
 */
export function getAllAdminJobs(): JobOpening[] {
  try {
    const raw = localStorage.getItem(JOBS_STORAGE_KEY);
    if (raw !== null) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed reading admin jobs:', err);
  }
  return [];
}

/**
 * Get only published jobs for the public careers page.
 * If admin has not published any jobs, this returns an empty array [].
 */
export function getPublishedJobs(): JobOpening[] {
  const all = getAllAdminJobs();
  return all.filter((job) => job.published !== false);
}

/**
 * Save jobs list
 */
export function saveAdminJobs(jobs: JobOpening[]): void {
  try {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    window.dispatchEvent(new Event('bayan_jobs_updated'));
  } catch (err) {
    console.error('Failed saving admin jobs:', err);
  }
}

/**
 * Publish a new job from Admin Panel
 */
export function addAdminJob(jobData: Omit<JobOpening, 'id' | 'slug' | 'postedDate'>): JobOpening {
  const current = getAllAdminJobs();
  const id = 'job-' + Date.now();
  const slug = jobData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000);

  const newJob: JobOpening = {
    ...jobData,
    id,
    slug,
    published: jobData.published !== undefined ? jobData.published : true,
    postedDate: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  };

  const updated = [newJob, ...current];
  saveAdminJobs(updated);
  return newJob;
}

/**
 * Toggle publish/unpublish status or update job details
 */
export function updateAdminJob(id: string, updatedFields: Partial<JobOpening>): void {
  const current = getAllAdminJobs();
  const updated = current.map((j) => (j.id === id ? { ...j, ...updatedFields } : j));
  saveAdminJobs(updated);
}

/**
 * Toggle publish status of a job
 */
export function togglePublishJob(id: string): void {
  const current = getAllAdminJobs();
  const updated = current.map((j) => {
    if (j.id === id) {
      return { ...j, published: j.published === false ? true : false };
    }
    return j;
  });
  saveAdminJobs(updated);
}

/**
 * Delete a job permanently
 */
export function deleteAdminJob(id: string): void {
  const current = getAllAdminJobs();
  const updated = current.filter((j) => j.id !== id);
  saveAdminJobs(updated);
}

/**
 * Clear all jobs (when admin wants zero active postings)
 */
export function clearAllJobs(): void {
  saveAdminJobs([]);
}
