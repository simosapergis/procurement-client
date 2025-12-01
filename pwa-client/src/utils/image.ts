export interface ImageQualityReport {
  score: number;
  accepted: boolean;
  reasons: string[];
  width: number;
  height: number;
}

const MIN_WIDTH = 1024;
const MIN_HEIGHT = 768;
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export async function validateImageQuality(file: File): Promise<ImageQualityReport> {
    const bitmap = await loadBitmap(file);
  const width = bitmap.width;
  const height = bitmap.height;
  bitmap.close?.();

  const reasons: string[] = [];
  if (file.size > MAX_SIZE_BYTES) reasons.push('File too large');
  if (width < MIN_WIDTH || height < MIN_HEIGHT) reasons.push('Resolution too low');

  const resolutionScore = Math.min(100, Math.round((width * height) / (MIN_WIDTH * MIN_HEIGHT) * 60));
  const sizeScore = Math.max(0, 40 - Math.round((file.size / MAX_SIZE_BYTES) * 40));
  const score = Math.min(100, resolutionScore + sizeScore);

  const accepted = reasons.length === 0;

  return {
    score,
    accepted,
    reasons,
    width,
    height,
  };
}

const loadBitmap = async (file: File): Promise<ImageBitmap> => {
  if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
    return createImageBitmap(file);
  }

  if (typeof document === 'undefined') {
    throw new Error('Image APIs are not available in this environment');
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      createImageBitmap(img)
        .then(resolve)
        .catch(reject);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
