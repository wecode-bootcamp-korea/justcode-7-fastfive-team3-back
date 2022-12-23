-- migrate:up

#입주 기업
INSERT INTO user_group (company_name, start_date, end_date) VALUES ('justcode', '1900-01-01', '2100-12-31');
INSERT INTO user_group (company_name, start_date, end_date) VALUES ('둘레 에이아이', '1900-01-01', '2100-12-31');
INSERT INTO user_group (company_name, start_date, end_date) VALUES ('순양 개발', '2022-01-01', '2023-12-31');
INSERT INTO user_group (company_name, start_date, end_date) VALUES ('대영 솔루션', '2022-01-01', '2023-12-31');
INSERT INTO user_group (company_name, start_date, end_date) VALUES ('QA의 모든 것', '2022-01-01', '2023-12-31');
INSERT INTO user_group (company_name, start_date, end_date) VALUES ('DG & TY', '2022-12-23', '2023-12-31');
INSERT INTO user_group (company_name, start_date, end_date) VALUES ('SHIELD', '2021-01-01', '2023-12-31');
#입주예정 기업
INSERT INTO user_group (company_name, start_date, end_date) VALUES ('세탁 상태', '2022-03-01', '2023-12-31');
#퇴주 기업
INSERT INTO user_group (company_name, start_date, end_date) VALUES ('트러스트인', '2022-01-01', '2021-12-31');
#일반가입 기업
INSERT INTO user_group (company_name) VALUES ('VScode');

# 닉네임이 곧 패스워드입니다. API 테스트시 사용하시면 됩니다.
#개발자
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('admin1', '$2a$10$vQO3CQlKE5Bto7G1/nDvYurjnuiNBq3TXDrba54fr9iYhe.6Ej0K6', 'admin1@admin.com', '팀장', TRUE, 1);
#입주자
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('member1', '$2a$10$0rczKmnyiMChg5Kpm3y3y.fBrE2g4Fz8rEiRK4EgC3DBvQcvg98xG', 'member1@test.com', '대표',TRUE, 2);
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('member2', '$2a$10$7yp6C9VP2eMmHxryce1CIeTtpMrn4OGgCdsTx1bUlIfxSytU6ywlO', 'member2@test.com', '과장', TRUE,3);
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('member3', '$2a$10$w0aaQhzk8OPE9udI5nWTmumQ5gqVNids6vEdKeTkos50jpA7T5MD2', 'member3@test.com', '대리', FALSE, 3);
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('member4', '$2a$10$HnYarW5RUCdMRQJzb.bWguMwL9G9yR5kUc82jifCEQhZZSl/5Fk4K', 'member4@test.com', '주임', TRUE, 4);
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('member5', '$2a$10$HnYarW5RUCdMRQJzb.bWguMwL9G9yR5kUc82jifCEQhZZSl/5Fk4K', 'member5@test.com', '사원', TRUE, 5);
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('member6', '$2a$10$lFhp6q4c0XKKN2cwR4E04OOeaV3uiFhK7V3WFO8kuPWzn.LbVOtXu', 'member6@test.com', '과장', TRUE, 6);
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('member7', '$2a$10$eVDJVpLgotjdGb/ETCQjFeSV5R4g9.b/LpziylGixAmcpI0e9Zo8q', 'member7@test.com', '차장', TRUE, 7);
#입주예정자
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('reservation1', '$2a$10$DWZwICvLDyeareRSbspZxurgiUydNxXAZ4eKueHUofWnFM6xKidve', 'reservation1@test.com', '대표', TRUE,8);
#퇴주자
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('member6exit', '$2a$10$BIFBNVZ2p2Zk0wL1ueQEBu7wGvtfVYfK5DLkEyXPBHFm6iOaoFMPG', 'member6exit@test.com', '사원',TRUE, 9);
#일반가입자
INSERT INTO users (nickname, password, email, position_name, is_admin, group_id) VALUES ('normal1', '$2a$10$HSnJV56pEEaT8C7hniwL/eb5j7vKtrjEyOghXJS2fMA0LHbRBOOU.', 'normal1@test.com', '대표', TRUE, 10);


-- migrate:down

