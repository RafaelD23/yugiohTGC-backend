import crypto from 'crypto';

const generateHash = (text) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex');
}

const compareHash = (text, hash) => {
  const textHash = generateHash(text);

  return textHash == hash;
}

export {generateHash, compareHash};