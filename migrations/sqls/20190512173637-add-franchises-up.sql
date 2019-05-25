/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS franchises (
    id uuid not null primary key default gen_random_uuid(),
    lobby_id uuid references lobbies(id) on delete cascade,
    created_at timestamp with time zone default now(),
    claimed_at timestamp with time zone default null,
    name varchar(255),
    is_admin boolean not null default false,
    email varchar(255),
    claim_token character varying(60)
);