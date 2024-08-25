import * as jwt from "jsonwebtoken";

export const criarToken = (id: any) => {
  try {
    const token = jwt.sign(id, process.env.SECRET || "", {
      expiresIn: "8h",
    });

    return token;
  } catch (error) {
    return false;
  }
};

export const pegarIdToken = (token: string) => {
  try {
    const { id } = jwt.verify(
      token,
      process.env.SECRET || ""
    ) as jwt.JwtPayload;

    return id;
  } catch (error) {
    return false;
  }
};
