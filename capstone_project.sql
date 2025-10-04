--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.2

-- Started on 2025-09-27 12:44:39

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
-- TOC entry 3621 (class 0 OID 295093)
-- Dependencies: 248
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (3, 'djlnvl3e90234enh3s52vx8j', 'TIN TỨC - SỰ KIỆN', 'https://iuh.edu.vn/vi/tin-tuc-su-kien-fi11', 'ttsk', '2025-09-15', '2025-09-15 21:07:53.808', '2025-09-15 21:07:53.808', NULL, 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (4, 'djlnvl3e90234enh3s52vx8j', 'TIN TỨC - SỰ KIỆN', 'https://iuh.edu.vn/vi/tin-tuc-su-kien-fi11', 'ttsk', '2025-09-15', '2025-09-15 21:07:53.808', '2025-09-15 21:07:53.808', '2025-09-15 21:07:54.734', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (7, 'yem9fqqlq06dv8mq4lk4yah8', 'HỢP TÁC QUỐC TẾ', 'https://iuh.edu.vn/vi/hop-tac-quoc-te-fi12', 'htqt', '2025-09-15', '2025-09-15 21:10:00.506', '2025-09-15 21:10:00.506', NULL, 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (8, 'yem9fqqlq06dv8mq4lk4yah8', 'HỢP TÁC QUỐC TẾ', 'https://iuh.edu.vn/vi/hop-tac-quoc-te-fi12', 'htqt', '2025-09-15', '2025-09-15 21:10:00.506', '2025-09-15 21:10:00.506', '2025-09-15 21:10:01.433', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (9, 'chxxu7329jkbka32ne5hfktd', 'TIN TỨC - SỰ KIỆN', 'https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien', 'ttsk', '2025-09-15', '2025-09-15 21:13:11.491', '2025-09-15 21:13:11.491', NULL, 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (10, 'chxxu7329jkbka32ne5hfktd', 'TIN TỨC - SỰ KIỆN', 'https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien', 'ttsk', '2025-09-15', '2025-09-15 21:13:11.491', '2025-09-15 21:13:11.491', '2025-09-15 21:13:12.417', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (11, 'ee13qi6zu0eevk16w8mgijgl', 'THÔNG BÁO SINH VIÊN', 'https://fit.iuh.edu.vn/news.html@155@Thong-bao', 'tbsv', '2025-09-15', '2025-09-15 21:13:39.624', '2025-09-15 21:13:39.624', NULL, 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (12, 'ee13qi6zu0eevk16w8mgijgl', 'THÔNG BÁO SINH VIÊN', 'https://fit.iuh.edu.vn/news.html@155@Thong-bao', 'tbsv', '2025-09-15', '2025-09-15 21:13:39.624', '2025-09-15 21:13:39.624', '2025-09-15 21:13:40.551', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (13, 'ewff4ownesz32zgcbrculxod', 'THÔNG TIN TUYỂN SINH', 'https://fit.iuh.edu.vn/news.html@157@Thong-tin-tuyen-sinh', 'ttts', '2025-09-15', '2025-09-15 21:14:22.313', '2025-09-15 21:14:42.026', NULL, 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (15, 'ewff4ownesz32zgcbrculxod', 'THÔNG TIN TUYỂN SINH', 'https://fit.iuh.edu.vn/news.html@157@Thong-tin-tuyen-sinh', 'ttts', '2025-09-15', '2025-09-15 21:14:22.313', '2025-09-15 21:14:42.026', '2025-09-15 21:14:43.008', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (16, 'oounuzkrctz0iu2gzlua70xs', 'THỰC TẬP TUYỂN DỤNG', 'https://fit.iuh.edu.vn/news.html@104@Tuyen-dung-chuyen-nganh', 'tttd', '2025-09-15', '2025-09-15 21:15:20.666', '2025-09-15 21:15:20.666', NULL, 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (17, 'oounuzkrctz0iu2gzlua70xs', 'THỰC TẬP TUYỂN DỤNG', 'https://fit.iuh.edu.vn/news.html@104@Tuyen-dung-chuyen-nganh', 'tttd', '2025-09-15', '2025-09-15 21:15:20.666', '2025-09-15 21:15:20.666', '2025-09-15 21:15:21.593', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (5, 'tparhr4jnfzc42latakn659b', 'THÔNG TIN TUYỂN SINH', 'https://iuh.edu.vn/vi/tuyen-sinh-fi16', 'ttts', '2025-09-15', '2025-09-15 21:09:03.789', '2025-09-15 21:16:06.757', NULL, 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (18, 'tparhr4jnfzc42latakn659b', 'THÔNG TIN TUYỂN SINH', 'https://iuh.edu.vn/vi/tuyen-sinh-fi16', 'ttts', '2025-09-15', '2025-09-15 21:09:03.789', '2025-09-15 21:16:06.757', '2025-09-15 21:16:07.739', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (19, 'beyyzkoebwhelf873muayd3j', 'TIN TỨC - SỰ KIỆN', 'https://pdt.iuh.edu.vn/category/tin-tuc-su-kien/', 'ttsk', '2025-09-15', '2025-09-15 21:18:07.095', '2025-09-15 21:19:16.881', NULL, 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (21, 'beyyzkoebwhelf873muayd3j', 'TIN TỨC - SỰ KIỆN', 'https://pdt.iuh.edu.vn/category/tin-tuc-su-kien/', 'ttsk', '2025-09-15', '2025-09-15 21:18:07.095', '2025-09-15 21:19:16.881', '2025-09-15 21:19:18.135', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (22, 'si8h0hiz0p6a8a4opa4otb6e', 'HOẠT ĐỘNG PHONG TRÀO', 'https://ctsv.iuh.edu.vn/news.html@211@Hoat-dong-phong-trao', 'hdpt', '2025-09-15', '2025-09-15 21:21:27.594', '2025-09-15 21:21:27.594', NULL, 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (23, 'si8h0hiz0p6a8a4opa4otb6e', 'HOẠT ĐỘNG PHONG TRÀO', 'https://ctsv.iuh.edu.vn/news.html@211@Hoat-dong-phong-trao', 'hdpt', '2025-09-15', '2025-09-15 21:21:27.594', '2025-09-15 21:21:27.594', '2025-09-15 21:21:28.52', 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'w279v31g6lxb2ru6wiuy9en0', 'THÔNG BÁO SINH VIÊN', 'https://iuh.edu.vn/vi/thong-bao-fi20', 'tbsv', '2025-09-18', '2025-09-15 21:06:20.367', '2025-09-20 13:29:54.418', NULL, 1, 1, NULL);
INSERT INTO public.categories (id, document_id, category_name, category_url, key_category, last_external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (25, 'w279v31g6lxb2ru6wiuy9en0', 'THÔNG BÁO SINH VIÊN', 'https://iuh.edu.vn/vi/thong-bao-fi20', 'tbsv', '2025-09-18', '2025-09-15 21:06:20.367', '2025-09-20 13:29:54.418', '2025-09-20 13:29:55.164', 1, 1, NULL);


--
-- TOC entry 3627 (class 0 OID 295129)
-- Dependencies: 254
-- Data for Name: department_sources; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.department_sources (id, document_id, url, label, key_department_source, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (4, 'tgup7ekabcccxfl881k160ef', 'https://fit.iuh.edu.vn/', 'Khoa Công Nghệ Thông Tin', 'fit', '2025-09-15 21:12:07.651', '2025-09-20 11:55:01.614', NULL, 1, 1, NULL);
INSERT INTO public.department_sources (id, document_id, url, label, key_department_source, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (19, 'tgup7ekabcccxfl881k160ef', 'https://fit.iuh.edu.vn/', 'Khoa Công Nghệ Thông Tin', 'fit', '2025-09-15 21:12:07.651', '2025-09-20 11:55:01.614', '2025-09-20 11:55:02.923', 1, 1, NULL);
INSERT INTO public.department_sources (id, document_id, url, label, key_department_source, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (9, 'ivpdrzo0jxqlvoyada4in94v', 'https://ctsv.iuh.edu.vn/', 'Phòng Công Tác Chính Trị Và Hỗ Trợ Sinh Viên', 'ctsv', '2025-09-15 21:20:19.751', '2025-09-20 11:55:15.25', NULL, 1, 1, NULL);
INSERT INTO public.department_sources (id, document_id, url, label, key_department_source, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (20, 'ivpdrzo0jxqlvoyada4in94v', 'https://ctsv.iuh.edu.vn/', 'Phòng Công Tác Chính Trị Và Hỗ Trợ Sinh Viên', 'ctsv', '2025-09-15 21:20:19.751', '2025-09-20 11:55:15.25', '2025-09-20 11:55:16.559', 1, 1, NULL);
INSERT INTO public.department_sources (id, document_id, url, label, key_department_source, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'k36jtbgt692luepexawdtr5c', 'https://iuh.edu.vn', 'Trang Thông Tin Chính Thức IUH', 'iuh', '2025-09-15 21:06:56.534', '2025-09-20 11:55:35.565', NULL, 1, 1, NULL);
INSERT INTO public.department_sources (id, document_id, url, label, key_department_source, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (21, 'k36jtbgt692luepexawdtr5c', 'https://iuh.edu.vn', 'Trang Thông Tin Chính Thức IUH', 'iuh', '2025-09-15 21:06:56.534', '2025-09-20 11:55:35.565', '2025-09-20 11:55:36.874', 1, 1, NULL);
INSERT INTO public.department_sources (id, document_id, url, label, key_department_source, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (7, 'wj7w1t2u98b2d0gx6ha8xktt', 'https://pdt.iuh.edu.vn', 'Phòng Đào Tạo ', 'pdt', '2025-09-15 21:18:12.255', '2025-09-20 11:55:50.958', NULL, 1, 1, NULL);
INSERT INTO public.department_sources (id, document_id, url, label, key_department_source, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (22, 'wj7w1t2u98b2d0gx6ha8xktt', 'https://pdt.iuh.edu.vn', 'Phòng Đào Tạo ', 'pdt', '2025-09-15 21:18:12.255', '2025-09-20 11:55:50.958', '2025-09-20 11:55:52.267', 1, 1, NULL);


--
-- TOC entry 3629 (class 0 OID 295443)
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
-- TOC entry 3623 (class 0 OID 295105)
-- Dependencies: 250
-- Data for Name: crawler_configs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.crawler_configs (id, document_id, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (1, 'd1jez7gf4pdjru3mw98047jo', '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > h1 ::text', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > div.divNewsDetail', 'div.content-info.col-sm-9 > span ::text', '2025-09-15 21:26:05.197', '2025-09-15 21:26:05.197', NULL, 1, 1, NULL);
INSERT INTO public.crawler_configs (id, document_id, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (2, 'd1jez7gf4pdjru3mw98047jo', '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > h1 ::text', '#page-content > div > div > div > div.article-detail.col-md-9 > div.content > div.divNewsDetail', 'div.content-info.col-sm-9 > span ::text', '2025-09-15 21:26:05.197', '2025-09-15 21:26:05.197', '2025-09-15 21:26:05.961', 1, 1, NULL);
INSERT INTO public.crawler_configs (id, document_id, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (3, 'r51k16l81bc0vnsow5hyc6hq', '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.page-title ::text', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.left-content > div', 'div.content-info.col-sm-9 > span ::text', '2025-09-15 21:26:58.554', '2025-09-15 21:26:58.554', NULL, 1, 1, NULL);
INSERT INTO public.crawler_configs (id, document_id, relative_url_list, relative_url, thumbnail, next_pages, title, content, external_publish_date, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (4, 'r51k16l81bc0vnsow5hyc6hq', '.content', '.content-img a ::attr(href)', '.content-img img::attr(src)', '.pagination > .number::attr(href)', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.page-title ::text', 'body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.left-content > div', 'div.content-info.col-sm-9 > span ::text', '2025-09-15 21:26:58.554', '2025-09-15 21:26:58.554', '2025-09-15 21:26:59.317', 1, 1, NULL);


--
-- TOC entry 3631 (class 0 OID 295455)
-- Dependencies: 310
-- Data for Name: department_sources_crawler_config_lnk; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.department_sources_crawler_config_lnk (id, department_source_id, crawler_config_id) VALUES (1, 1, 1);
INSERT INTO public.department_sources_crawler_config_lnk (id, department_source_id, crawler_config_id) VALUES (3, 4, 3);
INSERT INTO public.department_sources_crawler_config_lnk (id, department_source_id, crawler_config_id) VALUES (10, 19, 4);
INSERT INTO public.department_sources_crawler_config_lnk (id, department_source_id, crawler_config_id) VALUES (11, 21, 2);


--
-- TOC entry 3625 (class 0 OID 295117)
-- Dependencies: 252
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.departments (id, document_id, department_name, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (5, 'ac6ruz4w3337gr7z4187pkm1', 'Khoa Công Nghệ Thông Tin IUH', '2025-09-14 22:55:11.08', '2025-09-14 22:55:11.08', NULL, 1, 1, NULL);
INSERT INTO public.departments (id, document_id, department_name, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) VALUES (6, 'ac6ruz4w3337gr7z4187pkm1', 'Khoa Công Nghệ Thông Tin IUH', '2025-09-14 22:55:11.08', '2025-09-14 22:55:11.08', '2025-09-14 22:55:11.908', 1, 1, NULL);


--
-- TOC entry 3633 (class 0 OID 295466)
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
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 307
-- Name: categories_department_source_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_department_source_lnk_id_seq', 73, true);


--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 247
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 25, true);


--
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 249
-- Name: crawler_configs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.crawler_configs_id_seq', 4, true);


--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 309
-- Name: department_sources_crawler_config_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_sources_crawler_config_lnk_id_seq', 11, true);


--
-- TOC entry 3643 (class 0 OID 0)
-- Dependencies: 311
-- Name: department_sources_department_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_sources_department_lnk_id_seq', 20, true);


--
-- TOC entry 3644 (class 0 OID 0)
-- Dependencies: 253
-- Name: department_sources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_sources_id_seq', 22, true);


--
-- TOC entry 3645 (class 0 OID 0)
-- Dependencies: 251
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 6, true);


-- Completed on 2025-09-27 12:44:39

--
-- PostgreSQL database dump complete
--

