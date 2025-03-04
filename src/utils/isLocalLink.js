export const isLocalLink = (link, baseUrl) => {
  if (!link) {
    return false;
  }

  try {
    const url = new URL(link, baseUrl);
    const baseOrigin = new URL(baseUrl).origin;

    return url.origin === baseOrigin;
  } catch {
    return false;
  }
};
