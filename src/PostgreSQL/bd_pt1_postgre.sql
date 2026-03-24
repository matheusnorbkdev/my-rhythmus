create table tbuser(
id_user serial primary key,
nome_user varchar(150) not null,
apelido_user varchar(50) not null,
email_user varchar(150) unique not null,
senha_user varchar(255) not null,
nascimento_user date not null,
phone_user varchar(20) not null
);
-- criando a table dos esportes
create table tbesportes(
id_esporte serial primary key,
nome_esporte varchar(80) not null,
sobre_esporte text,
iconeurl_esporte varchar(300)
);
-- criando tb dos alongamentos
create table tbalongamentos (
    id_al serial primary key,
    areafc_al varchar(50),
    instrucoes_al text,
    videourl_al varchar(255),
    xp_al int not null
);
-- cria as dificuldades como enum. Um tipo de dado especial 
-- usado na programação para definir um conjunto fixo de constantes nomeadas
create type dificuldade_tre as enum ('Iniciante','Intermediário','Avançado');
-- tb de treinos 
create table tbtreinos(
    id_treino serial primary key,
    tempoEstimado_tre int not null,
    nome_tre varchar(100) not null,
    descricao_tre text
);

-- criando uma tabela intermediaria para varios treinos terem varios alongamentos e vice versa
create table treino_alongamento (
    id_treinos_alongamento serial primary key,
    id_treino int references tbtreinos(id_treino),
    id_al int references tbalongamentos(id_al)
);
-- tb pra progresso 
create table tbprogresso(
	id_prog serial primary key,
	id_user int unique references tbuser(id_user) on delete cascade,
	xp_total int default 0,
	nivel_user int default 1,
	streak_user int default 0
);
-- tb pra historico
create table tbhitorico(
	id_his serial primary key,
	id_user int references tbuser(id_user) on delete cascade,-- on delete cascade significa
	-- q quando a conta for deletada tudo some
	id_treino int references tbtreinos(id_treino),
	data_exec timestamp default current_timestamp,
	temp_real int
);
-- tb para conquistas (gamificação)
create table tbconquista(
	id_conquista serial primary key,
	nome varchar(100),
	descricao text,
	iconeurl_conquista varchar(150),
	xp_conquista int
);
-- tb para conexao entre conquista e user
create table tbuser_conquista(
	id_user_conquista serial primary key,
	id_user int references tbuser(id_user) on delete cascade,
	id_conquista int references tbconquista(id_conquista),
	data_ganho timestamp default current_timestamp,
	unique(id_user, id_conquista)
);
-- tb para conexao entre user e esporte
create table tbuser_esporte(
	id_user_esporte serial primary key,
	id_user int references tbuser(id_user) on delete cascade,
	id_esporte int references tbesportes(id_esporte),
	unique(id_user,id_esporte)
);
-- tb streak da ofensiva 
create table tbstreak (
    id_streak serial primary key,
    id_user int references tbuser(id_user) on delete cascade,
    data_streak date,
    fez_treino boolean
);
-- tb para metas do usuário
create table tbmetas (
    id_meta serial primary key,
    id_user int references tbUser(id_user) on delete cascade,
    descricao_meta text,
    meta_valor int,
    progresso_meta int default 0
);

select * from tbesportes;