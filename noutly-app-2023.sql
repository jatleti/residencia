/*
 Navicat Premium Data Transfer

 Source Server         : MySQL Local
 Source Server Type    : MySQL
 Source Server Version : 80026 (8.0.26)
 Source Host           : localhost:3306
 Source Schema         : noutly-app-2023

 Target Server Type    : MySQL
 Target Server Version : 80026 (8.0.26)
 File Encoding         : 65001

 Date: 04/07/2023 11:41:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
BEGIN;
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES ('24ed2170-8320-4eca-bfa5-189b87d312fb', '05246f9b1691340b907c2f8cc942e75bfb07dce73bab7b3253e7a16682e9fb3b', '2023-06-18 11:57:54.231', '20230617180047_init', NULL, NULL, '2023-06-18 11:57:54.205', 1);
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES ('be7e5993-d09f-4bef-84cf-f61e5a1a26fb', '8d0e86d229e6ee4db342fb6e4d39440fec98388fdac0a24d90f414b56652e752', '2023-06-18 11:57:54.487', '20230618115754_', NULL, NULL, '2023-06-18 11:57:54.470', 1);
COMMIT;

-- ----------------------------
-- Table structure for NT_ApiKeytokenKEY
-- ----------------------------
DROP TABLE IF EXISTS `NT_ApiKeytokenKEY`;
CREATE TABLE `NT_ApiKeytokenKEY` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `access_on` datetime(3) DEFAULT NULL,
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NT_ApiKeytokenKEY_id_key` (`id`),
  UNIQUE KEY `NT_ApiKeytokenKEY_token_key` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of NT_ApiKeytokenKEY
-- ----------------------------
BEGIN;
INSERT INTO `NT_ApiKeytokenKEY` (`id`, `token`, `description`, `created_at`, `updated_at`, `deleted_at`, `access_on`, `ip`) VALUES ('fd6ca018-9d72-4ff7-a389-37b400fb0a78', 'aqZzjKduGVtbfJrz9tHw9Clmv5OxWpUZ', 'Token inicial', '2023-06-18 12:14:19.100', '2023-06-22 16:46:49.541', NULL, '2023-06-22 16:46:49.540', '::1');
COMMIT;

-- ----------------------------
-- Table structure for NT_UserSessionsUS
-- ----------------------------
DROP TABLE IF EXISTS `NT_UserSessionsUS`;
CREATE TABLE `NT_UserSessionsUS` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_user` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenid` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `init_session` datetime(3) DEFAULT NULL,
  `last_change` datetime(3) DEFAULT NULL,
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NT_UserSessionsUS_id_key` (`id`),
  KEY `NT_UserSessionsUS_id_user_fkey` (`id_user`),
  CONSTRAINT `NT_UserSessionsUS_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `NT_UsersUSR` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of NT_UserSessionsUS
-- ----------------------------
BEGIN;
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('02ef6d69-5b9a-4414-be75-b30585e60093', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNTA0LCJleHAiOjE2ODc2OTE1MDR9.yIgIW4mZH11dmLuunmZrYMeK5q_OfQKXBFjQRoFD9rQ', 0, '2023-06-18 12:31:44.441', '2023-06-18 14:38:54.952', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('05eea729-183f-4b26-ac25-66d70dad1404', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNDA0LCJleHAiOjE2ODc2OTE0MDR9.hlt7QmOc5H_phW7NegBsmlDilN-j0E2Cvgc1ReRMWC8', 0, '2023-06-18 12:30:04.628', '2023-06-18 14:31:44.363', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('065184b6-74cf-4aaa-8d5c-c767421695be', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDg5NTIzLCJleHAiOjE2ODc2ODk1MjN9.4WRwayekq1J4-rUhxzyJM6mPWsaYlmI0Fh3KxSab9H4', 0, '2023-06-18 11:58:43.345', '2023-06-18 14:30:04.581', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('0797d760-01c4-4dd9-ae97-9a4c8063bc5a', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXogR29uesOhbGV6IiwicGVybWlzc2lvbnMiOiIxIiwiaWF0IjoxNjg3MTY1OTQ0LCJleHAiOjE2ODc3NjU5NDR9.bVxrp1bGMOg5uAn1GcDf0SMfw5vsw-DccF6K9W242hc', 0, '2023-06-19 09:12:24.256', '2023-06-19 11:12:34.189', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('0fae1b3a-80bf-4bd1-b9b7-3697abd41f61', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6IjAiLCJpYXQiOjE2ODcxNjA2MDUsImV4cCI6MTY4Nzc2MDYwNX0.9agSIwR7WjrH4bSyRHHf3Tl-hEEqWbXUrMAji_DA2xo', 0, '2023-06-19 07:43:25.583', '2023-06-19 10:56:09.840', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('10267720-b4b2-482f-b787-21e807c39b67', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkwODIzLCJleHAiOjE2ODc2OTA4MjN9.09ZEmG82MKO5zGnhDeBkZTSC3cuNIMiBs7XwzNnPXjk', 0, '2023-06-18 12:20:23.756', '2023-06-18 12:20:23.756', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('1048a93a-281f-4f8b-91dd-b2fb3202433c', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkyMTAxLCJleHAiOjE2ODc2OTIxMDF9.ZRvHU-pz8YKki8_ik5CJxBOu7gjGtY7TthyLOqUpqoE', 0, '2023-06-18 12:41:41.393', '2023-06-18 12:41:41.393', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('10697d6a-1d50-46d6-afe9-ef921e83aa35', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXogR29uesOhbGV6IiwicGVybWlzc2lvbnMiOiIwIiwiaWF0IjoxNjg3MTY1MDIxLCJleHAiOjE2ODc3NjUwMjF9._3IdR14kiQS-heEOw2uC9ziO_G_B-mnillrol467Fd8', 0, '2023-06-19 08:57:01.403', '2023-06-19 11:00:32.095', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('156ac45e-f3dc-49c1-a010-7c5a497cd8ac', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNzQ0LCJleHAiOjE2ODc2OTE3NDR9.kguicXZ08uu9AgSfIaBiCeOjaAlt773GhNKyQEAlVf4', 0, '2023-06-18 12:35:44.475', '2023-06-18 12:35:44.475', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('1a320dfb-6c7f-4376-b511-386f3c6ffd46', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXogR29uesOhbGV6IiwicGVybWlzc2lvbnMiOiIwIiwiaWF0IjoxNjg3MTY1MjMzLCJleHAiOjE2ODc3NjUyMzN9.OydSm3zBfpFOuKtCYG57U_zEIl3ubAJ3cn31xdB4hkk', 0, '2023-06-19 09:00:33.737', '2023-06-19 11:00:36.882', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('1e9a15c9-2c68-4a26-a5b8-3d6848a187b1', '880f851d-c75b-4a0e-9a63-c752d064ba40', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiODgwZjg1MWQtYzc1Yi00YTBlLTlhNjMtYzc1MmQwNjRiYTQwIiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWJhw7FleiIsInBlcm1pc3Npb25zIjpudWxsLCJpYXQiOjE2ODcxNjQ5NzcsImV4cCI6MTY4Nzc2NDk3N30.kAa0eegoO9Eevd6siJR1Y5CsrRBiuDP2Ur0qefn3vZA', 0, '2023-06-19 08:56:17.748', '2023-06-19 10:56:23.981', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('2a62b43c-e08e-421d-aa7e-1106820f7644', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNjA1LCJleHAiOjE2ODc2OTE2MDV9.CepIH7XzpgHlRMXWnWn1b2W8jK2nTHgsJ6S3gPBg9Y8', 0, '2023-06-18 12:33:25.131', '2023-06-18 12:33:25.131', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('2b5206ac-b8d2-4d05-acf5-76c51c6a41f0', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkyMDc2LCJleHAiOjE2ODc2OTIwNzZ9.J4YhxhviFsbHAAyE8IDGAweD7yWrLKdcxulFSmFfLmw', 0, '2023-06-18 12:41:16.197', '2023-06-18 12:41:16.197', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('2f9501e5-cde6-4f5e-9113-ced44708bf79', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDk1NDUxLCJleHAiOjE2ODc2OTU0NTF9.g00aGHBE0xwaZMdB_-b8EUE1HiPk8AcuSLZL0FSD71E', 0, '2023-06-18 13:37:31.032', '2023-06-18 15:37:32.452', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('33c7c746-79a6-4651-8734-7fa18c11d760', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDk1Mzc1LCJleHAiOjE2ODc2OTUzNzV9.3TRW2E0M5g9vg7eT4YQ2dlkDuOVZ8GfQq4q8ND-1zwM', 0, '2023-06-18 13:36:15.215', '2023-06-18 15:36:16.630', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('491873c6-498c-42a2-8f23-36bc233b2951', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkyMDc0LCJleHAiOjE2ODc2OTIwNzR9.vix6iXuc49GVuyaWrLhsB7o6hjfNe3heGvgq6jG3j0E', 0, '2023-06-18 12:41:14.598', '2023-06-18 12:41:14.598', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('4c0ed372-7928-412d-83ea-1049be679d50', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6IjAiLCJpYXQiOjE2ODcxMDE1NTYsImV4cCI6MTY4NzcwMTU1Nn0.FHHC-a_9vto9zzMNtHTFGwUWTugFYDqMwd-sH2_TYP4', 0, '2023-06-18 15:19:16.008', '2023-06-19 09:43:00.846', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('511debba-fcbc-4bf0-943c-b68d7dee7bf8', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNzczLCJleHAiOjE2ODc2OTE3NzN9.icskdsIRJLBtPr1ObOQxEnYERxBXmLSidKmTsLU5hjY', 0, '2023-06-18 12:36:13.564', '2023-06-18 12:36:13.564', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('51d3d9c7-96de-4e7d-bb15-9ee435728532', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDk1MDA3LCJleHAiOjE2ODc2OTUwMDd9.EQuyNdxfhySs1v48q3gjV4jjmvPw9p6JmipkjxUu9BU', 0, '2023-06-18 13:30:07.217', '2023-06-18 13:30:07.217', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('5640d755-105a-433b-bce2-71b396cb97ff', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxODEyLCJleHAiOjE2ODc2OTE4MTJ9.vl0RGrXotsBzBAtpNpPjc5pTJIoU4s252e75NtpzVx4', 0, '2023-06-18 12:36:52.842', '2023-06-18 12:36:52.842', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('744ac31f-fcde-4c7e-a8e4-8e44492dbb3c', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkwNDY0LCJleHAiOjE2ODc2OTA0NjR9.5_5gAe3NBXAHURmkmfxyN0JENyYTO4oqw2nbua27XmI', 0, '2023-06-18 12:14:24.727', '2023-06-18 12:14:24.727', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('82c1c156-af3f-42a0-aaaf-56cf999f1abf', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDk1NDk5LCJleHAiOjE2ODc2OTU0OTl9.Sq_JmSZVPs7jBzHJsvx2IzRwDD3hRCIBnxJqZLBYsJQ', 0, '2023-06-18 13:38:19.798', '2023-06-18 15:38:21.413', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('8771e126-68d7-4f01-bb86-f4b69194308b', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkwOTgyLCJleHAiOjE2ODc2OTA5ODJ9._UJd9FfX5mdM9XlltauSGzqNInLsWZ9z8FuyF3EIn38', 0, '2023-06-18 12:23:02.352', '2023-06-18 12:23:02.352', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('8d286b32-a17e-45fd-b655-1c175ce4edf4', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDk1MTQ1LCJleHAiOjE2ODc2OTUxNDV9.b8qiS43xA6gJDFJuTTOloOzvB_q1dTBgfeCiGk33MV8', 0, '2023-06-18 13:32:25.618', '2023-06-18 13:32:25.618', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('91368909-1c5c-4fd9-9725-ff117958acd4', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxODMzLCJleHAiOjE2ODc2OTE4MzN9.18f4yWFqeBz05x9ouPZDaoUkrQbHNff6LjgAzHfcxhU', 0, '2023-06-18 12:37:13.982', '2023-06-18 12:37:13.982', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('99f0fe05-d8dd-461d-ad52-012ccdf3363e', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkwOTY4LCJleHAiOjE2ODc2OTA5Njh9.d-NygGN6pMmqqVS6Cm3GskXPyYlIfXOQNHvTL7D3Pb0', 0, '2023-06-18 12:22:48.949', '2023-06-18 12:22:48.949', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('aac1a1d2-a67d-4913-943d-05ef2b8cd102', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDg5OTgxLCJleHAiOjE2ODc2ODk5ODF9.Mqmd6m0NofapBkNAPbciSxqG_06iX7i1eKfzVNz0nms', 0, '2023-06-18 12:06:21.553', '2023-06-18 12:06:21.553', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('ada7d57a-8c3b-4523-802d-c41355cfb035', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNjA2LCJleHAiOjE2ODc2OTE2MDZ9.Xz3n_pNsFPORN7jPct8xqYNLdZkteBOTi2pYWzbLemE', 0, '2023-06-18 12:33:26.132', '2023-06-18 12:33:26.132', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('b63c9bc6-964d-45b3-94ce-bc5e7c9e44a9', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNzIyLCJleHAiOjE2ODc2OTE3MjJ9.nx6lqhVjg25aXsEf1DN1Y7IVDi_wtAEfaom78Cc1pr4', 0, '2023-06-18 12:35:22.489', '2023-06-18 12:35:22.489', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('bff859d9-29fa-4977-a3c6-784261b4d351', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDg5OTgzLCJleHAiOjE2ODc2ODk5ODN9.JM6FcTpXfGYu6XoZsI4nmEPxeZtvZi-yvi3cq3nhmdU', 0, '2023-06-18 12:06:23.452', '2023-06-18 12:06:23.452', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('c2d21633-3bc2-41bc-9bc3-5dc47bbb6c69', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MTAxMzk3LCJleHAiOjE2ODc3MDEzOTd9.4kor4syNmA8YcgPaQti1MoSXgbV1fszA-R60Pirbc-8', 0, '2023-06-18 15:16:37.161', '2023-06-18 17:19:14.549', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('c822d57d-c771-4c70-b9ab-deffdcd30d94', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNzQ1LCJleHAiOjE2ODc2OTE3NDV9.PgM4fc_7tq_griGMLM_1CZtcmDqKnP5OksljcgLduYk', 0, '2023-06-18 12:35:45.887', '2023-06-18 12:35:45.887', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('cedfe72b-e10c-4599-a910-1ced0b7b8859', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNjAzLCJleHAiOjE2ODc2OTE2MDN9.2qayCBhza5C6G4AXq16DMdtcZjqjtOnh6nnC0fnJo_o', 0, '2023-06-18 12:33:23.975', '2023-06-18 12:33:23.975', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('de3034a4-ca81-4894-b745-5a3070779e9e', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNDM1LCJleHAiOjE2ODc2OTE0MzV9.CCpi5jsVmtkd5RUCGBWKHAyTKXpftSXg_KW7YgfDhJU', 0, '2023-06-18 12:30:35.189', '2023-06-18 12:30:35.189', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('ded276db-a6a5-4152-875a-519984585b14', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXogR29uesOhbGV6IiwicGVybWlzc2lvbnMiOiIwIiwiaWF0IjoxNjg3MTY1OTU1LCJleHAiOjE2ODc3NjU5NTV9.cCAIRSaitWTHvCgOzLvJIqne-Sx79wb3UP3xPwIMlFs', 1, '2023-06-19 09:12:35.106', '2023-06-22 18:46:49.544', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('e5835db3-74bb-4265-9563-3e6522547401', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkxNDIwLCJleHAiOjE2ODc2OTE0MjB9.qvBDcIJDq-z4D86xoX_oFWogPjlq-aKRVTFXG2UDLR0', 0, '2023-06-18 12:30:20.918', '2023-06-18 12:30:20.918', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('e92c18f3-dffa-4231-877d-6ea5d17cbe14', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXoiLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNjg3MDkyNzc4LCJleHAiOjE2ODc2OTI3Nzh9.SJpC-_ZuGejfilpTdS9AeySuzE_SSmA6g7G-MG60FTM', 0, '2023-06-18 12:52:58.345', '2023-06-18 12:52:58.345', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('ea0b4add-57de-462b-bc5e-e9f0ca20e530', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXogR29uesOhbGV6IiwicGVybWlzc2lvbnMiOiIxIiwiaWF0IjoxNjg3MTY1OTMzLCJleHAiOjE2ODc3NjU5MzN9.CQMpTa4zuTWAgNrJMVhmeiHv-jcgBtNbIGE98KFwAMc', 0, '2023-06-19 09:12:13.965', '2023-06-19 09:12:13.965', '::1');
INSERT INTO `NT_UserSessionsUS` (`id`, `id_user`, `tokenid`, `active`, `init_session`, `last_change`, `ip`) VALUES ('eb1b4f6f-212b-490a-93ee-d773bc3c6f98', 'de2986a3-4d53-44d6-be41-8b5e116ee754', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZGUyOTg2YTMtNGQ1My00NGQ2LWJlNDEtOGI1ZTExNmVlNzU0IiwibmFtZSI6Ikpvc2UiLCJzdXJuYW1lIjoiSWLDocOxZXogR29uesOhbGV6IiwicGVybWlzc2lvbnMiOiIwIiwiaWF0IjoxNjg3MTY1MjM4LCJleHAiOjE2ODc3NjUyMzh9.8VTOdH4hKexdFYdNEZZ_ZZRapHo4VsI2lM8fNg6P7h0', 0, '2023-06-19 09:00:38.534', '2023-06-19 11:12:12.107', '::1');
COMMIT;

-- ----------------------------
-- Table structure for NT_UsersUSR
-- ----------------------------
DROP TABLE IF EXISTS `NT_UsersUSR`;
CREATE TABLE `NT_UsersUSR` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `surname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permissions` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `active` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `NT_UsersUSR_id_key` (`id`),
  UNIQUE KEY `NT_UsersUSR_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of NT_UsersUSR
-- ----------------------------
BEGIN;
INSERT INTO `NT_UsersUSR` (`id`, `email`, `name`, `surname`, `permissions`, `password`, `created_at`, `updated_at`, `deleted_at`, `active`) VALUES ('880f851d-c75b-4a0e-9a63-c752d064ba40', 'antoniotirado@inicie.es', 'Jose', 'Ibañez', NULL, '$2a$08$wi3HaiA5pheMTax7OJcBsuvAcWojYqbaK20vtzYY.ydcgkAe4GucS', '2023-06-19 08:55:52.011', '2023-06-19 08:55:52.011', NULL, 1);
INSERT INTO `NT_UsersUSR` (`id`, `email`, `name`, `surname`, `permissions`, `password`, `created_at`, `updated_at`, `deleted_at`, `active`) VALUES ('d663c4be-2108-4633-9937-35121dedb6e2', 'jose@witandbit.com', 'Jose', 'González', '1', NULL, '2023-06-18 15:55:49.333', '2023-06-19 08:57:11.365', '2023-06-19 08:57:11.364', 1);
INSERT INTO `NT_UsersUSR` (`id`, `email`, `name`, `surname`, `permissions`, `password`, `created_at`, `updated_at`, `deleted_at`, `active`) VALUES ('de2986a3-4d53-44d6-be41-8b5e116ee754', 'jatleti@gmail.com', 'Jose', 'Ibáñez González', '0', '$2a$08$wi3HaiA5pheMTax7OJcBsuvAcWojYqbaK20vtzYY.ydcgkAe4GucS', '2023-06-18 11:58:40.999', '2023-06-18 11:58:40.999', NULL, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
