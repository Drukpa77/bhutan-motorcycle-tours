/** Public-folder paths. Files live in /public and are served from the site root. */
export const BRAND = {
  logo: '/brand/logo.png',
} as const;

/** Resolve a file under /public/images, or pass a root-relative path. */
export const img = (file: string) => (file.startsWith('/') ? file : `/images/${file}`);
