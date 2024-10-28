export const isLocalLink = (link, baseUrl) => {
  try {
    const url = new URL(link, baseUrl);
    const baseOrigin = new URL(baseUrl).origin;

    return url.origin === baseOrigin;
  } catch (error) {
    return false;
  }
};
