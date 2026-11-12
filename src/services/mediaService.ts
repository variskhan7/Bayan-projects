// Storage keys for customized images & slide texts
const STORAGE_KEY = 'bayan_media_customizations';

export interface SiteMediaMap {
  // Hero slides images
  hero_slide_1?: string;
  hero_slide_2?: string;
  hero_slide_3?: string;

  // Hero slides text (Bold Title & Description)
  hero_slide_1_title?: string;
  hero_slide_1_subtitle?: string;
  hero_slide_2_title?: string;
  hero_slide_2_subtitle?: string;
  hero_slide_3_title?: string;
  hero_slide_3_subtitle?: string;

  // Cutout number backdrop / about
  about_experience_bg?: string;
  about_site_photo?: string;
  about_title?: string;
  about_subtitle?: string;
  about_description?: string;

  // Sector image overrides (by slug)
  sector_urban_infrastructure?: string;
  sector_advanced_technology?: string;
  sector_transportation?: string;
  sector_oil_gas?: string;
  sector_power?: string;
  sector_metals_minerals?: string;
  sector_water_infrastructure?: string;
  sector_manufacturing?: string;

  // Project image overrides (by id)
  project_p1?: string;
  project_p2?: string;
  project_p3?: string;
  project_p4?: string;
  project_p5?: string;
  project_p6?: string;
  project_p7?: string;
  project_p8?: string;

  // Project texts
  project_p1_title?: string;
  project_p1_desc?: string;
  project_p2_title?: string;
  project_p2_desc?: string;
  project_p3_title?: string;
  project_p3_desc?: string;
  project_p4_title?: string;
  project_p4_desc?: string;

  // Video spotlight
  video_spotlight_poster?: string;
  video_title?: string;
  video_subtitle?: string;
  spotlight_video_url?: string;
  spotlight_video_name?: string;
  spotlight_video_source?: 'upload' | 'link';

  // Custom logo
  brand_logo?: string;

  // Generic key lookup
  [key: string]: string | undefined;
}

export function getCustomMedia(): SiteMediaMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading custom media:', err);
  }
  return {};
}

export function saveCustomMedia(media: SiteMediaMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(media));
    // Dispatch custom event so open components react instantly
    window.dispatchEvent(new Event('bayan_media_updated'));
  } catch (err) {
    console.error('Failed saving custom media:', err);
  }
}

export function updateSingleMedia(key: string, base64Url: string): void {
  const current = getCustomMedia();
  current[key] = base64Url;
  saveCustomMedia(current);
}

export function updateMediaText(key: string, value: string): void {
  const current = getCustomMedia();
  if (value && value.trim()) {
    current[key] = value.trim();
  } else {
    delete current[key];
  }
  saveCustomMedia(current);
}

export function updateMultipleMediaTexts(entries: Record<string, string>): void {
  const current = getCustomMedia();
  Object.entries(entries).forEach(([k, v]) => {
    if (v && v.trim()) {
      current[k] = v.trim();
    } else {
      delete current[k];
    }
  });
  saveCustomMedia(current);
}

export function removeSingleMedia(key: string): void {
  const current = getCustomMedia();
  delete current[key];
  saveCustomMedia(current);
}

export function removeSlotMediaAndText(
  imageKey: string,
  titleKey?: string,
  subtitleKey?: string
): void {
  const current = getCustomMedia();
  delete current[imageKey];
  if (titleKey) delete current[titleKey];
  if (subtitleKey) delete current[subtitleKey];
  saveCustomMedia(current);
}

export function resetAllMedia(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('bayan_media_updated'));
}

// Convert File to Base64 with compression/downscaling
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // Create canvas to downscale if very large
        const maxWidth = 1920;
        const maxHeight = 1080;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // Compress as jpeg base64
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve(dataUrl);
      };
      img.onerror = (e) => reject(e);
    };
    reader.onerror = (error) => reject(error);
  });
}

export interface ResolvedVideo {
  type: 'iframe' | 'video';
  src: string;
  isEmbed: boolean;
}

// Resolves Google Drive, Google Photos, YouTube, Vimeo, or direct MP4/WebM video links
export function resolveVideoSource(rawUrl?: string): ResolvedVideo {
  // High quality default infrastructure/construction showcase video if none set
  const DEFAULT_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  if (!rawUrl || !rawUrl.trim()) {
    return {
      type: 'video',
      src: DEFAULT_VIDEO,
      isEmbed: false
    };
  }

  const url = rawUrl.trim();

  // 1. Google Drive Links: e.g. drive.google.com/file/d/FILE_ID/view, drive.google.com/open?id=FILE_ID
  const gDriveMatch = url.match(/(?:drive|docs)\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([a-zA-Z0-9_-]+)/);
  if (gDriveMatch && gDriveMatch[1]) {
    const fileId = gDriveMatch[1];
    return {
      type: 'iframe',
      src: `https://drive.google.com/file/d/${fileId}/preview`,
      isEmbed: true
    };
  }

  // 2. YouTube Links: youtube.com/watch?v=..., youtu.be/...
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'iframe',
      src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      isEmbed: true
    };
  }

  // 3. Vimeo Links: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'iframe',
      src: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`,
      isEmbed: true
    };
  }

  // 4. Google Photos share links: if user pasted a photos.google.com link
  if (url.includes('photos.google.com') || url.includes('photos.app.goo.gl')) {
    return {
      type: 'iframe',
      src: url,
      isEmbed: true
    };
  }

  // 5. Direct MP4 / WebM / Blob / Base64 video file
  return {
    type: 'video',
    src: url,
    isEmbed: false
  };
}

// Re-export IndexedDB video storage for robust file handling
export * from './videoStorage';


