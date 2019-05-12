/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS franchises (
    id  serial primary key,
    lobby_id uuid references lobbies(id) on delete cascade,
    created_at timestamp with time zone default now(),
    claimed_at timestamp with time zone default null,
    name varchar(255),
    claim_token uuid not null default gen_random_uuid()
);