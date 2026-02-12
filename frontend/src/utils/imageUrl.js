const ABSOLUTE_URL_REGEX = /^https?:\/\//i;
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

export const resolveImageUrl = (imagePath, backendurl = "") => {
  if (typeof imagePath !== "string") return "";

  const raw = imagePath.trim();
  if (!raw) return "";

  const normalized = raw.replace(/\\/g, "/");

  if (normalized.startsWith("//")) {
    return encodeURI(`https:${normalized}`);
  }

  if (ABSOLUTE_URL_REGEX.test(normalized)) {
    try {
      const parsed = new URL(normalized);
      if (
        parsed.protocol === "http:" &&
        !LOCAL_HOSTNAMES.has(parsed.hostname)
      ) {
        parsed.protocol = "https:";
        return encodeURI(parsed.toString());
      }
    } catch {
      // Return the input if URL parsing fails.
    }
    return encodeURI(normalized);
  }

  if (normalized.startsWith("data:") || normalized.startsWith("blob:")) {
    return normalized;
  }

  const baseUrl = (backendurl || "").replace(/\/+$/, "");
  if (!baseUrl) return encodeURI(normalized);

  if (normalized.startsWith("/")) {
    return encodeURI(`${baseUrl}${normalized}`);
  }

  return encodeURI(`${baseUrl}/${normalized}`);
};

