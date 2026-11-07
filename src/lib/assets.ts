/** Public-folder paths. Files live in /public and are served from the site root. */
export const BRAND = {
  logo: '/brand/logo.png',
} as const;

/** Resolve a file under /public/images, or pass a root-relative path. */
export function img(file: string): string;
export function img(file: string | undefined): string | undefined;
export function img(file?: string) { return file === undefined ? undefined : file.startsWith('/') ? file : `/images/${file}`; }

/**
 * Resized, re-encoded (AVIF/WebP) URL for places next/image can't go: CSS backgrounds and <video poster>.
 * `w` must be one of Next's default sizes: 640, 750, 828, 1080, 1200, 1920, 2048, 3840.
 */
export const optimized = (file: string, w: 640 | 750 | 828 | 1080 | 1200 | 1920 = 1200) =>
  `/_next/image?url=${encodeURIComponent(img(file))}&w=${w}&q=75`;
