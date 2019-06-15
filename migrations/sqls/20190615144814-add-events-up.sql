CREATE TABLE IF NOT EXISTS events (
    id serial primary key,
    event_type_id integer not null references event_types(id),
    created_at timestamp with time zone default now(),
    lobby_id uuid references lobbies(id) NOT NULL,
    franchise_id uuid references franchises(id),
    system_event boolean,
    data jsonb default '{}',
    CONSTRAINT if_not_system_event_then_franchise_is_not_null
      CHECK ( system_event OR (franchise_id IS NOT NULL) )
);