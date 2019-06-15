CREATE TABLE IF NOT EXISTS event_types (
    id  serial primary key,
    name varchar(255),
);

INSERT INTO event_types (name) VALUES('draft_started');
INSERT INTO event_types (name) VALUES('draft_ended');
INSERT INTO event_types (name) VALUES('player_nominated');
INSERT INTO event_types (name) VALUES('player_drafted');
INSERT INTO event_types (name) VALUES('clock_paused');
INSERT INTO event_types (name) VALUES('clock_resumed');
INSERT INTO event_types (name) VALUES('franchise_claimed');
INSERT INTO event_types (name) VALUES('franchise_bid');