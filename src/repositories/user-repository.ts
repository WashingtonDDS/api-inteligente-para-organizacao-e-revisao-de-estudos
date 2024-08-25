import pool from "../conexaoBd";
import TResumo from "../tipos/TResumo";
import TUpdate from "../tipos/TUpdate";
import TUsuario from "../tipos/TUsuario";

export const buscarUsuario = async () => {
  const query = "select * from usuarios ";
  const { rows } = await pool.query(query);
  return rows;
};

export const buscarEmail = async (email: string) => {
  const query = "select * from usuarios where email = $1";
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

export const buscarPorId = async (id: number) => {
  const query = "select * from usuarios where id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const buscarMaterias = async () => {
  const query = "select * from materias ";
  const { rows } = await pool.query(query);
  return rows;
};

export const buscarMaterias_id = async (id: number) => {
  const query = "select * from materias where id = $1 ";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

export const buscarMateriaIdLogado = async (
  materia_id: number,
  usuario_id: number
) => {
  const query =
    "select * from resumos where materia_id = $1 and usuario_id = $2  ";
  const { rows } = await pool.query(query, [materia_id, usuario_id]);
  return rows;
};

export const buscarResumosDoId = async (id: number) => {
  const query = `select  r.id,
    r.usuario_id as "usuarioId",
    r.materia_id as "materia",
    r.titulo,
    r.topicos,
    r.descricao,
    r.criado from resumos r where usuario_id = $1 `;
  const { rows } = await pool.query(query, [id]);
  return rows;
};
export const buscarResumos = async (id: number, usuario_id: number) => {
  const query = "select * from resumos where id = $1 and usuario_id = $2  ";
  const { rows } = await pool.query(query, [id, usuario_id]);
  return rows[0];
};

export const buscarResumosPorFiltroMateria = async (
  materia: string,
  id: number
) => {
  const query = `
    select
    r.id,
    r.usuario_id as "usuarioId",
    m.nome as "materia",
    r.titulo,
    r.topicos,
    r.descricao,
    r.criado
    from resumos r
    join materias m on r.materia_id = m.id
    where m.nome = $1 and r.usuario_id = $2`;
  const { rows } = await pool.query(query, [materia, id]);
  return rows;
};

export const fazerResumo = async (props: TResumo) => {
  const query = `insert into resumos (usuario_id, materia_id, titulo, topicos, descricao)values($1, $2, $3, $4, $5) returning *`;
  return await pool.query(query, [
    props.usuarioId,
    props.materiaId,
    props.titulo,
    props.topicos,
    props.descricao,
  ]);
};

export const cadastrarUsuario = async (props: TUsuario) => {
  const query = `insert into usuarios(nome, email, senha) values ($1, $2, $3) returning *`;
  return await pool.query(query, [props.nome, props.email, props.senha]);
};

export const deletarResumo = async (id: number, usuario_id: number) => {
  const query = "delete from resumos where id = $1 and usuario_id = $2";
  const { rows } = await pool.query(query, [id, usuario_id]);
  return rows[0];
};

export const atualizaResumo = async (id: number, props: TUpdate) => {
  const query = `update resumos set materia_id = $1, titulo = $2 where id = $3 and usuario_id = $4 returning *`;
  return await pool.query(query, [
    props.materiaId,
    props.titulo,
    id,
    props.idUsuario,
  ]);
};
// "
