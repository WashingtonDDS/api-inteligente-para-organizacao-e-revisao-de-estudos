import { Router } from "express";
import { cadastroNoSistema } from "./controlador/1.usuarioControlador/1.cadastroNoSistema";
import { fazerLoginNoSistema } from "./controlador/1.usuarioControlador/2.fazerLoginNoSistema";
import { listarAsMatérias } from "./controlador/2.eventoControlador/3.listarAsMatérias";
import { criarUmResumo } from "./controlador/2.eventoControlador/4.criarUmResumo";
import { listarOsResumosCriados } from "./controlador/2.eventoControlador/5.listarOsResumosCriados";
import { editarUmResumoCriado } from "./controlador/2.eventoControlador/6.editarUmResumoCriado";
import { deletarUmResumoCriado } from "./controlador/2.eventoControlador/7.deletarUmResumoCriado";
import { validarCorpoIntermediario } from "./intermediario/cadastroNoSistemaIntermediario";
import {
  validarCorpoLoginIntermediario,
  validaSeNaoExisteEmail,
} from "./intermediario/fazerLoginNoSistemaIntermediario";
import { intermediarioDeToken } from "./intermediario/intermediarioDeToken";
import { validarCorpoResumo } from "./intermediario/criarResumoIntermediario";
import { validaSeExisteEmail } from "./intermediario/validarSeExisteEmailIntermediario";
import { validarSeExisteMateria } from "./intermediario/validarSeExisteMateria";
import { validarCorpoEditarResumo } from "./intermediario/validarCorpoEditarResumo";
import { validarSeExisteResumo } from "./intermediario/validarSeExisteResumo";
import { validarSeExisteMateriaIdDoUsuarioLogado } from "./intermediario/validarSeExistemateriaIdUsuarioLogado";

const rotas = Router();

// Cadastrar no sistema
rotas.post(
  "/usuarios",
  validarCorpoIntermediario,
  validaSeExisteEmail,
  cadastroNoSistema
);
// Fazer login no sistema
rotas.post(
  "/login",
  validarCorpoLoginIntermediario,
  validaSeNaoExisteEmail,
  fazerLoginNoSistema
);

//intermediario de login
rotas.use(intermediarioDeToken);

//Listar as matérias
rotas.get("/materias", listarAsMatérias); //luiz
//Criar um resumo
rotas.post(
  "/resumos",
  validarCorpoResumo,
  validarSeExisteMateria,
  criarUmResumo
); //luiz
//Listar os resumos criados
rotas.get("/resumos", listarOsResumosCriados); //vinicios
//Editar um resumo criado
rotas.put(
  "/resumos/:id",
  validarCorpoEditarResumo,
  validarSeExisteMateriaIdDoUsuarioLogado,
  validarSeExisteResumo,
  editarUmResumoCriado
); // vinicios
//Deletar um resumo criado
rotas.delete("/resumos/:id", validarSeExisteResumo, deletarUmResumoCriado); //vinicios

export default rotas;
