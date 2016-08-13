DROP TABLE IF EXISTS art ;

CREATE TABLE art (
  art_id serial unique primary key,
  art_title TEXT not null,
  art_image TEXT,
  art_publish_date varchar,
  art_creator TEXT,
  art_created timestamp not null default now()
);


CREATE INDEX on art (art_created) ;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id serial unique primary key,
  name VARCHAR(50) unique,
  email VARCHAR(255) unique not null,
  password_digest TEXT not null,
  user_created timestamp not null default now()
);
CREATE INDEX on users (username) ;
CREATE INDEX on users (email) ;

