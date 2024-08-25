import { Request, Response } from "express";
import {
  buscarResumosDoId,
  buscarResumosPorFiltroMateria,
} from "../../repositories/user-repository";
import { pegarIdToken } from "../../auxiliares/token.auxilar";

export const listarOsResumosCriados = async (req: Request, res: Response) => {
  const { materia } = req.query;
  const { authorization } = req.headers;

  try {
    const token = String(authorization).split(" ")[1];
    const id = pegarIdToken(token);
    if (materia) {
      const resumoComFiltro = await buscarResumosPorFiltroMateria(
        materia as string,
        id
      );
      return res.status(200).json(resumoComFiltro);
    }

    const todosResumosDoUsuarioLogado = await buscarResumosDoId(id);

    return res.status(200).json(todosResumosDoUsuarioLogado);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno",
    });
  }
};
