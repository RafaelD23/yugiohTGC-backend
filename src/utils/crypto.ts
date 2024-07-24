import crypto from "crypto";

const generateHash = (text: string): string => {
  const hash = crypto.createHash("sha256");
  hash.update(text);
  return hash.digest("hex");
};

const compareHash = (text: string, hash: string): boolean => {
  const textHash = generateHash(text);
  return textHash === hash;
};

export { generateHash, compareHash };
