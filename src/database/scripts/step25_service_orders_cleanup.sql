USE hatchery_control;
GO

EXEC sp_rename 'service_orders.local', 'location', 'COLUMN';
GO

ALTER TABLE service_orders
DROP COLUMN
    so_number,
    sector,
    requester,
    problem_description,
    identification,
    responsible,
    expected_completion_date,
    end_date,
    observations;
GO

ALTER TABLE service_orders ALTER COLUMN location VARCHAR(100) NOT NULL;
ALTER TABLE service_orders ALTER COLUMN request_date DATETIME2 NOT NULL;
ALTER TABLE service_orders ALTER COLUMN service_description VARCHAR(MAX) NOT NULL;
ALTER TABLE service_orders ALTER COLUMN status VARCHAR(50) NOT NULL;
ALTER TABLE service_orders ALTER COLUMN priority VARCHAR(20) NOT NULL;
ALTER TABLE service_orders ALTER COLUMN sector_id INT NOT NULL;
ALTER TABLE service_orders ALTER COLUMN requester_user_id INT NOT NULL;
GO

ALTER TABLE service_orders
ADD CONSTRAINT DF_service_orders_request_date DEFAULT SYSDATETIME() FOR request_date;
GO

ALTER TABLE service_orders
ADD CONSTRAINT DF_service_orders_status DEFAULT 'Aguardando resposta' FOR status;
GO

ALTER TABLE service_orders
ADD CONSTRAINT CK_service_orders_status
CHECK (status IN (
    'Aguardando resposta',
    'Direcionado',
    'Em execução',
    'Pausado',
    'Aguardando validação',
    'Concluído',
    'Cancelado'
));
GO

ALTER TABLE service_orders
ADD CONSTRAINT CK_service_orders_priority
CHECK (priority IN ('Baixa', 'Média', 'Alta'));
GO

ALTER TABLE service_orders
ADD CONSTRAINT CK_service_orders_type
CHECK (type IS NULL OR type IN ('Corretiva', 'Preventiva'));
GO

ALTER TABLE service_orders
ADD CONSTRAINT CK_service_orders_expected_date
CHECK (expected_date IS NULL OR expected_date >= CAST(request_date AS DATE));
GO

ALTER TABLE service_orders
ADD CONSTRAINT CK_service_orders_completion_date
CHECK (completion_date IS NULL OR completion_date >= CAST(request_date AS DATE));
GO

ALTER TABLE service_orders
ADD CONSTRAINT CK_service_orders_service_time
CHECK (service_start_at IS NULL OR service_end_at IS NULL OR service_end_at >= service_start_at);
GO