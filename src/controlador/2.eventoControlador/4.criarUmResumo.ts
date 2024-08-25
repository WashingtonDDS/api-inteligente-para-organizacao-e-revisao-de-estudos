import { Request, Response } from "express";
import TResumo from "../../tipos/TResumo";
import { fazerResumo } from "../../repositories/user-repository";
import { pegarIdToken } from "../../auxiliares/token.auxilar";
import { apiGeminiGeradorDeDescricao } from "../../geminiApi";

export const criarUmResumo = async (req: Request, res: Response) => {
  const { materiaId, titulo, topicos } = req.body;
  const { authorization } = req.headers;
  try {
    const token = String(authorization).split(" ")[1];
    const id = pegarIdToken(token);

    const tituloCompleto = titulo ?? "Sem título";
    const topicosRefatorado = topicos.join(", ");

    const descricaoIa = await apiGeminiGeradorDeDescricao(
      `Crie um resumo de uma linha baseado nas seguintes palavras chave: ${topicos.join(
        ", "
      )}`
    );

    const descricaoProvisoria = "Gemini";

    const resumoCriado: TResumo = {
      usuarioId: id,
      materiaId: materiaId,
      titulo: tituloCompleto,
      topicos: topicosRefatorado,
      descricao: String(descricaoIa),
    };

    const { rows: resumo } = await fazerResumo(resumoCriado);

    const resumoRows = resumo[0];
    const resumoRetornado = {
      id: resumoRows.id,
      usuarioId: resumoRows.usuario_id,
      materiaId: resumoRows.materia_id,
      titulo: resumoRows.titulo,
      topicos: resumoRows.topicos.split(", "),
      descricao: resumoRows.descricao,
      criado: resumoRows.criado,
    };

    return res.status(201).json(resumoRetornado);
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
