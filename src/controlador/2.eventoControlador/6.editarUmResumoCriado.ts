import { Request, Response } from "express";
import { atualizaResumo } from "../../repositories/user-repository";
import { pegarIdToken } from "../../auxiliares/token.auxilar";
import TUpdate from "../../tipos/TUpdate";

export const editarUmResumoCriado = async (req: Request, res: Response) => {
  const { materiaId, titulo } = req.body;
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = String(authorization).split(" ")[1];

  try {
    const idUsuario = pegarIdToken(token);

    const updateResumos: TUpdate = {
      materiaId,
      titulo,
      idUsuario: idUsuario,
    };

    const { rows: update } = await atualizaResumo(Number(id), updateResumos);
    const resumoRows = update[0];

    const resumoRetornado = {
      id: resumoRows.id,
      usuarioId: resumoRows.usuario_id,
      materiaId: resumoRows.materia_id,
      titulo: resumoRows.titulo,
      topicos: resumoRows.topicos.split(", "),
      descricao: resumoRows.descricao,
      criado: resumoRows.criado,
    };

    return res.status(200).json(resumoRetornado);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno ",
    });
  }
};
