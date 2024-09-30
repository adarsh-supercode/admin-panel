import jwt from 'jsonwebtoken';

export const isAuthenticated = (req) => {
  const token = req.cookies.token;

  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};
