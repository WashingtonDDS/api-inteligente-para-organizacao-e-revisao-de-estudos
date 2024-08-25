import { NextFunction, Request, Response } from "express";
import { pegarIdToken } from "../auxiliares/token.auxilar";
import { buscarPorId } from "../repositories/user-repository";

export const intermediarioDeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ mensagem: "Falha na autenticação" });
    }

    const token = authorization.split(" ")[1];

    const id = pegarIdToken(token);

    if (!id) {
      return res.status(401).json({ mensagem: "Falha na autenticação" });
    }

    const tokenInvalido = await buscarPorId(id);

    if (tokenInvalido.length === 0) {
      return res.status(402).json({ mensagem: "Falha na autenticação" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};
