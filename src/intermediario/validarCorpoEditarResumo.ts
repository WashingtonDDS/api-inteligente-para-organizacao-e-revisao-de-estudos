import { NextFunction, Request, Response } from "express";

export const validarCorpoEditarResumo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { materiaId, titulo } = req.body;

  try {
    if (!materiaId || !titulo) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
