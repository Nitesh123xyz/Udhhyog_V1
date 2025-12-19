import base32 from "hi-base32";

export const encodePayload = (data) => ({
  data: base32.encode(JSON.stringify(data)),
});

export const decodePayload = (data) => {
  if (!data) return null;
  try {
    const decoded = base32.decode(data);
    return JSON.parse(decoded);
  } catch {
    return data;
  }
};
