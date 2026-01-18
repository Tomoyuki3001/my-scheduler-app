import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1h",
  },
};
