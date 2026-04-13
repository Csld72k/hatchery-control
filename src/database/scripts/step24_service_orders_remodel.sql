USE hatchery_control;
GO

ALTER TABLE service_orders ADD sector_id INT NULL;
ALTER TABLE service_orders ADD requester_user_id INT NULL;
ALTER TABLE service_orders ADD current_maintainer_user_id INT NULL;

ALTER TABLE service_orders ADD service_description VARCHAR(MAX) NULL;
ALTER TABLE service_orders ADD solution_description VARCHAR(MAX) NULL;

ALTER TABLE service_orders ADD expected_date DATE NULL;
ALTER TABLE service_orders ADD completion_date DATE NULL;

ALTER TABLE service_orders ADD service_start_at DATETIME2 NULL;
ALTER TABLE service_orders ADD service_end_at DATETIME2 NULL;

ALTER TABLE service_orders ADD created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME();
ALTER TABLE service_orders ADD updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME();
GO

ALTER TABLE service_orders
ADD CONSTRAINT FK_service_orders_sector
FOREIGN KEY (sector_id) REFERENCES sectors(id);
GO

ALTER TABLE service_orders
ADD CONSTRAINT FK_service_orders_requester_user
FOREIGN KEY (requester_user_id) REFERENCES users(id);
GO

ALTER TABLE service_orders
ADD CONSTRAINT FK_service_orders_current_maintainer_user
FOREIGN KEY (current_maintainer_user_id) REFERENCES users(id);
GO

UPDATE service_orders
SET
    service_description = problem_description,
    expected_date = expected_completion_date,
    completion_date = end_date
WHERE service_description IS NULL
   OR expected_date IS NULL
   OR completion_date IS NULL;
GO

CREATE INDEX idx_service_orders_sector_id ON service_orders(sector_id);
CREATE INDEX idx_service_orders_requester_user_id ON service_orders(requester_user_id);
CREATE INDEX idx_service_orders_current_maintainer_user_id ON service_orders(current_maintainer_user_id);
CREATE INDEX idx_service_orders_expected_date ON service_orders(expected_date);
CREATE INDEX idx_service_orders_completion_date ON service_orders(completion_date);
GO