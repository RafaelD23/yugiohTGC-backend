import { createSigner, createVerifier } from "fast-jwt";
import { UserPayload, ValidateUserTokenResponse } from "../types/index.js";

const secret: string | undefined = process.env.JWT_SECRET_KEY;

if (!secret) {
  throw new Error("JWT_SECRET_KEY environment variable is not defined");
}

const generateUserToken = (payload: UserPayload): string => {
  const signer = createSigner({ key: secret, algorithm: "HS256" });
  const token = signer(payload);
  return token;
};

const validateUserToken = (token: string): ValidateUserTokenResponse => {
  const verifier = createVerifier({ key: secret, algorithms: ["HS256"] });

  try {
    const payload = verifier(token);
    return {
      valid: true,
      payload,
    };
  } catch (err) {
    return {
      valid: false,
      error: (err as Error).message,
    };
  }
};

export { generateUserToken, validateUserToken };
