--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.2

-- Started on 2025-07-19 19:54:37

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

--
-- TOC entry 3588 (class 0 OID 24772)
-- Dependencies: 244
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3590 (class 0 OID 24796)
-- Dependencies: 246
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.categories (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, last_external_publish_date, category_name, category_url, key_category) VALUES (93, 'w63o20179ucb8qpy1umoois7', '2025-07-10 20:26:34.208', '2025-07-18 11:46:00.208', '2025-07-18 11:46:00.278', 1, 1, NULL, '2025-07-15', 'THÔNG BÁO SINH VIÊN', 'https://fit.iuh.edu.vn/news.html@155@Thong-bao', 'tbsv');
INSERT INTO public.categories (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, last_external_publish_date, category_name, category_url, key_category) VALUES (3, 'is2favqx8kctoews8oa4wlns', '2025-07-10 20:25:56.561', '2025-07-18 11:46:06.511', NULL, 1, 1, NULL, '2025-07-18', 'TIN TỨC - SỰ KIỆN', 'https://iuh.edu.vn/vi/tin-tuc-su-kien-fi11', 'ttsk');
INSERT INTO public.categories (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, last_external_publish_date, category_name, category_url, key_category) VALUES (94, 'is2favqx8kctoews8oa4wlns', '2025-07-10 20:25:56.561', '2025-07-18 11:46:06.511', '2025-07-18 11:46:06.522', 1, 1, NULL, '2025-07-18', 'TIN TỨC - SỰ KIỆN', 'https://iuh.edu.vn/vi/tin-tuc-su-kien-fi11', 'ttsk');
INSERT INTO public.categories (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, last_external_publish_date, category_name, category_url, key_category) VALUES (5, 'd2yzqlir4kv6br22gmcfo67j', '2025-07-10 20:25:32.092', '2025-07-12 16:31:11.713', NULL, 1, 1, NULL, '2025-06-17', 'THÔNG BÁO SINH VIÊN', 'https://iuh.edu.vn/vi/thong-bao-fi20', 'tbsv');
INSERT INTO public.categories (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, last_external_publish_date, category_name, category_url, key_category) VALUES (91, 'd2yzqlir4kv6br22gmcfo67j', '2025-07-10 20:25:32.092', '2025-07-12 16:31:11.713', '2025-07-12 16:31:13.131', 1, 1, NULL, '2025-06-17', 'THÔNG BÁO SINH VIÊN', 'https://iuh.edu.vn/vi/thong-bao-fi20', 'tbsv');
INSERT INTO public.categories (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, last_external_publish_date, category_name, category_url, key_category) VALUES (1, 'gq079mohadthpaxq1yseazgy', '2025-07-10 20:27:03.15', '2025-07-12 16:09:55.229', NULL, 1, 1, NULL, '2025-05-27', 'TIN TỨC - SỰ KIỆN', 'https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien', 'ttsk');
INSERT INTO public.categories (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, last_external_publish_date, category_name, category_url, key_category) VALUES (89, 'gq079mohadthpaxq1yseazgy', '2025-07-10 20:27:03.15', '2025-07-12 16:09:55.229', '2025-07-12 16:09:56.483', 1, 1, NULL, '2025-05-27', 'TIN TỨC - SỰ KIỆN', 'https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien', 'ttsk');
INSERT INTO public.categories (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, last_external_publish_date, category_name, category_url, key_category) VALUES (7, 'w63o20179ucb8qpy1umoois7', '2025-07-10 20:26:34.208', '2025-07-18 11:46:00.208', NULL, 1, 1, NULL, '2025-07-15', 'THÔNG BÁO SINH VIÊN', 'https://fit.iuh.edu.vn/news.html@155@Thong-bao', 'tbsv');


--
-- TOC entry 3592 (class 0 OID 25106)
-- Dependencies: 286
-- Data for Name: articles_category_lnk; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3594 (class 0 OID 25559)
-- Dependencies: 296
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.departments (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_name, key_department, department_url) VALUES (1, 'q0qy1miahg66emhp6092w2vj', '2025-07-04 23:14:20.561', '2025-07-10 19:55:56.866', NULL, NULL, 1, NULL, 'Trang Thông Tin Chính Thức IUH', 'iuh', 'iuh.edu.vn');
INSERT INTO public.departments (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_name, key_department, department_url) VALUES (2, 'q0qy1miahg66emhp6092w2vj', '2025-07-04 23:14:20.561', '2025-07-10 19:55:56.866', '2025-07-10 19:55:58.005', NULL, 1, NULL, 'Trang Thông Tin Chính Thức IUH', 'iuh', 'iuh.edu.vn');
INSERT INTO public.departments (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_name, key_department, department_url) VALUES (3, 'cmn7cbodz9g35ut49dm6owt9', '2025-07-10 14:12:18.239', '2025-07-10 19:56:37.375', NULL, NULL, 1, NULL, 'Khoa Công Nghệ Thông Tin IUH', 'fit', 'fit.iuh.edu.vn');
INSERT INTO public.departments (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, department_name, key_department, department_url) VALUES (4, 'cmn7cbodz9g35ut49dm6owt9', '2025-07-10 14:12:18.239', '2025-07-10 19:56:37.375', '2025-07-10 19:56:38.466', NULL, 1, NULL, 'Khoa Công Nghệ Thông Tin IUH', 'fit', 'fit.iuh.edu.vn');


--
-- TOC entry 3596 (class 0 OID 25571)
-- Dependencies: 298
-- Data for Name: categories_department_lnk; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.categories_department_lnk (id, category_id, department_id, category_ord) VALUES (101, 89, 4, 2);
INSERT INTO public.categories_department_lnk (id, category_id, department_id, category_ord) VALUES (100, 1, 3, 1);
INSERT INTO public.categories_department_lnk (id, category_id, department_id, category_ord) VALUES (105, 91, 2, 3);
INSERT INTO public.categories_department_lnk (id, category_id, department_id, category_ord) VALUES (102, 3, 1, 1);
INSERT INTO public.categories_department_lnk (id, category_id, department_id, category_ord) VALUES (104, 5, 1, 2);
INSERT INTO public.categories_department_lnk (id, category_id, department_id, category_ord) VALUES (106, 7, 3, 2);
INSERT INTO public.categories_department_lnk (id, category_id, department_id, category_ord) VALUES (108, 93, 4, 3);
INSERT INTO public.categories_department_lnk (id, category_id, department_id, category_ord) VALUES (109, 94, 2, 2);


--
-- TOC entry 3598 (class 0 OID 81958)
-- Dependencies: 300
-- Data for Name: crawler_configs; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.crawler_configs (id, document_id, url, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (3, 'eoknxjq9r27ac3oawej75txh', 'https://fit.iuh.edu.vn', '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.page-title ::text', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.left-content > div', 'div.content-info.col-sm-9 > span ::text', '2025-07-10 19:13:21.401', '2025-07-12 16:10:41.265', NULL, 1, 1, NULL);
INSERT INTO public.crawler_configs (id, document_id, url, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (5, 'eoknxjq9r27ac3oawej75txh', 'https://fit.iuh.edu.vn', '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.page-title ::text', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.left-content > div', 'div.content-info.col-sm-9 > span ::text', '2025-07-10 19:13:21.401', '2025-07-12 16:10:41.265', '2025-07-12 16:10:42.247', 1, 1, NULL);
INSERT INTO public.crawler_configs (id, document_id, url, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'gg8sxpv1lsii92uvlckuqn5g', 'https://iuh.edu.vn', '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > h1 ::text', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > div.divNewsDetail', 'div.content-info.col-sm-9 > span ::text', '2025-07-10 19:11:51.631', '2025-07-12 16:10:53.734', NULL, 1, 1, NULL);
INSERT INTO public.crawler_configs (id, document_id, url, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (6, 'gg8sxpv1lsii92uvlckuqn5g', 'https://iuh.edu.vn', '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > h1 ::text', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > div.divNewsDetail', 'div.content-info.col-sm-9 > span ::text', '2025-07-10 19:11:51.631', '2025-07-12 16:10:53.734', '2025-07-12 16:10:54.716', 1, 1, NULL);


--
-- TOC entry 3600 (class 0 OID 81970)
-- Dependencies: 302
-- Data for Name: crawler_configs_department_lnk; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.crawler_configs_department_lnk (id, crawler_config_id, department_id) VALUES (7, 3, 3);
INSERT INTO public.crawler_configs_department_lnk (id, crawler_config_id, department_id) VALUES (8, 5, 4);
INSERT INTO public.crawler_configs_department_lnk (id, crawler_config_id, department_id) VALUES (9, 1, 1);
INSERT INTO public.crawler_configs_department_lnk (id, crawler_config_id, department_id) VALUES (10, 6, 2);


--
-- TOC entry 3602 (class 0 OID 82025)
-- Dependencies: 304
-- Data for Name: schedule_configs; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.schedule_configs (id, document_id, type, value, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'tqarumfivq5xmfbze6o9830q', 'HOURS', 6, '2025-07-10 20:28:42.659', '2025-07-10 20:28:42.659', NULL, 1, 1, NULL);
INSERT INTO public.schedule_configs (id, document_id, type, value, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (2, 'tqarumfivq5xmfbze6o9830q', 'HOURS', 6, '2025-07-10 20:28:42.659', '2025-07-10 20:28:42.659', '2025-07-10 20:28:43.151', 1, 1, NULL);


--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 285
-- Name: articles_category_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.articles_category_lnk_id_seq', 617, true);


--
-- TOC entry 3609 (class 0 OID 0)
-- Dependencies: 243
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.articles_id_seq', 612, true);


--
-- TOC entry 3610 (class 0 OID 0)
-- Dependencies: 297
-- Name: categories_department_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.categories_department_lnk_id_seq', 109, true);


--
-- TOC entry 3611 (class 0 OID 0)
-- Dependencies: 245
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.categories_id_seq', 94, true);


--
-- TOC entry 3612 (class 0 OID 0)
-- Dependencies: 301
-- Name: crawler_configs_department_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.crawler_configs_department_lnk_id_seq', 10, true);


--
-- TOC entry 3613 (class 0 OID 0)
-- Dependencies: 299
-- Name: crawler_configs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.crawler_configs_id_seq', 6, true);


--
-- TOC entry 3614 (class 0 OID 0)
-- Dependencies: 295
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.departments_id_seq', 12, true);


--
-- TOC entry 3615 (class 0 OID 0)
-- Dependencies: 303
-- Name: schedule_configs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.schedule_configs_id_seq', 2, true);


-- Completed on 2025-07-19 19:54:38

--
-- PostgreSQL database dump complete
--

