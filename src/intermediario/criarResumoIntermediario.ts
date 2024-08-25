import { NextFunction, Request, Response } from "express";

export const validarCorpoResumo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { materiaId, topicos } = req.body;

  try {
    if (!materiaId || !topicos) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
