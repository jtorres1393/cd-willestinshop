--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.18
-- Dumped by pg_dump version 10.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.info (
    id integer NOT NULL,
    phone text,
    email text,
    instagram text,
    address text,
    city text,
    about text,
    tax integer,
    state text,
    zip text,
    map text
);


--
-- Name: info_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.info_id_seq OWNED BY public.info.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.knex_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    url text,
    "rootPage" text,
    "rootID" integer,
    name text,
    type text,
    section text,
    "order" integer
);


--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: shopCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."shopCategory" (
    id integer NOT NULL,
    "order" integer,
    title text
);


--
-- Name: shopCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."shopCategory_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shopCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."shopCategory_id_seq" OWNED BY public."shopCategory".id;


--
-- Name: shopItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."shopItems" (
    id integer NOT NULL,
    "order" integer,
    title text,
    "subTitle" text,
    about text,
    shipping integer,
    price integer,
    "rootID" integer,
    details text
);


--
-- Name: shopItems_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."shopItems_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shopItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."shopItems_id_seq" OWNED BY public."shopItems".id;


--
-- Name: shopOptions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."shopOptions" (
    id integer NOT NULL,
    "order" integer,
    title text,
    stock integer,
    "rootID" integer
);


--
-- Name: shopOptions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."shopOptions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shopOptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."shopOptions_id_seq" OWNED BY public."shopOptions".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role integer NOT NULL
);


--
-- Name: info id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.info ALTER COLUMN id SET DEFAULT nextval('public.info_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: shopCategory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shopCategory" ALTER COLUMN id SET DEFAULT nextval('public."shopCategory_id_seq"'::regclass);


--
-- Name: shopItems id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shopItems" ALTER COLUMN id SET DEFAULT nextval('public."shopItems_id_seq"'::regclass);


--
-- Name: shopOptions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shopOptions" ALTER COLUMN id SET DEFAULT nextval('public."shopOptions_id_seq"'::regclass);


--
-- Data for Name: info; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.info (id, phone, email, instagram, address, city, about, tax, state, zip, map) FROM stdin;
1	555.555.5555	info@willestinshop.com	willestinshop	1115 E Wardlow Rd.	long beach	<h1>Craftman's Touch.</h1><h1>California Spirit.</h1><p><br></p><p><br></p><p>A Long Beach institution since 1906, Wille’s Tin Shop embodied the spirit of our city: rigorous ingenuity, creativity, and accommodating service. Rather than leave its legacy in the history books, we let these values drive Wille’s into a new era—bringing its name and ideals of craftsmanship to the world of artisan spirits.</p>	\N	ca	90807	\N
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
9	20190523171924_users.js	1	2019-08-18 09:00:32.248-07
10	20190523171932_media.js	1	2019-08-18 09:00:32.257-07
11	20190523171943_info.js	1	2019-08-18 09:00:32.264-07
12	20190524110119_shop.js	1	2019-08-18 09:00:32.27-07
13	20190524110136_shopItems\n.js	1	2019-08-18 09:00:32.278-07
14	20190524110148_shopOpts.js	1	2019-08-18 09:00:32.284-07
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media (id, url, "rootPage", "rootID", name, type, section, "order") FROM stdin;
2	https://storage.googleapis.com/willestinshop/videos/8182019105051_better1_mp4	info	1	videos/8182019105051_better1_mp4	videos	landing	\N
\.


--
-- Data for Name: shopCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."shopCategory" (id, "order", title) FROM stdin;
\.


--
-- Data for Name: shopItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."shopItems" (id, "order", title, "subTitle", about, shipping, price, "rootID", details) FROM stdin;
\.


--
-- Data for Name: shopOptions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."shopOptions" (id, "order", title, stock, "rootID") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, "firstName", "lastName", email, password, role) FROM stdin;
97c73b9c-a295-4252-a6a0-b1ad71c768a6	ro	oeurn	ro@nowopen.studio	$2b$12$EtCKrWY.RKJY.figm9S.J.JZJ9NBiNzL8doJyQ40Rml.hDutzGANG	2
\.


--
-- Name: info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.info_id_seq', 1, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 14, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 2, true);


--
-- Name: shopCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."shopCategory_id_seq"', 1, false);


--
-- Name: shopItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."shopItems_id_seq"', 1, false);


--
-- Name: shopOptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."shopOptions_id_seq"', 1, false);


--
-- Name: info info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.info
    ADD CONSTRAINT info_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: shopCategory shopCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shopCategory"
    ADD CONSTRAINT "shopCategory_pkey" PRIMARY KEY (id);


--
-- Name: shopItems shopItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shopItems"
    ADD CONSTRAINT "shopItems_pkey" PRIMARY KEY (id);


--
-- Name: shopOptions shopOptions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shopOptions"
    ADD CONSTRAINT "shopOptions_pkey" PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

