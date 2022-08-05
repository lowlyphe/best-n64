DROP TABLE IF EXISTS games;
CREATE TABLE games(
    id serial,
    name VARCHAR(48) NOT NULL,
    publisher VARCHAR(23) NOT NULL,
    year      INTEGER  NOT NULL,
    path text NOT NULL,
    rating integer NOT NULL
);