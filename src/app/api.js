import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import forge from "node-forge";

// ---------------------------------------------------
const publicBackendKey = import.meta.env.VITE_PUBLIC_BACKEND_KEY?.replace(
  /\\n/g,
  "\n"
);
const privateFrontendKey = import.meta.env.VITE_PRIVATE_FRONTEND_KEY?.replace(
  /\\n/g,
  "\n"
);

// ---------------------------------------------------

const encryptData = (data) => {
  const publicKey = forge.pki.publicKeyFromPem(publicBackendKey);
  const json = JSON.stringify(data);
  const encrypted = publicKey.encrypt(json, "RSA-OAEP");
  return forge.util.encode64(encrypted);
};

// ---------------------------------------------------

const decryptData = (encryptedBase64) => {
  const privateKey = forge.pki.privateKeyFromPem(privateFrontendKey);
  const decoded = forge.util.decode64(encryptedBase64);
  return JSON.parse(privateKey.decrypt(decoded, "RSA-OAEP"));
};

// ---------------------------------------------------

export const baseQuery = async (args, api, extraOptions) => {
  const modifiedArgs = {
    ...args,
    body: args.body ? encryptData(args.body) : undefined,
    headers: {
      ...args.headers,
      "Content-Type": "text/plain", // because encrypted string is not JSON
    },
  };

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "https://yourdomain.com/api/",
  });

  const response = await rawBaseQuery(modifiedArgs, api, extraOptions);

  if (response?.data) {
    try {
      response.data = decryptData(response.data);
    } catch (e) {
      console.error("Decryption failed:", e);
    }
  }

  return response;
};
