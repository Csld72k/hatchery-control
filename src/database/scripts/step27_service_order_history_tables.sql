USE hatchery_control;
GO

CREATE TABLE service_order_status_history (
    id INT IDENTITY(1,1) PRIMARY KEY,
    service_order_id INT NOT NULL,
    old_status VARCHAR(50) NULL,
    new_status VARCHAR(50) NOT NULL,
    changed_by_user_id INT NOT NULL,
    reason VARCHAR(MAX) NULL,
    changed_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_status_history_service_order
        FOREIGN KEY (service_order_id) REFERENCES service_orders(id),

    CONSTRAINT FK_status_history_changed_by_user
        FOREIGN KEY (changed_by_user_id) REFERENCES users(id),

    CONSTRAINT CK_status_history_new_status
        CHECK (new_status IN (
            'Aguardando resposta',
            'Direcionado',
            'Em execução',
            'Pausado',
            'Aguardando validação',
            'Concluído',
            'Cancelado'
        )),

    CONSTRAINT CK_status_history_old_status
        CHECK (
            old_status IS NULL OR old_status IN (
                'Aguardando resposta',
                'Direcionado',
                'Em execução',
                'Pausado',
                'Aguardando validação',
                'Concluído',
                'Cancelado'
            )
        )
);
GO

CREATE TABLE service_order_assignments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    service_order_id INT NOT NULL,
    old_maintainer_user_id INT NULL,
    new_maintainer_user_id INT NOT NULL,
    changed_by_user_id INT NOT NULL,
    reason VARCHAR(MAX) NULL,
    changed_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_assignments_service_order
        FOREIGN KEY (service_order_id) REFERENCES service_orders(id),

    CONSTRAINT FK_assignments_old_maintainer
        FOREIGN KEY (old_maintainer_user_id) REFERENCES users(id),

    CONSTRAINT FK_assignments_new_maintainer
        FOREIGN KEY (new_maintainer_user_id) REFERENCES users(id),

    CONSTRAINT FK_assignments_changed_by_user
        FOREIGN KEY (changed_by_user_id) REFERENCES users(id)
);
GO

CREATE TABLE service_order_reschedules (
    id INT IDENTITY(1,1) PRIMARY KEY,
    service_order_id INT NOT NULL,
    old_expected_date DATE NULL,
    new_expected_date DATE NOT NULL,
    changed_by_user_id INT NOT NULL,
    reason VARCHAR(MAX) NOT NULL,
    changed_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_reschedules_service_order
        FOREIGN KEY (service_order_id) REFERENCES service_orders(id),

    CONSTRAINT FK_reschedules_changed_by_user
        FOREIGN KEY (changed_by_user_id) REFERENCES users(id)
);
GO

CREATE TABLE service_order_pauses (
    id INT IDENTITY(1,1) PRIMARY KEY,
    service_order_id INT NOT NULL,
    paused_by_user_id INT NOT NULL,
    pause_reason VARCHAR(MAX) NOT NULL,
    paused_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    resumed_by_user_id INT NULL,
    resume_reason VARCHAR(MAX) NULL,
    resumed_at DATETIME2 NULL,

    CONSTRAINT FK_pauses_service_order
        FOREIGN KEY (service_order_id) REFERENCES service_orders(id),

    CONSTRAINT FK_pauses_paused_by_user
        FOREIGN KEY (paused_by_user_id) REFERENCES users(id),

    CONSTRAINT FK_pauses_resumed_by_user
        FOREIGN KEY (resumed_by_user_id) REFERENCES users(id),

    CONSTRAINT CK_pauses_resume_date
        CHECK (resumed_at IS NULL OR resumed_at >= paused_at)
);
GO

CREATE TABLE service_order_comments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    service_order_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_type VARCHAR(50) NOT NULL,
    comment_text VARCHAR(MAX) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_comments_service_order
        FOREIGN KEY (service_order_id) REFERENCES service_orders(id),

    CONSTRAINT FK_comments_user
        FOREIGN KEY (user_id) REFERENCES users(id),

    CONSTRAINT CK_comments_type
        CHECK (comment_type IN (
            'Solicitante',
            'Encarregado',
            'Mantenedor',
            'Sistema'
        ))
);
GO

CREATE INDEX idx_status_history_service_order_id
    ON service_order_status_history(service_order_id);
GO

CREATE INDEX idx_assignments_service_order_id
    ON service_order_assignments(service_order_id);
GO

CREATE INDEX idx_reschedules_service_order_id
    ON service_order_reschedules(service_order_id);
GO

CREATE INDEX idx_pauses_service_order_id
    ON service_order_pauses(service_order_id);
GO

CREATE INDEX idx_comments_service_order_id
    ON service_order_comments(service_order_id);
GO