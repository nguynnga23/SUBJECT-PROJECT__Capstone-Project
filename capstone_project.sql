--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.2

-- Started on 2025-09-20 17:38:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 248 (class 1259 OID 262329)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    document_id character varying(255),
    category_name character varying(255),
    category_url character varying(255),
    key_category character varying(100),
    last_external_publish_date date,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255),
    department_website_id uuid
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 308 (class 1259 OID 262679)
-- Name: categories_department_source_lnk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories_department_source_lnk (
    id integer NOT NULL,
    category_id integer,
    department_source_id integer,
    category_ord double precision
);


ALTER TABLE public.categories_department_source_lnk OWNER TO postgres;

--
-- TOC entry 307 (class 1259 OID 262678)
-- Name: categories_department_source_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_department_source_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_department_source_lnk_id_seq OWNER TO postgres;

--
-- TOC entry 3682 (class 0 OID 0)
-- Dependencies: 307
-- Name: categories_department_source_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_department_source_lnk_id_seq OWNED BY public.categories_department_source_lnk.id;


--
-- TOC entry 247 (class 1259 OID 262328)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 3683 (class 0 OID 0)
-- Dependencies: 247
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 250 (class 1259 OID 262341)
-- Name: crawler_configs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crawler_configs (
    id integer NOT NULL,
    document_id character varying(255),
    url character varying(255),
    relative_url_list character varying(255),
    relative_url character varying(255),
    thumbnail character varying(255),
    next_pages character varying(255),
    title character varying(255),
    content character varying(255),
    external_publish_date character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255),
    department_website_id uuid
);


ALTER TABLE public.crawler_configs OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 262340)
-- Name: crawler_configs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.crawler_configs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crawler_configs_id_seq OWNER TO postgres;

--
-- TOC entry 3684 (class 0 OID 0)
-- Dependencies: 249
-- Name: crawler_configs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.crawler_configs_id_seq OWNED BY public.crawler_configs.id;


--
-- TOC entry 254 (class 1259 OID 262365)
-- Name: department_sources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department_sources (
    id integer NOT NULL,
    document_id character varying(255),
    url character varying(255),
    label character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255),
    key_department_source character varying(255)
);


ALTER TABLE public.department_sources OWNER TO postgres;

--
-- TOC entry 310 (class 1259 OID 262691)
-- Name: department_sources_crawler_config_lnk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department_sources_crawler_config_lnk (
    id integer NOT NULL,
    department_source_id integer,
    crawler_config_id integer
);


ALTER TABLE public.department_sources_crawler_config_lnk OWNER TO postgres;

--
-- TOC entry 309 (class 1259 OID 262690)
-- Name: department_sources_crawler_config_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.department_sources_crawler_config_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.department_sources_crawler_config_lnk_id_seq OWNER TO postgres;

--
-- TOC entry 3685 (class 0 OID 0)
-- Dependencies: 309
-- Name: department_sources_crawler_config_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.department_sources_crawler_config_lnk_id_seq OWNED BY public.department_sources_crawler_config_lnk.id;


--
-- TOC entry 312 (class 1259 OID 262702)
-- Name: department_sources_department_lnk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department_sources_department_lnk (
    id integer NOT NULL,
    department_source_id integer,
    department_id integer,
    department_source_ord double precision
);


ALTER TABLE public.department_sources_department_lnk OWNER TO postgres;

--
-- TOC entry 311 (class 1259 OID 262701)
-- Name: department_sources_department_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.department_sources_department_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.department_sources_department_lnk_id_seq OWNER TO postgres;

--
-- TOC entry 3686 (class 0 OID 0)
-- Dependencies: 311
-- Name: department_sources_department_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.department_sources_department_lnk_id_seq OWNED BY public.department_sources_department_lnk.id;


--
-- TOC entry 253 (class 1259 OID 262364)
-- Name: department_sources_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.department_sources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.department_sources_id_seq OWNER TO postgres;

--
-- TOC entry 3687 (class 0 OID 0)
-- Dependencies: 253
-- Name: department_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.department_sources_id_seq OWNED BY public.department_sources.id;


--
-- TOC entry 330 (class 1259 OID 286723)
-- Name: department_sources_schedule_config_lnk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department_sources_schedule_config_lnk (
    id integer NOT NULL,
    department_source_id integer,
    schedule_config_id integer
);


ALTER TABLE public.department_sources_schedule_config_lnk OWNER TO postgres;

--
-- TOC entry 329 (class 1259 OID 286722)
-- Name: department_sources_schedule_config_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.department_sources_schedule_config_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.department_sources_schedule_config_lnk_id_seq OWNER TO postgres;

--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 329
-- Name: department_sources_schedule_config_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.department_sources_schedule_config_lnk_id_seq OWNED BY public.department_sources_schedule_config_lnk.id;


--
-- TOC entry 323 (class 1259 OID 263256)
-- Name: department_websites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department_websites (
    id uuid NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    department_website_url text NOT NULL,
    key_department_website character varying(100) NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    department_id uuid NOT NULL
);


ALTER TABLE public.department_websites OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 262353)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    document_id character varying(255),
    department_name character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 262352)
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_id_seq OWNER TO postgres;

--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 251
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- TOC entry 3439 (class 2604 OID 262332)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3443 (class 2604 OID 262682)
-- Name: categories_department_source_lnk id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories_department_source_lnk ALTER COLUMN id SET DEFAULT nextval('public.categories_department_source_lnk_id_seq'::regclass);


--
-- TOC entry 3440 (class 2604 OID 262344)
-- Name: crawler_configs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crawler_configs ALTER COLUMN id SET DEFAULT nextval('public.crawler_configs_id_seq'::regclass);


--
-- TOC entry 3442 (class 2604 OID 262368)
-- Name: department_sources id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources ALTER COLUMN id SET DEFAULT nextval('public.department_sources_id_seq'::regclass);


--
-- TOC entry 3444 (class 2604 OID 262694)
-- Name: department_sources_crawler_config_lnk id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_crawler_config_lnk ALTER COLUMN id SET DEFAULT nextval('public.department_sources_crawler_config_lnk_id_seq'::regclass);


--
-- TOC entry 3445 (class 2604 OID 262705)
-- Name: department_sources_department_lnk id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_department_lnk ALTER COLUMN id SET DEFAULT nextval('public.department_sources_department_lnk_id_seq'::regclass);


--
-- TOC entry 3448 (class 2604 OID 286726)
-- Name: department_sources_schedule_config_lnk id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_schedule_config_lnk ALTER COLUMN id SET DEFAULT nextval('public.department_sources_schedule_config_lnk_id_seq'::regclass);


--
-- TOC entry 3441 (class 2604 OID 262356)
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- TOC entry 3661 (class 0 OID 262329)
-- Dependencies: 248
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (3, 'djlnvl3e90234enh3s52vx8j', 'TIN TỨC - SỰ KIỆN', 'https://iuh.edu.vn/vi/tin-tuc-su-kien-fi11', 'ttsk', '2025-09-15', '2025-09-15 21:07:53.808', '2025-09-15 21:07:53.808', NULL, 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (4, 'djlnvl3e90234enh3s52vx8j', 'TIN TỨC - SỰ KIỆN', 'https://iuh.edu.vn/vi/tin-tuc-su-kien-fi11', 'ttsk', '2025-09-15', '2025-09-15 21:07:53.808', '2025-09-15 21:07:53.808', '2025-09-15 21:07:54.734', 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (7, 'yem9fqqlq06dv8mq4lk4yah8', 'HỢP TÁC QUỐC TẾ', 'https://iuh.edu.vn/vi/hop-tac-quoc-te-fi12', 'htqt', '2025-09-15', '2025-09-15 21:10:00.506', '2025-09-15 21:10:00.506', NULL, 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (8, 'yem9fqqlq06dv8mq4lk4yah8', 'HỢP TÁC QUỐC TẾ', 'https://iuh.edu.vn/vi/hop-tac-quoc-te-fi12', 'htqt', '2025-09-15', '2025-09-15 21:10:00.506', '2025-09-15 21:10:00.506', '2025-09-15 21:10:01.433', 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (9, 'chxxu7329jkbka32ne5hfktd', 'TIN TỨC - SỰ KIỆN', 'https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien', 'ttsk', '2025-09-15', '2025-09-15 21:13:11.491', '2025-09-15 21:13:11.491', NULL, 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (10, 'chxxu7329jkbka32ne5hfktd', 'TIN TỨC - SỰ KIỆN', 'https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien', 'ttsk', '2025-09-15', '2025-09-15 21:13:11.491', '2025-09-15 21:13:11.491', '2025-09-15 21:13:12.417', 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (11, 'ee13qi6zu0eevk16w8mgijgl', 'THÔNG BÁO SINH VIÊN', 'https://fit.iuh.edu.vn/news.html@155@Thong-bao', 'tbsv', '2025-09-15', '2025-09-15 21:13:39.624', '2025-09-15 21:13:39.624', NULL, 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (12, 'ee13qi6zu0eevk16w8mgijgl', 'THÔNG BÁO SINH VIÊN', 'https://fit.iuh.edu.vn/news.html@155@Thong-bao', 'tbsv', '2025-09-15', '2025-09-15 21:13:39.624', '2025-09-15 21:13:39.624', '2025-09-15 21:13:40.551', 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (13, 'ewff4ownesz32zgcbrculxod', 'THÔNG TIN TUYỂN SINH', 'https://fit.iuh.edu.vn/news.html@157@Thong-tin-tuyen-sinh', 'ttts', '2025-09-15', '2025-09-15 21:14:22.313', '2025-09-15 21:14:42.026', NULL, 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (15, 'ewff4ownesz32zgcbrculxod', 'THÔNG TIN TUYỂN SINH', 'https://fit.iuh.edu.vn/news.html@157@Thong-tin-tuyen-sinh', 'ttts', '2025-09-15', '2025-09-15 21:14:22.313', '2025-09-15 21:14:42.026', '2025-09-15 21:14:43.008', 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (16, 'oounuzkrctz0iu2gzlua70xs', 'THỰC TẬP TUYỂN DỤNG', 'https://fit.iuh.edu.vn/news.html@104@Tuyen-dung-chuyen-nganh', 'tttd', '2025-09-15', '2025-09-15 21:15:20.666', '2025-09-15 21:15:20.666', NULL, 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (17, 'oounuzkrctz0iu2gzlua70xs', 'THỰC TẬP TUYỂN DỤNG', 'https://fit.iuh.edu.vn/news.html@104@Tuyen-dung-chuyen-nganh', 'tttd', '2025-09-15', '2025-09-15 21:15:20.666', '2025-09-15 21:15:20.666', '2025-09-15 21:15:21.593', 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (5, 'tparhr4jnfzc42latakn659b', 'THÔNG TIN TUYỂN SINH', 'https://iuh.edu.vn/vi/tuyen-sinh-fi16', 'ttts', '2025-09-15', '2025-09-15 21:09:03.789', '2025-09-15 21:16:06.757', NULL, 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (18, 'tparhr4jnfzc42latakn659b', 'THÔNG TIN TUYỂN SINH', 'https://iuh.edu.vn/vi/tuyen-sinh-fi16', 'ttts', '2025-09-15', '2025-09-15 21:09:03.789', '2025-09-15 21:16:06.757', '2025-09-15 21:16:07.739', 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (19, 'beyyzkoebwhelf873muayd3j', 'TIN TỨC - SỰ KIỆN', 'https://pdt.iuh.edu.vn/category/tin-tuc-su-kien/', 'ttsk', '2025-09-15', '2025-09-15 21:18:07.095', '2025-09-15 21:19:16.881', NULL, 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (21, 'beyyzkoebwhelf873muayd3j', 'TIN TỨC - SỰ KIỆN', 'https://pdt.iuh.edu.vn/category/tin-tuc-su-kien/', 'ttsk', '2025-09-15', '2025-09-15 21:18:07.095', '2025-09-15 21:19:16.881', '2025-09-15 21:19:18.135', 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (22, 'si8h0hiz0p6a8a4opa4otb6e', 'HOẠT ĐỘNG PHONG TRÀO', 'https://ctsv.iuh.edu.vn/news.html@211@Hoat-dong-phong-trao', 'hdpt', '2025-09-15', '2025-09-15 21:21:27.594', '2025-09-15 21:21:27.594', NULL, 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (23, 'si8h0hiz0p6a8a4opa4otb6e', 'HOẠT ĐỘNG PHONG TRÀO', 'https://ctsv.iuh.edu.vn/news.html@211@Hoat-dong-phong-trao', 'hdpt', '2025-09-15', '2025-09-15 21:21:27.594', '2025-09-15 21:21:27.594', '2025-09-15 21:21:28.52', 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (1, 'w279v31g6lxb2ru6wiuy9en0', 'THÔNG BÁO SINH VIÊN', 'https://iuh.edu.vn/vi/thong-bao-fi20', 'tbsv', '2025-09-18', '2025-09-15 21:06:20.367', '2025-09-20 13:29:54.418', NULL, 1, 1, NULL, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (25, 'w279v31g6lxb2ru6wiuy9en0', 'THÔNG BÁO SINH VIÊN', 'https://iuh.edu.vn/vi/thong-bao-fi20', 'tbsv', '2025-09-18', '2025-09-15 21:06:20.367', '2025-09-20 13:29:54.418', '2025-09-20 13:29:55.164', 1, 1, NULL, NULL);


--
-- TOC entry 3669 (class 0 OID 262679)
-- Dependencies: 308
-- Data for Name: categories_department_source_lnk; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (73, 25, 21, 1);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (1, 1, 1, 1);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (3, 3, 1, 2);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (6, 5, 1, 3);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (9, 7, 1, 4);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (16, 9, 4, 1);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (19, 11, 4, 2);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (22, 13, 4, 3);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (26, 16, 4, 4);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (34, 19, 7, 1);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (36, 22, 9, 1);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (63, 10, 19, 1);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (64, 12, 19, 2);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (65, 15, 19, 3);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (66, 17, 19, 4);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (67, 23, 20, 1);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (69, 4, 21, 2);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (70, 18, 21, 3);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (71, 8, 21, 4);
INSERT INTO public.categories_department_source_lnk (id, category_id, department_source_id, category_ord) VALUES (72, 21, 22, 1);


--
-- TOC entry 3663 (class 0 OID 262341)
-- Dependencies: 250
-- Data for Name: crawler_configs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.crawler_configs (id, document_id, url, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (1, 'd1jez7gf4pdjru3mw98047jo', NULL, '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > h1 ::text', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > div.divNewsDetail', 'div.content-info.col-sm-9 > span ::text', '2025-09-15 21:26:05.197', '2025-09-15 21:26:05.197', NULL, 1, 1, NULL, NULL);
INSERT INTO public.crawler_configs (id, document_id, url, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (2, 'd1jez7gf4pdjru3mw98047jo', NULL, '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > h1 ::text', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > div.divNewsDetail', 'div.content-info.col-sm-9 > span ::text', '2025-09-15 21:26:05.197', '2025-09-15 21:26:05.197', '2025-09-15 21:26:05.961', 1, 1, NULL, NULL);
INSERT INTO public.crawler_configs (id, document_id, url, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (3, 'r51k16l81bc0vnsow5hyc6hq', NULL, '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.page-title ::text', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.left-content > div', 'div.content-info.col-sm-9 > span ::text', '2025-09-15 21:26:58.554', '2025-09-15 21:26:58.554', NULL, 1, 1, NULL, NULL);
INSERT INTO public.crawler_configs (id, document_id, url, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_website_id) VALUES (4, 'r51k16l81bc0vnsow5hyc6hq', NULL, '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.page-title ::text', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.left-content > div', 'div.content-info.col-sm-9 > span ::text', '2025-09-15 21:26:58.554', '2025-09-15 21:26:58.554', '2025-09-15 21:26:59.317', 1, 1, NULL, NULL);


--
-- TOC entry 3667 (class 0 OID 262365)
-- Dependencies: 254
-- Data for Name: department_sources; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.department_sources (id, document_id, url, label, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, key_department_source) VALUES (4, 'tgup7ekabcccxfl881k160ef', 'https://fit.iuh.edu.vn/', 'Khoa Công Nghệ Thông Tin', '2025-09-15 21:12:07.651', '2025-09-20 11:55:01.614', NULL, 1, 1, NULL, 'fit');
INSERT INTO public.department_sources (id, document_id, url, label, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, key_department_source) VALUES (19, 'tgup7ekabcccxfl881k160ef', 'https://fit.iuh.edu.vn/', 'Khoa Công Nghệ Thông Tin', '2025-09-15 21:12:07.651', '2025-09-20 11:55:01.614', '2025-09-20 11:55:02.923', 1, 1, NULL, 'fit');
INSERT INTO public.department_sources (id, document_id, url, label, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, key_department_source) VALUES (9, 'ivpdrzo0jxqlvoyada4in94v', 'https://ctsv.iuh.edu.vn/', 'Phòng Công Tác Chính Trị Và Hỗ Trợ Sinh Viên', '2025-09-15 21:20:19.751', '2025-09-20 11:55:15.25', NULL, 1, 1, NULL, 'ctsv');
INSERT INTO public.department_sources (id, document_id, url, label, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, key_department_source) VALUES (20, 'ivpdrzo0jxqlvoyada4in94v', 'https://ctsv.iuh.edu.vn/', 'Phòng Công Tác Chính Trị Và Hỗ Trợ Sinh Viên', '2025-09-15 21:20:19.751', '2025-09-20 11:55:15.25', '2025-09-20 11:55:16.559', 1, 1, NULL, 'ctsv');
INSERT INTO public.department_sources (id, document_id, url, label, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, key_department_source) VALUES (1, 'k36jtbgt692luepexawdtr5c', 'https://iuh.edu.vn', 'Trang Thông Tin Chính Thức IUH', '2025-09-15 21:06:56.534', '2025-09-20 11:55:35.565', NULL, 1, 1, NULL, 'iuh');
INSERT INTO public.department_sources (id, document_id, url, label, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, key_department_source) VALUES (21, 'k36jtbgt692luepexawdtr5c', 'https://iuh.edu.vn', 'Trang Thông Tin Chính Thức IUH', '2025-09-15 21:06:56.534', '2025-09-20 11:55:35.565', '2025-09-20 11:55:36.874', 1, 1, NULL, 'iuh');
INSERT INTO public.department_sources (id, document_id, url, label, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, key_department_source) VALUES (7, 'wj7w1t2u98b2d0gx6ha8xktt', 'https://pdt.iuh.edu.vn', 'Phòng Đào Tạo ', '2025-09-15 21:18:12.255', '2025-09-20 11:55:50.958', NULL, 1, 1, NULL, 'pdt');
INSERT INTO public.department_sources (id, document_id, url, label, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, key_department_source) VALUES (22, 'wj7w1t2u98b2d0gx6ha8xktt', 'https://pdt.iuh.edu.vn', 'Phòng Đào Tạo ', '2025-09-15 21:18:12.255', '2025-09-20 11:55:50.958', '2025-09-20 11:55:52.267', 1, 1, NULL, 'pdt');


--
-- TOC entry 3671 (class 0 OID 262691)
-- Dependencies: 310
-- Data for Name: department_sources_crawler_config_lnk; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.department_sources_crawler_config_lnk (id, department_source_id, crawler_config_id) VALUES (1, 1, 1);
INSERT INTO public.department_sources_crawler_config_lnk (id, department_source_id, crawler_config_id) VALUES (3, 4, 3);
INSERT INTO public.department_sources_crawler_config_lnk (id, department_source_id, crawler_config_id) VALUES (10, 19, 4);
INSERT INTO public.department_sources_crawler_config_lnk (id, department_source_id, crawler_config_id) VALUES (11, 21, 2);


--
-- TOC entry 3673 (class 0 OID 262702)
-- Dependencies: 312
-- Data for Name: department_sources_department_lnk; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.department_sources_department_lnk (id, department_source_id, department_id, department_source_ord) VALUES (1, 4, 5, 1);
INSERT INTO public.department_sources_department_lnk (id, department_source_id, department_id, department_source_ord) VALUES (4, 7, 5, 2);
INSERT INTO public.department_sources_department_lnk (id, department_source_id, department_id, department_source_ord) VALUES (6, 9, 5, 3);
INSERT INTO public.department_sources_department_lnk (id, department_source_id, department_id, department_source_ord) VALUES (9, 1, 5, 4);
INSERT INTO public.department_sources_department_lnk (id, department_source_id, department_id, department_source_ord) VALUES (17, 19, 6, 1);
INSERT INTO public.department_sources_department_lnk (id, department_source_id, department_id, department_source_ord) VALUES (18, 20, 6, 3);
INSERT INTO public.department_sources_department_lnk (id, department_source_id, department_id, department_source_ord) VALUES (19, 21, 6, 4);
INSERT INTO public.department_sources_department_lnk (id, department_source_id, department_id, department_source_ord) VALUES (20, 22, 6, 2);


--
-- TOC entry 3676 (class 0 OID 286723)
-- Dependencies: 330
-- Data for Name: department_sources_schedule_config_lnk; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.department_sources_schedule_config_lnk (id, department_source_id, schedule_config_id) VALUES (1, 4, 1);
INSERT INTO public.department_sources_schedule_config_lnk (id, department_source_id, schedule_config_id) VALUES (3, 1, 3);
INSERT INTO public.department_sources_schedule_config_lnk (id, department_source_id, schedule_config_id) VALUES (7, 19, 2);
INSERT INTO public.department_sources_schedule_config_lnk (id, department_source_id, schedule_config_id) VALUES (8, 21, 4);


--
-- TOC entry 3674 (class 0 OID 263256)
-- Dependencies: 323
-- Data for Name: department_websites; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3665 (class 0 OID 262353)
-- Dependencies: 252
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.departments (id, document_id, department_name, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (5, 'ac6ruz4w3337gr7z4187pkm1', 'Khoa Công Nghệ Thông Tin IUH', '2025-09-14 22:55:11.08', '2025-09-14 22:55:11.08', NULL, 1, 1, NULL);
INSERT INTO public.departments (id, document_id, department_name, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (6, 'ac6ruz4w3337gr7z4187pkm1', 'Khoa Công Nghệ Thông Tin IUH', '2025-09-14 22:55:11.08', '2025-09-14 22:55:11.08', '2025-09-14 22:55:11.908', 1, 1, NULL);


--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 307
-- Name: categories_department_source_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_department_source_lnk_id_seq', 73, true);


--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 247
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 25, true);


--
-- TOC entry 3692 (class 0 OID 0)
-- Dependencies: 249
-- Name: crawler_configs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.crawler_configs_id_seq', 4, true);


--
-- TOC entry 3693 (class 0 OID 0)
-- Dependencies: 309
-- Name: department_sources_crawler_config_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_sources_crawler_config_lnk_id_seq', 11, true);


--
-- TOC entry 3694 (class 0 OID 0)
-- Dependencies: 311
-- Name: department_sources_department_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_sources_department_lnk_id_seq', 20, true);


--
-- TOC entry 3695 (class 0 OID 0)
-- Dependencies: 253
-- Name: department_sources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_sources_id_seq', 22, true);


--
-- TOC entry 3696 (class 0 OID 0)
-- Dependencies: 329
-- Name: department_sources_schedule_config_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_sources_schedule_config_lnk_id_seq', 8, true);


--
-- TOC entry 3697 (class 0 OID 0)
-- Dependencies: 251
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 6, true);


--
-- TOC entry 3473 (class 2606 OID 262684)
-- Name: categories_department_source_lnk categories_department_source_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories_department_source_lnk
    ADD CONSTRAINT categories_department_source_lnk_pkey PRIMARY KEY (id);


--
-- TOC entry 3475 (class 2606 OID 262688)
-- Name: categories_department_source_lnk categories_department_source_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories_department_source_lnk
    ADD CONSTRAINT categories_department_source_lnk_uq UNIQUE (category_id, department_source_id);


--
-- TOC entry 3452 (class 2606 OID 262336)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3457 (class 2606 OID 262348)
-- Name: crawler_configs crawler_configs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crawler_configs
    ADD CONSTRAINT crawler_configs_pkey PRIMARY KEY (id);


--
-- TOC entry 3479 (class 2606 OID 262696)
-- Name: department_sources_crawler_config_lnk department_sources_crawler_config_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_crawler_config_lnk
    ADD CONSTRAINT department_sources_crawler_config_lnk_pkey PRIMARY KEY (id);


--
-- TOC entry 3481 (class 2606 OID 262700)
-- Name: department_sources_crawler_config_lnk department_sources_crawler_config_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_crawler_config_lnk
    ADD CONSTRAINT department_sources_crawler_config_lnk_uq UNIQUE (department_source_id, crawler_config_id);


--
-- TOC entry 3486 (class 2606 OID 262707)
-- Name: department_sources_department_lnk department_sources_department_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_department_lnk
    ADD CONSTRAINT department_sources_department_lnk_pkey PRIMARY KEY (id);


--
-- TOC entry 3488 (class 2606 OID 262711)
-- Name: department_sources_department_lnk department_sources_department_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_department_lnk
    ADD CONSTRAINT department_sources_department_lnk_uq UNIQUE (department_source_id, department_id);


--
-- TOC entry 3467 (class 2606 OID 262372)
-- Name: department_sources department_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources
    ADD CONSTRAINT department_sources_pkey PRIMARY KEY (id);


--
-- TOC entry 3494 (class 2606 OID 286728)
-- Name: department_sources_schedule_config_lnk department_sources_schedule_config_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_schedule_config_lnk
    ADD CONSTRAINT department_sources_schedule_config_lnk_pkey PRIMARY KEY (id);


--
-- TOC entry 3496 (class 2606 OID 286732)
-- Name: department_sources_schedule_config_lnk department_sources_schedule_config_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_schedule_config_lnk
    ADD CONSTRAINT department_sources_schedule_config_lnk_uq UNIQUE (department_source_id, schedule_config_id);


--
-- TOC entry 3490 (class 2606 OID 263264)
-- Name: department_websites department_websites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_websites
    ADD CONSTRAINT department_websites_pkey PRIMARY KEY (id);


--
-- TOC entry 3462 (class 2606 OID 262360)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- TOC entry 3449 (class 1259 OID 262338)
-- Name: categories_created_by_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_created_by_id_fk ON public.categories USING btree (created_by_id);


--
-- TOC entry 3469 (class 1259 OID 262685)
-- Name: categories_department_source_lnk_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_department_source_lnk_fk ON public.categories_department_source_lnk USING btree (category_id);


--
-- TOC entry 3470 (class 1259 OID 262686)
-- Name: categories_department_source_lnk_ifk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_department_source_lnk_ifk ON public.categories_department_source_lnk USING btree (department_source_id);


--
-- TOC entry 3471 (class 1259 OID 262689)
-- Name: categories_department_source_lnk_oifk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_department_source_lnk_oifk ON public.categories_department_source_lnk USING btree (category_ord);


--
-- TOC entry 3450 (class 1259 OID 262337)
-- Name: categories_documents_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_documents_idx ON public.categories USING btree (document_id, locale, published_at);


--
-- TOC entry 3453 (class 1259 OID 262339)
-- Name: categories_updated_by_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_updated_by_id_fk ON public.categories USING btree (updated_by_id);


--
-- TOC entry 3454 (class 1259 OID 262350)
-- Name: crawler_configs_created_by_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX crawler_configs_created_by_id_fk ON public.crawler_configs USING btree (created_by_id);


--
-- TOC entry 3455 (class 1259 OID 262349)
-- Name: crawler_configs_documents_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX crawler_configs_documents_idx ON public.crawler_configs USING btree (document_id, locale, published_at);


--
-- TOC entry 3458 (class 1259 OID 262351)
-- Name: crawler_configs_updated_by_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX crawler_configs_updated_by_id_fk ON public.crawler_configs USING btree (updated_by_id);


--
-- TOC entry 3476 (class 1259 OID 262697)
-- Name: department_sources_crawler_config_lnk_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX department_sources_crawler_config_lnk_fk ON public.department_sources_crawler_config_lnk USING btree (department_source_id);


--
-- TOC entry 3477 (class 1259 OID 262698)
-- Name: department_sources_crawler_config_lnk_ifk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX department_sources_crawler_config_lnk_ifk ON public.department_sources_crawler_config_lnk USING btree (crawler_config_id);


--
-- TOC entry 3464 (class 1259 OID 262374)
-- Name: department_sources_created_by_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX department_sources_created_by_id_fk ON public.department_sources USING btree (created_by_id);


--
-- TOC entry 3482 (class 1259 OID 262708)
-- Name: department_sources_department_lnk_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX department_sources_department_lnk_fk ON public.department_sources_department_lnk USING btree (department_source_id);


--
-- TOC entry 3483 (class 1259 OID 262709)
-- Name: department_sources_department_lnk_ifk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX department_sources_department_lnk_ifk ON public.department_sources_department_lnk USING btree (department_id);


--
-- TOC entry 3484 (class 1259 OID 262712)
-- Name: department_sources_department_lnk_oifk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX department_sources_department_lnk_oifk ON public.department_sources_department_lnk USING btree (department_source_ord);


--
-- TOC entry 3465 (class 1259 OID 262373)
-- Name: department_sources_documents_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX department_sources_documents_idx ON public.department_sources USING btree (document_id, locale, published_at);


--
-- TOC entry 3491 (class 1259 OID 286729)
-- Name: department_sources_schedule_config_lnk_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX department_sources_schedule_config_lnk_fk ON public.department_sources_schedule_config_lnk USING btree (department_source_id);


--
-- TOC entry 3492 (class 1259 OID 286730)
-- Name: department_sources_schedule_config_lnk_ifk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX department_sources_schedule_config_lnk_ifk ON public.department_sources_schedule_config_lnk USING btree (schedule_config_id);


--
-- TOC entry 3468 (class 1259 OID 262375)
-- Name: department_sources_updated_by_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX department_sources_updated_by_id_fk ON public.department_sources USING btree (updated_by_id);


--
-- TOC entry 3459 (class 1259 OID 262362)
-- Name: departments_created_by_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX departments_created_by_id_fk ON public.departments USING btree (created_by_id);


--
-- TOC entry 3460 (class 1259 OID 262361)
-- Name: departments_documents_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX departments_documents_idx ON public.departments USING btree (document_id, locale, published_at);


--
-- TOC entry 3463 (class 1259 OID 262363)
-- Name: departments_updated_by_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX departments_updated_by_id_fk ON public.departments USING btree (updated_by_id);


--
-- TOC entry 3497 (class 2606 OID 262893)
-- Name: categories categories_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- TOC entry 3507 (class 2606 OID 263163)
-- Name: categories_department_source_lnk categories_department_source_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories_department_source_lnk
    ADD CONSTRAINT categories_department_source_lnk_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 3508 (class 2606 OID 263168)
-- Name: categories_department_source_lnk categories_department_source_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories_department_source_lnk
    ADD CONSTRAINT categories_department_source_lnk_ifk FOREIGN KEY (department_source_id) REFERENCES public.department_sources(id) ON DELETE CASCADE;


--
-- TOC entry 3498 (class 2606 OID 262898)
-- Name: categories categories_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- TOC entry 3500 (class 2606 OID 262903)
-- Name: crawler_configs crawler_configs_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crawler_configs
    ADD CONSTRAINT crawler_configs_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- TOC entry 3501 (class 2606 OID 262908)
-- Name: crawler_configs crawler_configs_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crawler_configs
    ADD CONSTRAINT crawler_configs_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- TOC entry 3509 (class 2606 OID 263173)
-- Name: department_sources_crawler_config_lnk department_sources_crawler_config_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_crawler_config_lnk
    ADD CONSTRAINT department_sources_crawler_config_lnk_fk FOREIGN KEY (department_source_id) REFERENCES public.department_sources(id) ON DELETE CASCADE;


--
-- TOC entry 3510 (class 2606 OID 263178)
-- Name: department_sources_crawler_config_lnk department_sources_crawler_config_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_crawler_config_lnk
    ADD CONSTRAINT department_sources_crawler_config_lnk_ifk FOREIGN KEY (crawler_config_id) REFERENCES public.crawler_configs(id) ON DELETE CASCADE;


--
-- TOC entry 3505 (class 2606 OID 262923)
-- Name: department_sources department_sources_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources
    ADD CONSTRAINT department_sources_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- TOC entry 3511 (class 2606 OID 263183)
-- Name: department_sources_department_lnk department_sources_department_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_department_lnk
    ADD CONSTRAINT department_sources_department_lnk_fk FOREIGN KEY (department_source_id) REFERENCES public.department_sources(id) ON DELETE CASCADE;


--
-- TOC entry 3512 (class 2606 OID 263188)
-- Name: department_sources_department_lnk department_sources_department_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_department_lnk
    ADD CONSTRAINT department_sources_department_lnk_ifk FOREIGN KEY (department_id) REFERENCES public.departments(id) ON DELETE CASCADE;


--
-- TOC entry 3513 (class 2606 OID 286733)
-- Name: department_sources_schedule_config_lnk department_sources_schedule_config_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_schedule_config_lnk
    ADD CONSTRAINT department_sources_schedule_config_lnk_fk FOREIGN KEY (department_source_id) REFERENCES public.department_sources(id) ON DELETE CASCADE;


--
-- TOC entry 3514 (class 2606 OID 286738)
-- Name: department_sources_schedule_config_lnk department_sources_schedule_config_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources_schedule_config_lnk
    ADD CONSTRAINT department_sources_schedule_config_lnk_ifk FOREIGN KEY (schedule_config_id) REFERENCES public.schedule_configs(id) ON DELETE CASCADE;


--
-- TOC entry 3506 (class 2606 OID 262928)
-- Name: department_sources department_sources_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_sources
    ADD CONSTRAINT department_sources_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- TOC entry 3503 (class 2606 OID 262913)
-- Name: departments departments_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- TOC entry 3504 (class 2606 OID 262918)
-- Name: departments departments_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- TOC entry 3499 (class 2606 OID 263323)
-- Name: categories fk9dx3vtixls9c0ieff2hm7x0mw; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT fk9dx3vtixls9c0ieff2hm7x0mw FOREIGN KEY (department_website_id) REFERENCES public.department_websites(id) ON DELETE SET NULL;


--
-- TOC entry 3502 (class 2606 OID 263328)
-- Name: crawler_configs fkt8xie1v1tc1ywl2eu32bqirx9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crawler_configs
    ADD CONSTRAINT fkt8xie1v1tc1ywl2eu32bqirx9 FOREIGN KEY (department_website_id) REFERENCES public.department_websites(id) ON DELETE CASCADE;


-- Completed on 2025-09-20 17:38:45

--
-- PostgreSQL database dump complete
--

