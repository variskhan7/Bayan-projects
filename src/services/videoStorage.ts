// High-Capacity IndexedDB Video Storage for BAYAN PROJECTS
// Solves localStorage quota limits by storing raw video Blobs/Files directly in browser database.

const DB_NAME = 'bayan_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'videos';
const VIDEO_KEY = 'spotlight_video_blob';
const META_KEY = 'spotlight_video_meta';

export interface VideoMetadata {
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

function openVideoDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open database'));
  });
}

// Saves a video file directly as a Blob into IndexedDB
export async function saveUploadedVideoFile(file: File): Promise<{ blobUrl: string; meta: VideoMetadata }> {
  const db = await openVideoDB();
  const meta: VideoMetadata = {
    name: file.name,
    size: file.size,
    type: file.type || 'video/mp4',
    uploadedAt: new Date().toISOString()
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    // Store the binary file/blob
    const putBlobReq = store.put(file, VIDEO_KEY);
    // Store metadata
    store.put(meta, META_KEY);

    putBlobReq.onsuccess = () => {
      const blobUrl = URL.createObjectURL(file);
      resolve({ blobUrl, meta });
    };
    putBlobReq.onerror = () => reject(putBlobReq.error || new Error('Failed saving video file to IndexedDB'));
  });
}

// Retrieves the video Blob from IndexedDB
export async function getUploadedVideoBlob(): Promise<Blob | null> {
  try {
    const db = await openVideoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(VIDEO_KEY);
      req.onsuccess = () => resolve((req.result as Blob) || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Error fetching video blob:', err);
    return null;
  }
}

// Retrieves the stored video metadata
export async function getUploadedVideoMeta(): Promise<VideoMetadata | null> {
  try {
    const db = await openVideoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(META_KEY);
      req.onsuccess = () => resolve((req.result as VideoMetadata) || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    return null;
  }
}

// Retrieves the playable object URL for the uploaded video
export async function getUploadedVideoObjectUrl(): Promise<string | null> {
  const blob = await getUploadedVideoBlob();
  if (blob) {
    return URL.createObjectURL(blob);
  }
  return null;
}

// Clears the uploaded video completely from IndexedDB
export async function clearUploadedVideoFile(): Promise<void> {
  try {
    const db = await openVideoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(VIDEO_KEY);
      store.delete(META_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Error deleting video from IndexedDB:', err);
  }
}
