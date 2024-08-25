import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { cadastrarUsuario } from "../../repositories/user-repository";
import TUsuario from "../../tipos/TUsuario";

export const cadastroNoSistema = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  try {
    const novoUsuario: TUsuario = { nome, email, senha };
    const senhaCriptocrafada = await bcrypt.hash(senha, 10);
    novoUsuario.senha = senhaCriptocrafada;

    const { rows: user } = await cadastrarUsuario(novoUsuario);

    const usuarioCadastrado = user[0];

    const { senha: _, ...usuarioSemSenha } = usuarioCadastrado;

    return res.status(201).json(usuarioSemSenha);
  } catch (error) {
    return res.status(500).json({ mensagen: "Erro interno" });
  }
};
