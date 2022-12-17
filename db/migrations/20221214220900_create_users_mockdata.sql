-- migrate:up

# 닉네임이 곧 패스워드입니다. API 테스트시 사용하시면 됩니다.
#개발자
INSERT INTO users (nickname, password, email, position_name, group_id, is_admin, company_name) VALUES ('admin1', '$2a$10$vQO3CQlKE5Bto7G1/nDvYurjnuiNBq3TXDrba54fr9iYhe.6Ej0K6', 'admin1@admin.com', '팀장', '1', '1', 'justcode');
#입주자
INSERT INTO users (nickname, password, email, position_name, group_id, is_admin, company_name) VALUES ('member1', '$2a$10$0rczKmnyiMChg5Kpm3y3y.fBrE2g4Fz8rEiRK4EgC3DBvQcvg98xG', 'member1@test.com', '대표','3', '1', 'google');
INSERT INTO users (nickname, password, email, position_name, group_id, is_admin, company_name) VALUES ('member2', '$2a$10$7yp6C9VP2eMmHxryce1CIeTtpMrn4OGgCdsTx1bUlIfxSytU6ywlO', 'member2@test.com', '과장', '3', '1','amazon');
INSERT INTO users (nickname, password, email, position_name, group_id, is_admin, company_name) VALUES ('member3', '$2a$10$w0aaQhzk8OPE9udI5nWTmumQ5gqVNids6vEdKeTkos50jpA7T5MD2', 'member3@test.com', '대리','3', '1', 'apple');
INSERT INTO users (nickname, password, email, position_name, group_id, is_admin, company_name) VALUES ('member4', '$2a$10$HnYarW5RUCdMRQJzb.bWguMwL9G9yR5kUc82jifCEQhZZSl/5Fk4K', 'member4@test.com', '주임', '3', '1', 'samsung');
#퇴주자
INSERT INTO users (nickname, password, email, position_name, group_id, is_admin, company_name) VALUES ('member6exit', '$2a$10$BIFBNVZ2p2Zk0wL1ueQEBu7wGvtfVYfK5DLkEyXPBHFm6iOaoFMPG', 'member6@test.com', '사원','4', '1', 'lg');

#입주예정자
INSERT INTO users (nickname, password, email, position_name, group_id, is_admin, company_name) VALUES ('reservation1', '$2a$10$DWZwICvLDyeareRSbspZxurgiUydNxXAZ4eKueHUofWnFM6xKidve', 'reservation1@test.com', '대표', '3', '1', 'lg');

#일반가입자
INSERT INTO users (nickname, password, email, position_name, group_id, is_admin, company_name) VALUES ('normal1', '$2a$10$HSnJV56pEEaT8C7hniwL/eb5j7vKtrjEyOghXJS2fMA0LHbRBOOU.', 'normal1@test.com', '대표', '2', '1', 'lg');
-- migrate:down

