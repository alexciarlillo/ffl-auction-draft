CREATE TABLE IF NOT EXISTS event_types (
    id  uuid not null primary key default gen_random_uuid(),
    name varchar(255),
    franchise_count smallint not null,
    created_at timestamp with time zone default now(),
    franchise_budget smallint not null,
    completed_at timestamp with time zone null
);