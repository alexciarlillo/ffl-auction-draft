/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS lobbies (
    id  uuid not null primary key default gen_random_uuid(),
    name varchar(255),
    franchise_count smallint not null,
    created_at timestamp with time zone default now(),
    completed_at timestamp with time zone null
);