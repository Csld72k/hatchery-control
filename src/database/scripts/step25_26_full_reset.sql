USE hatchery_control;
GO

/* =========================================================
   1) DROP TABLES IN SAFE ORDER
   ========================================================= */

IF OBJECT_ID('dbo.service_orders', 'U') IS NOT NULL
    DROP TABLE dbo.service_orders;
GO

IF OBJECT_ID('dbo.user_roles', 'U') IS NOT NULL
    DROP TABLE dbo.user_roles;
GO

IF OBJECT_ID('dbo.users', 'U') IS NOT NULL
    DROP TABLE dbo.users;
GO

IF OBJECT_ID('dbo.roles', 'U') IS NOT NULL
    DROP TABLE dbo.roles;
GO

IF OBJECT_ID('dbo.sectors', 'U') IS NOT NULL
    DROP TABLE dbo.sectors;
GO


/* =========================================================
   2) CREATE BASE TABLES
   ========================================================= */

CREATE TABLE dbo.sectors (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO

CREATE TABLE dbo.roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);
GO

CREATE TABLE dbo.users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NULL,
    sector_id INT NULL,
    is_active BIT NOT NULL DEFAULT 1,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT FK_users_sector
        FOREIGN KEY (sector_id) REFERENCES dbo.sectors(id)
);
GO

CREATE TABLE dbo.user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT FK_user_roles_user
        FOREIGN KEY (user_id) REFERENCES dbo.users(id),
    CONSTRAINT FK_user_roles_role
        FOREIGN KEY (role_id) REFERENCES dbo.roles(id)
);
GO


/* =========================================================
   3) CREATE SERVICE_ORDERS IN THE NEW MODEL
   ========================================================= */

CREATE TABLE dbo.service_orders (
    id INT IDENTITY(1,1) PRIMARY KEY,

    sector_id INT NOT NULL,
    requester_user_id INT NOT NULL,
    current_maintainer_user_id INT NULL,

    location VARCHAR(100) NOT NULL,
    request_date DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    service_description VARCHAR(MAX) NOT NULL,
    solution_description VARCHAR(MAX) NULL,

    type VARCHAR(20) NULL,
    priority VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Aguardando resposta',

    expected_date DATE NULL,
    completion_date DATE NULL,

    service_start_at DATETIME2 NULL,
    service_end_at DATETIME2 NULL,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_service_orders_sector
        FOREIGN KEY (sector_id) REFERENCES dbo.sectors(id),

    CONSTRAINT FK_service_orders_requester_user
        FOREIGN KEY (requester_user_id) REFERENCES dbo.users(id),

    CONSTRAINT FK_service_orders_current_maintainer_user
        FOREIGN KEY (current_maintainer_user_id) REFERENCES dbo.users(id),

    CONSTRAINT CK_service_orders_status
        CHECK (status IN (
            'Aguardando resposta',
            'Direcionado',
            'Em execução',
            'Pausado',
            'Aguardando validação',
            'Concluído',
            'Cancelado'
        )),

    CONSTRAINT CK_service_orders_priority
        CHECK (priority IN ('Baixa', 'Média', 'Alta')),

    CONSTRAINT CK_service_orders_type
        CHECK (type IS NULL OR type IN ('Corretiva', 'Preventiva')),

    CONSTRAINT CK_service_orders_expected_date
        CHECK (
            expected_date IS NULL
            OR expected_date >= CAST(request_date AS DATE)
        ),

    CONSTRAINT CK_service_orders_completion_date
        CHECK (
            completion_date IS NULL
            OR completion_date >= CAST(request_date AS DATE)
        ),

    CONSTRAINT CK_service_orders_service_time
        CHECK (
            service_start_at IS NULL
            OR service_end_at IS NULL
            OR service_end_at >= service_start_at
        )
);
GO


/* =========================================================
   4) INDEXES
   ========================================================= */

CREATE INDEX idx_service_orders_sector_id
    ON dbo.service_orders(sector_id);
GO

CREATE INDEX idx_service_orders_requester_user_id
    ON dbo.service_orders(requester_user_id);
GO

CREATE INDEX idx_service_orders_current_maintainer_user_id
    ON dbo.service_orders(current_maintainer_user_id);
GO

CREATE INDEX idx_service_orders_status
    ON dbo.service_orders(status);
GO

CREATE INDEX idx_service_orders_priority
    ON dbo.service_orders(priority);
GO

CREATE INDEX idx_service_orders_type
    ON dbo.service_orders(type);
GO

CREATE INDEX idx_service_orders_request_date
    ON dbo.service_orders(request_date);
GO

CREATE INDEX idx_service_orders_expected_date
    ON dbo.service_orders(expected_date);
GO

CREATE INDEX idx_service_orders_completion_date
    ON dbo.service_orders(completion_date);
GO


/* =========================================================
   5) SEED DATA
   ========================================================= */

INSERT INTO dbo.roles (name) VALUES
('ADMIN'),
('REQUESTER'),
('MAINTENANCE_SUPERVISOR'),
('MAINTAINER'),
('MANAGER');
GO

INSERT INTO dbo.sectors (name) VALUES
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

INSERT INTO dbo.users (name, email, sector_id) VALUES
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

INSERT INTO dbo.user_roles (user_id, role_id)
SELECT u.id, r.id
FROM dbo.users u
JOIN dbo.roles r ON r.name = 'ADMIN'
WHERE u.name = 'Claudiney';

INSERT INTO dbo.user_roles (user_id, role_id)
SELECT u.id, r.id
FROM dbo.users u
JOIN dbo.roles r ON r.name = 'REQUESTER'
WHERE u.name IN (
    'Claudiney',
    'Esmeralda',
    'Amanda',
    'Antônio',
    'Martim',
    'Vanderlei',
    'Vilson',
    'Alisson',
    'Taís'
);

INSERT INTO dbo.user_roles (user_id, role_id)
SELECT u.id, r.id
FROM dbo.users u
JOIN dbo.roles r ON r.name = 'MAINTENANCE_SUPERVISOR'
WHERE u.name = 'Maurício';

INSERT INTO dbo.user_roles (user_id, role_id)
SELECT u.id, r.id
FROM dbo.users u
JOIN dbo.roles r ON r.name = 'MANAGER'
WHERE u.name = 'Maurício';

INSERT INTO dbo.user_roles (user_id, role_id)
SELECT u.id, r.id
FROM dbo.users u
JOIN dbo.roles r ON r.name = 'MAINTAINER'
WHERE u.name IN ('Gesiel', 'Elenilson', 'Ronilto', 'Raimundo');
GO

INSERT INTO dbo.service_orders (
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