import { NextFunction, Request, Response } from "express";
import { buscarMaterias_id } from "../repositories/user-repository";

export const validarSeExisteMateria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { materiaId } = req.body;

  try {
    const idMateriaEncontrado = await buscarMaterias_id(materiaId);

    if (idMateriaEncontrado.length === 0) {
      return res.status(404).json({
        mensagem: "Matéria não encontrada",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
