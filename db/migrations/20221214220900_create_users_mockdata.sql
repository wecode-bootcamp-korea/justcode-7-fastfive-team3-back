-- migrate:up
#개발자
INSERT INTO users (nickname, password, email, sort_id, is_admin) VALUES ('test1', '$2a$10$jeoXq0XNYwgXNSbunDj7guYjfWPv3a.nmhE0DZUnm7g0.ujLWm6cG', 'test@test.com', '1', '1');
#입주자
INSERT INTO users (nickname, password, email, sort_id, is_admin) VALUES ('test2', '$2a$10$OLnWi1rpGfVKxCslzfesCO6P/U1m0SA7yox2/JGB9J8FS.fKynOve', 'test2@test.com', '3', '1');
INSERT INTO users (nickname, password, email, sort_id, is_admin) VALUES ('test3', '$2a$10$hy40sZukmjRTqJPEhpjooO6ls29za012Rww3GDBI3.4YV8E8YtN56', 'test3@test.com', '3', '1');
INSERT INTO users (nickname, password, email, sort_id, is_admin) VALUES ('test4', '$2a$10$VwBhASGZVMhuZW62CDMF.e83FrReExncHieU/IAu4OwE8pYzeaOOi', 'test4@test.com', '3', '1');
#퇴주자
INSERT INTO users (nickname, password, email, sort_id, is_admin) VALUES ('test5', '$2a$10$ZApIHIgXbG55/rSR1LzvIOhhFfG0q9MH5AuQ56BmaJcAHWFjW46xa', 'test5@test.com', '4', '1');
#일반가입자
INSERT INTO users (nickname, password, email, sort_id, is_admin) VALUES ('test6', '$2a$10$2jDU/BCfgQrmwCYgiZJW5.dIxPpnDrBo7j3J2XvRix.RQ5cES0BGW', 'test6@test.com', '2', '1');

-- migrate:down

