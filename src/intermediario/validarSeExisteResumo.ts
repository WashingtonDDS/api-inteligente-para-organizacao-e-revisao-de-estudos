import { NextFunction, Request, Response } from "express";
import { buscarResumos } from "../repositories/user-repository";
import { pegarIdToken } from "../auxiliares/token.auxilar";

export const validarSeExisteResumo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = String(authorization).split(" ")[1];

  const idUsuario = pegarIdToken(token);
  try {
    const idResumoEncontrado = await buscarResumos(Number(id), idUsuario);

    if (!idResumoEncontrado) {
      return res.status(404).json({
        mensagem: "Resumo não encontrado",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
