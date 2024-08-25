import { NextFunction, Request, Response } from "express";

import { buscarEmail } from "../repositories/user-repository";
export const validaSeExisteEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const existeUsuario = await buscarEmail(email);

    if (existeUsuario) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
