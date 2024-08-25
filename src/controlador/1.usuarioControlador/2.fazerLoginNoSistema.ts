import bcrypt from "bcrypt";
import { json, Request, Response } from "express";
import { buscarEmail } from "../../repositories/user-repository";
import { criarToken } from "../../auxiliares/token.auxilar";

export const fazerLoginNoSistema = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const emailEncontrado = await buscarEmail(email);

    const token = criarToken({ id: emailEncontrado.id });

    if (!token) {
      return res.status(401).json({ mensagem: "Falha na autenticação" });
    }

    if (await bcrypt.compare(senha, emailEncontrado.senha)) {
      return res.status(200).json({
        token: token,
      });
    }
    return res.status(400).json({
      mensagem: "E-mail ou senha inválidos",
    });
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
