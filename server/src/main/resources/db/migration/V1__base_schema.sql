CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS app_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(50)  NOT NULL,
    last_name  VARCHAR(50)  NOT NULL,
    email      VARCHAR(254) NOT NULL
    CHECK (email = lower(email)),
    CONSTRAINT uq_app_user_email UNIQUE (email),
    password   TEXT         NOT NULL,
    role       VARCHAR(12)  NOT NULL,
    CONSTRAINT app_user_role_check CHECK (role IN ('USER','ADMIN','SUPER_ADMIN')),
    last_login TIMESTAMPTZ,
    created    TIMESTAMPTZ  NOT NULL DEFAULT now()
    );
