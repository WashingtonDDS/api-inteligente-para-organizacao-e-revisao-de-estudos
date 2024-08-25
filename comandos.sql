-- Cria o banco de dados
CREATE DATABASE resume_ai;


-- usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    senha TEXT NOT NULL,
);

-- Inserir usuários com senhas criptografadas
INSERT INTO usuarios (nome, email, senha) VALUES
('Alice', 'alice@example.com', '$2b$12$KIXoNOQz6MoA7rHzO5rR6u7DByu3HpYOfI0cP.bD5cBF7nJ/5VuOu'),
('Bob', 'bob@example.com', '$2b$12$2v9jM/Az1GzOUYEr8NcYFOZL0CjWh3nv6Ey62jFFsn1WcJWX8ah6i'),
('Charlie', 'charlie@example.com', '$2b$12$9GdYwLMc8xMI2X8HL1X2Fu5ZX1n.5y4p7n5yOCW9/gyF9Ujlg0B/C'),
('David', 'david@example.com', '$2b$12$H3gXZtO1YQoCocAF.wYkBeGvJ76d5Rx6c3qowZ7ud/pF4UmJ4UBuC'),
('Eva', 'eva@example.com', '$2b$12$BqRE3FB60hu4HCTPvVbhwe6t8rLQCeYx73QO/GGfjFzMv.TcK9PEK'),
('Frank', 'frank@example.com', '$2b$12$THIhR6BlD2d7jT6Yl1rqNezmnQir/kKZoRkG6oyq8swEewblZZqi2'),
('Grace', 'grace@example.com', '$2b$12$MdKkdQIbTpD0Hlvx1b7DGeu3T/5H6UdcxdEerMaV8JZlH2Az5W6k6'),
('Henry', 'henry@example.com', '$2b$12$4pVPTJXjs95ti9auJ0j6HOsO72TibZn1zmbf/NqDgg7XYYsAfp4S2'),
('Isabella', 'isabella@example.com', '$2b$12$J79DeS7u/DS6McZihF8XHeO.xZIXE7W7ejzyWxUR/gLxbkMnAD.wC'),
('James', 'james@example.com', '$2b$12$jlV7wGScJ/0dOYk/dZ.HR.HMPAT1CnDbYO9KUSOe0.1hbOxlPFSf2'),
('Katherine', 'katherine@example.com', '$2b$12$L8FJ.wPna1/4m8fs/wvPHeET2N6zRDmps/8mPEb4D0IjLRoJfl35y'),
('Liam', 'liam@example.com', '$2b$12$guo4QgdQF36T6G7m0pRJhW1F1AydlAP68ab5n.xFUDqUOvK4GDq6S'),
('Mia', 'mia@example.com', '$2b$12$95C1XDNzwJctTG0P76ON9.f3byJ8G.H3.91Pp/ZKqou3PC12MPr6C'),
('Noah', 'noah@example.com', '$2b$12$Qp/n1F2SuZYysEEwTX3OPeaAdpfdKx8PvGvCZZRbEEnS5VIs/JjLO'),
('Olivia', 'olivia@example.com', '$2b$12$7HbK0ik/KvEhpTcm7wHjN.ZY8b6zIgN1n3tT/wh9BHCOW4lKaYd6y');


-- materias
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

--  materias
INSERT INTO materias (nome) VALUES
('Back-end'),
('Front-end'),
('Carreira'),
('Mobile'),
('Design'),
('Dados'),
('SQL');

-- tabela resumos
CREATE TABLE resumos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    materia_id INT REFERENCES materias(id),
    titulo TEXT NOT NULL,
    topicos TEXT NOT NULL,
    descricao TEXT NOT NULL,
    criado timestamptz NOT NULL DEFAULT now()
);
--  resumos

INSERT INTO resumos (usuario_id, materia_id, titulo, topicos, descricao, criado) VALUES
(1, 1, 'Introdução ao Back-end', 'Node.js, Express', 'Resumo sobre conceitos básicos de Back-end usando Node.js e Express'),
(1, 2, 'Fundamentos do Front-end', 'HTML, CSS, JavaScript', 'Resumo dos fundamentos do desenvolvimento Front-end'),
(2, 3, 'Planejamento de Carreira', 'Objetivos, Planejamento', 'Resumo sobre planejamento de carreira e definição de objetivos'),
(2, 4, 'Desenvolvimento Mobile', 'Android, iOS', 'Resumo sobre desenvolvimento de aplicações para dispositivos móveis'),
(3, 5, 'Princípios de Design', 'UX/UI, Design Gráfico', 'Resumo dos princípios básicos de design e design gráfico'),
(3, 6, 'Fundamentos de Dados', 'SQL, NoSQL', 'Resumo sobre fundamentos de bancos de dados relacionais e não-relacionais'),
(4, 7, 'SQL Avançado', 'Procedures, Views', 'Resumo sobre técnicas avançadas em SQL');



-- Crie o comando para listar as matérias
select * from materias
-- Crie o comando para verificar se existe um usuário com um dado e-mail
select * from usuarios where email = $1
-- Crie o comando para criar um usuário
insert into usuarios (nome, email, senha)values($1, $2, $3) returning
-- Crie o comando para criar um resumo
insert into resumos (usuario_id, materia_id, titulo, topicos, descricao)values($1, $2, $3, $4, $5) returning *
-- Crie o comando para listar os resumos que correspondem a um determinado usuário
select * from resumos where usuario_id = $1
-- Crie o comando para listar os resumos filtrados por uma matéria e que correspondem a um determinado usuário
select * from resumos where nome = $1 and usuario_id = $2
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
  where m.nome = $1 and r.usuario_id = $2;
-- Crie o comando para verificar se um resumo com um determinado id pertence a um determinado usuário (lembre-se que um usuário é identificado pelo seu id)
select * from resumos where usuario_id = $1
-- Crie o comando para editar todos os campos de um resumo especificado pelo seu id
update resumos set materia_id = $1, titulo = $2 where id = $3 and usuario_id = $4 returning id, usuario_id, materia_id, titulo, topicos, descricao, criado
-- Crie o comando para deletar um resumo especificado pelo seu id
delete from resumos where id = $1 and usuario_id = $2
-- Crie o comando para visualizar a quantidade de resumos gerados em um determinado mês e ano
SELECT
    COUNT(*) AS quantidade_resumos,
    TO_CHAR(criado, 'MM/YYYY') AS mes_ano
FROM
    resumos
WHERE
    criado BETWEEN '2024-08-01' AND '2024-08-31'
GROUP BY
    mes_ano
ORDER BY
    mes_ano;

