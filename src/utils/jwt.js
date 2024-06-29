import { createSigner, createVerifier } from "fast-jwt";

const secret = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
  const signer = createSigner({key: secret, algorithm: 'HS256'});
  const token = signer(payload);
  return token;
}

const validateToken = (token) => {
  const verifier = createVerifier({key: secret, algorithms: ['HS256']});
  
  try {
    const payload = verifier(token);
    return {
      valid: true,
      payload
    }
  } catch(err) {
    return {
      valid: false,
      error: err.message
    }
  }
}

export {generateToken, validateToken};