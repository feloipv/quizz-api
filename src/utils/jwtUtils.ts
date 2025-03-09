import jwt, { Secret } from "jsonwebtoken";
import ms from "ms";

const generateToken = (_id: number | string, time: ms.StringValue | number) => {
  const secretKey = process.env.JWT_SECRET as Secret;

  const token = jwt.sign({ user: { _id } }, secretKey as Secret, {
    expiresIn: time,
  });

  return token;
};

export default generateToken;
