CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TABLE IF NOT EXISTS app_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    last_login TIMESTAMPTZ,
    created TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT app_user_role_check CHECK (role IN ('USER','ADMIN','SUPER_ADMIN'))
    );
