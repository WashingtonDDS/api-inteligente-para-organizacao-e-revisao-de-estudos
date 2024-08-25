import { NextFunction, Request, Response } from "express";
import { buscarEmail } from "../repositories/user-repository";

export const validarCorpoLoginIntermediario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
export const validaSeNaoExisteEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const existeUsuario = await buscarEmail(email);

    if (!existeUsuario) {
      return res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
