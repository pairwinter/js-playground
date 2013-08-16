CREATE DATABASE postgres
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'zh_CN.UTF-8'
       LC_CTYPE = 'zh_CN.UTF-8'
       CONNECTION LIMIT = -1;

CREATE TABLE p_user(
     id serial NOT NULL,
     name character(10),
     icon character(20),
     realname character(10),
     email character varying(50),
     lastlogintime timestamp without time zone,
     intro character varying(500),
     createdtime timestamp without time zone,
     lastmodifiedtime timestamp without time zone
);