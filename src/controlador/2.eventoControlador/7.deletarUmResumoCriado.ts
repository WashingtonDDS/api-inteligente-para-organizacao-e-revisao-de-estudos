import { Request, Response } from "express";

import { pegarIdToken } from "../../auxiliares/token.auxilar";
import {
  buscarResumos,
  deletarResumo,
} from "../../repositories/user-repository";

export const deletarUmResumoCriado = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = String(authorization).split(" ")[1];

  try {
    const idUsuario = pegarIdToken(token);

    await deletarResumo(Number(id), idUsuario);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno",
    });
  }
};
