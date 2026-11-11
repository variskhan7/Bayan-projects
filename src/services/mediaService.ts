// Storage keys for customized images
const STORAGE_KEY = 'bayan_media_customizations';

export interface SiteMediaMap {
  // Hero slides
  hero_slide_1?: string;
  hero_slide_2?: string;
  hero_slide_3?: string;
  
  // Cutout number backdrop / about
  about_experience_bg?: string;
  about_site_photo?: string;

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

  // Video spotlight
  video_spotlight_poster?: string;

  // Custom logo
  brand_logo?: string;
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

export function updateSingleMedia(key: keyof SiteMediaMap, base64Url: string): void {
  const current = getCustomMedia();
  current[key] = base64Url;
  saveCustomMedia(current);
}

export function removeSingleMedia(key: keyof SiteMediaMap): void {
  const current = getCustomMedia();
  delete current[key];
  saveCustomMedia(current);
}

export function resetAllMedia(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('bayan_media_updated'));
}

// Convert File to Base64 with optional compression/downscaling
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

