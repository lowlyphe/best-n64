DROP TABLE IF EXISTS games;
CREATE TABLE games(
    id serial,
    Name VARCHAR(48) NOT NULL,
    Publisher VARCHAR(23) NOT NULL,
    Year      INTEGER  NOT NULL
);