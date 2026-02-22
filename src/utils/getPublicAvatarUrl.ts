const S3_BASE = process.env.NEXT_PUBLIC_S3_BASE_URL!;

export const getPublicAvatarUrl = (path?: string): string | null =>
  !path ? null : /^(http|blob:|data:)/.test(path) ? path : `${S3_BASE}${path}`;

export const normalizeAvatar = (path?: string | null): string | undefined =>
  !path
    ? undefined
    : path.startsWith(S3_BASE)
      ? path.slice(S3_BASE.length)
      : path;
