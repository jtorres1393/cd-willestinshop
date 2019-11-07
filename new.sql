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
-- Name: news; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title text,
    about text,
    "subTitle" text,
    date text,
    tags text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "order" integer
);


--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.news_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: shopCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."shopCategory" (
    id integer NOT NULL,
    "order" integer,
    title text,
    slug text
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
    details text,
    proof integer,
    alcvol integer,
    type text,
    active boolean
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
-- Name: news id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


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
1	555.555.5555	info@willestinshop.com	willestinshop	1115 E Wardlow Rd.	long beach	<h1>Craftman's Touch.</h1><h1>California Spirit.</h1><p><br></p><p>A Long Beach institution since 1906, Wille’s Tin Shop embodied the spirit of our city: rigorous ingenuity, creativity, and accommodating service. Rather than leave its legacy in the history books, we let these values drive Wille’s into a new era—bringing its name and ideals of craftsmanship to the world of artisan spirits.</p>	\N	ca	90807	\N
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
15	20191105234534_news.js	2	2019-11-05 23:57:27.674-08
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
3	https://storage.googleapis.com/willestinshop/images/115201910111_vodka_png	items	1	images/115201910111_vodka_png	images	product	\N
4	https://storage.googleapis.com/willestinshop/images/115201913594_vodka_png	items	2	images/115201913594_vodka_png	images	product	\N
5	https://storage.googleapis.com/willestinshop/images/115201914027_vodka_png	items	3	images/115201914027_vodka_png	images	product	\N
6	https://storage.googleapis.com/willestinshop/images/115201914155_vodka_png	items	4	images/115201914155_vodka_png	images	product	\N
7	https://storage.googleapis.com/willestinshop/videos/1152019185320_bgVideo3_mp4_mp4	info	1	videos/1152019185320_bgVideo3_mp4_mp4	videos	landing	\N
10	https://storage.googleapis.com/willestinshop/images/116201922758_repealDay_svg	news	1	images/116201922758_repealDay_svg	images	articles	\N
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.news (id, title, about, "subTitle", date, tags, created_at, updated_at, "order") FROM stdin;
1	wille's tin shop opens at last!	<p>We’re honored to be able to open our Doors on the same day we celebrate Repeal Day. December 5th not only marks a return to celebotary drinking, but also a return to the rich history and tradition of craft fermentation and distillation.</p><p><br></p><p>A Long Beach institution since 1906, Wille’s Tin Shop embodied the spirit of Long Beach: rigorous ingenuity, creativity, and accommodating service. We let these values drive Wille’s into a new era—bringing its ideals of craftsmanship to the world of fine spirits.</p><p><br></p>	Grand Opening	2019-12-05	\r\nCocktails • Food • Music • Patio	2019-11-06 00:46:20.971417-08	2019-11-06 00:46:20.971417-08	1
\.


--
-- Data for Name: shopCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."shopCategory" (id, "order", title, slug) FROM stdin;
1	\N	spirits	spirits
\.


--
-- Data for Name: shopItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."shopItems" (id, "order", title, "subTitle", about, shipping, price, "rootID", details, proof, alcvol, type, active) FROM stdin;
2	2	shop whisky	whisky	Coming soon	0	0	1	Coming soon	101	5010	spirit	f
1	1	long beach water	vodka	Our Vodka, crafted from fermented and distilled corn, is the first manifestation of Wille's new era. Diluted with Long Beach water and redistilled in our custom pot, our legacy and our city is on full display in this very bottle—a taste of what’s to come from the next century of Wille’s Tin Shop.\r\n	1000	3400	1	Distilled from Corn\r\nFiltered with Long Beach Water\r\nCocktail Strength	101	5010	spirit	t
3	3	ginipero	Gin	Coming soon	0	0	1	Coming soon	101	5000	spirit	f
4	4	playa larga	Rum	Coming soon	0	0	1	Coming soon	101	5000	spirit	f
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

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 15, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 10, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.news_id_seq', 4, true);


--
-- Name: shopCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."shopCategory_id_seq"', 1, true);


--
-- Name: shopItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."shopItems_id_seq"', 4, true);


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
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


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

