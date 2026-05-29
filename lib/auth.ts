import jwt from "jsonwebtoken";

const SECRET_KEY = "super_secret_temporary_key_for_demo";

export const signToken = (payload: any) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
