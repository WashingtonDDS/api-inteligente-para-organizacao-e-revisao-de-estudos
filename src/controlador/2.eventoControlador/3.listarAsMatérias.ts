import { Request, Response } from "express";
import { buscarMaterias } from "../../repositories/user-repository";

export const listarAsMatérias = async (req: Request, res: Response) => {
  try {
    const listaDeMaterias = await buscarMaterias();
    return res.status(200).json(listaDeMaterias);
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
