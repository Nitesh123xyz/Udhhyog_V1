import base32 from "hi-base32";

export const encodePayload = (data) => ({
  data: base32.encode(JSON.stringify(data)),
});

export const decodePayload = (data) => {
  if (!data) return;
  if (typeof data === "string" && /^[A-Z2-7]+=*$/i.test(data)) {
    try {
      const decoded = JSON.parse(base32.decode(data));
      return decoded;
    } catch (err) {
      console.log(err);
    }
  }
};
