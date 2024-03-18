
--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', '84a298b6-9caf-4305-9bfe-3ea325df9188', 'authenticated', 'authenticated', 'germanzarkovich@gmail.com', '$2a$10$zDwI4WhdTYEEClfJm1VxVuhbXO.D8//bpMVwgV.dlYG.VujvRpi3q', '2024-03-05 15:35:23.695951+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-03-05 15:35:23.693491+00', '2024-03-05 15:35:23.696028+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '1caa66a7-d9a2-462f-93c4-e65946d61c02', 'authenticated', 'authenticated', 'someone@email.com', '$2a$10$qQA4UXgQC42VEL7Jj0BMI.lSolPCyHTQA0dy0209AT9/DTDoQ8./O', '2024-03-05 16:20:21.660728+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-03-05 16:20:21.673034+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-03-05 16:20:21.658888+00', '2024-03-05 16:20:21.673672+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('84a298b6-9caf-4305-9bfe-3ea325df9188', '84a298b6-9caf-4305-9bfe-3ea325df9188', '{"sub": "84a298b6-9caf-4305-9bfe-3ea325df9188", "email": "germanzarkovich@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-03-05 15:35:23.694546+00', '2024-03-05 15:35:23.694566+00', '2024-03-05 15:35:23.694566+00', '90e98ab8-ce45-4579-bb03-41d5c42a8e72'),
	('1caa66a7-d9a2-462f-93c4-e65946d61c02', '1caa66a7-d9a2-462f-93c4-e65946d61c02', '{"sub": "1caa66a7-d9a2-462f-93c4-e65946d61c02", "email": "someone@email.com", "email_verified": false, "phone_verified": false}', 'email', '2024-03-05 16:20:21.660274+00', '2024-03-05 16:20:21.660292+00', '2024-03-05 16:20:21.660292+00', 'd75943f8-4ef2-4690-95af-d2e9cda392db');



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('bbcd024c-ced7-4a5e-a835-585973a170da', '1caa66a7-d9a2-462f-93c4-e65946d61c02', '2024-03-05 16:20:21.673063+00', '2024-03-05 16:20:21.673063+00', NULL, 'aal1', NULL, NULL, 'curl/7.81.0', '172.18.0.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('bbcd024c-ced7-4a5e-a835-585973a170da', '2024-03-05 16:20:21.67379+00', '2024-03-05 16:20:21.67379+00', 'password', 'a0f28147-3610-4695-b4c2-defb7fe28862');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 2, 'JKvmSignS5fOGJPpc96HXA', '1caa66a7-d9a2-462f-93c4-e65946d61c02', false, '2024-03-05 16:20:21.673358+00', '2024-03-05 16:20:21.673358+00', NULL, 'bbcd024c-ced7-4a5e-a835-585973a170da');


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."location" ("id", "created_at", "street_number", "street_number_suffix", "street_name", "street_type", "street_direction", "address_type", "address_type_identifier", "minor_municipality", "major_municipality", "governing_district", "postal_area", "country", "user_id") VALUES
	(1, '2024-03-05 15:36:33.909601+00', 1, '', 'Little Hill ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '84a298b6-9caf-4305-9bfe-3ea325df9188');


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."clients" ("user_id", "created_at", "location", "client_phone", "display_name", "image_url") VALUES
	('84a298b6-9caf-4305-9bfe-3ea325df9188', '2024-03-05 15:37:01.129356+00', 1, 10001, 'German', NULL);


--
-- Data for Name: post_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."post_category" ("id", "category", "language") VALUES
	(1, 'Social Studies - History', 1),
	(2, 'Specialty', 1),
	(3, 'All Subject Area', 1),
	(4, 'Art & Music', 1),
	(5, 'English Language Arts', 1),
	(6, 'Foreign Language', 1),
	(7, 'Holiday', 1),
	(8, 'Math', 1),
	(9, 'Science', 1),
	


--
-- Data for Name: seller_post; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."seller_post" ("id", "created_at", "title", "product_category", "content", "location", "user_id", "image_urls") VALUES
	(1, '2024-03-05 15:38:02.509065+00', 'Test Post 1', 1, 'Content of the first post', 1, '84a298b6-9caf-4305-9bfe-3ea325df9188', NULL),
	(2, '2024-03-05 15:40:05.243892+00', 'Test Post 2', 1, 'Content for the second post', 1, '84a298b6-9caf-4305-9bfe-3ea325df9188', NULL),
	(3, '2024-03-05 21:52:06.919336+00', 'Math course', 3, 'math course for k12', 1, '84a298b6-9caf-4305-9bfe-3ea325df9188', NULL),
	(5, '2024-03-05 21:53:47.560102+00', 'Geography course', 2, 'k10 geography course', 1, '84a298b6-9caf-4305-9bfe-3ea325df9188', NULL),
	(6, '2024-03-05 21:54:44.695358+00', 'programming course ', 3, 'learn programming', 1, '1caa66a7-d9a2-462f-93c4-e65946d61c02', NULL);


--
-- Data for Name: sellers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."sellers" ("created_at", "seller_name", "user_id", "location", "seller_phone", "image_url", "seller_id", "language_spoken") VALUES
	('2024-03-05 15:42:34.225911+00', 'German', '84a298b6-9caf-4305-9bfe-3ea325df9188', 1, '00010001', NULL, 3, '{english}');


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 2, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: Country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Country_id_seq"', 1, false);


--
-- Name: Location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Location_id_seq"', 1, true);


--
-- Name: governing_district_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."governing_district_id_seq"', 1, false);


--
-- Name: language_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."language_id_seq"', 1, false);


--
-- Name: major_municipality_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."major_municipality_id_seq"', 1, false);


--
-- Name: minor_municipality_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."minor_municipality_id_seq"', 1, false);


--
-- Name: post_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."post_category_id_seq"', 3, true);


--
-- Name: seller_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."seller_post_id_seq"', 6, true);


--
-- Name: sellers_seller_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."sellers_seller_id_seq"', 3, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;

