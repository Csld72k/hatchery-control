USE hatchery_control;
GO

DELETE FROM service_orders;
DELETE FROM user_roles;
DELETE FROM users;
DELETE FROM roles;
DELETE FROM sectors;
GO

DBCC CHECKIDENT ('service_orders', RESEED, 0);
DBCC CHECKIDENT ('users', RESEED, 0);
DBCC CHECKIDENT ('roles', RESEED, 0);
DBCC CHECKIDENT ('sectors', RESEED, 0);
GO

INSERT INTO roles (name) VALUES
('ADMIN'),
('REQUESTER'),
('MAINTENANCE_SUPERVISOR'),
('MAINTAINER'),
('MANAGER');
GO

INSERT INTO sectors (name) VALUES
('Manutenção'),
('Sala de ovos'),
('Monitoria'),
('Transferência'),
('Tiragem'),
('Sala de pintos'),
('Higienização'),
('Apoio externo'),
('Administrativo'),
('Gerência');
GO

INSERT INTO users (name, email, sector_id) VALUES
('Claudiney', 'producao.ljil@gmail.com', 9),
('Maurício', 'producao.ljil@gmail.com', 10),
('Esmeralda', 'producao.ljil@gmail.com', 2),
('Amanda', 'producao.ljil@gmail.com', 3),
('Antônio', 'producao.ljil@gmail.com', 4),
('Martim', 'producao.ljil@gmail.com', 5),
('Vanderlei', 'producao.ljil@gmail.com', 6),
('Vilson', 'producao.ljil@gmail.com', 7),
('Alisson', 'producao.ljil@gmail.com', 8),
('Taís', 'producao.ljil@gmail.com', 9),
('Gesiel', 'producao.ljil@gmail.com', 1),
('Elenilson', 'producao.ljil@gmail.com', 1),
('Ronilto', 'producao.ljil@gmail.com', 1),
('Raimundo', 'producao.ljil@gmail.com', 1);
GO

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'ADMIN'
WHERE u.name = 'Claudiney';

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'REQUESTER'
WHERE u.name IN ('Claudiney', 'Esmeralda', 'Amanda', 'Antônio', 'Martim', 'Vanderlei', 'Vilson', 'Alisson', 'Taís');

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'MAINTENANCE_SUPERVISOR'
WHERE u.name = 'Maurício';

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'MANAGER'
WHERE u.name = 'Maurício';

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'MAINTAINER'
WHERE u.name IN ('Gesiel', 'Elenilson', 'Ronilto', 'Raimundo');
GO

INSERT INTO service_orders (
    sector_id,
    requester_user_id,
    current_maintainer_user_id,
    location,
    request_date,
    service_description,
    solution_description,
    type,
    priority,
    status,
    expected_date,
    completion_date,
    service_start_at,
    service_end_at
)
VALUES
(2, 3, NULL, 'Máquina de classificação', '2026-04-12T08:10:00', 'Troca de correia da máquina classificadora.', NULL, NULL, 'Alta', 'Aguardando resposta', NULL, NULL, NULL, NULL),
(3, 4, 11, 'Sala de monitoria 1', '2026-04-12T09:15:00', 'Equipamento de monitoria desligando sozinho.', NULL, 'Corretiva', 'Média', 'Direcionado', '2026-04-13', NULL, NULL, NULL),
(4, 5, 12, 'Transferência linha 2', '2026-04-12T10:00:00', 'A esteira está travando durante a transferência.', 'Verificação inicial realizada; aguardando troca de rolamento.', 'Corretiva', 'Alta', 'Em execução', '2026-04-13', NULL, '2026-04-12T13:00:00', NULL),
(5, 6, 13, 'Máquina de embalagem', '2026-04-12T11:20:00', 'Ruído excessivo no motor da embaladora.', NULL, 'Preventiva', 'Média', 'Pausado', '2026-04-14', NULL, '2026-04-12T14:10:00', NULL),
(6, 7, 14, 'Sala de pintos - climatização', '2026-04-12T12:05:00', 'Climatizador sem resfriamento adequado.', 'Limpeza do sistema e troca de capacitor concluídas.', 'Corretiva', 'Alta', 'Aguardando validação', '2026-04-12', '2026-04-12', '2026-04-12T15:00:00', '2026-04-12T16:20:00'),
(9, 10, 11, 'Escritório administrativo', '2026-04-12T13:40:00', 'Ar-condicionado sem funcionar.', 'Disjuntor rearmado e equipamento testado.', 'Corretiva', 'Baixa', 'Concluído', '2026-04-12', '2026-04-12', '2026-04-12T14:00:00', '2026-04-12T14:25:00'),
(7, 8, NULL, 'Lavagem de caixas', '2026-04-12T14:30:00', 'Solicitação cancelada por duplicidade de chamado.', NULL, NULL, 'Baixa', 'Cancelado', NULL, NULL, NULL, NULL),
(8, 9, NULL, 'Área externa de apoio', '2026-04-12T15:10:00', 'Substituição de refletor queimado na área externa.', NULL, NULL, 'Média', 'Aguardando resposta', NULL, NULL, NULL, NULL);
GO