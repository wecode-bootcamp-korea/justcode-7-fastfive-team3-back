-- migrate:up
insert into user_group (sort) values ('admin');
insert into user_group (sort) values ('normal member');
insert into user_group (sort) values ('resident member');
insert into user_group (sort) values ('exit member');

insert into feed_status (status) values ('open');
insert into feed_status (status) values ('close');


insert into branch (branch_name) values ('강남1호점');
insert into branch (branch_name) values ('강남2호점');
insert into branch (branch_name) values ('강남3호점');
insert into branch (branch_name) values ('강남4호점');
insert into branch (branch_name) values ('강남5호점');
insert into branch (branch_name) values ('광화문점');
insert into branch (branch_name) values ('교대점');
insert into branch (branch_name) values ('구로1호점');
insert into branch (branch_name) values ('명동1호점');
insert into branch (branch_name) values ('삼성1호점');
insert into branch (branch_name) values ('삼성2호점');
insert into branch (branch_name) values ('삼성3호점');
insert into branch (branch_name) values ('삼성4호점');
insert into branch (branch_name) values ('서울숲점');
insert into branch (branch_name) values ('서초점');
insert into branch (branch_name) values ('선릉1호점');
insert into branch (branch_name) values ('선릉2호점');
insert into branch (branch_name) values ('선정릉점');
insert into branch (branch_name) values ('성수점');
insert into branch (branch_name) values ('시청1호점');
insert into branch (branch_name) values ('시청2호점');
insert into branch (branch_name) values ('신논현1호점');
insert into branch (branch_name) values ('신사점');
insert into branch (branch_name) values ('여의도점');
insert into branch (branch_name) values ('역삼1호점');
insert into branch (branch_name) values ('역삼2호점');
insert into branch (branch_name) values ('역삼3호점');
insert into branch (branch_name) values ('역삼4호점');
insert into branch (branch_name) values ('영등포점');
insert into branch (branch_name) values ('용산1호점');
insert into branch (branch_name) values ('을지로점');
insert into branch (branch_name) values ('합정점');
insert into branch (branch_name) values ('홍대1호점');
insert into branch (branch_name) values ('홍대2호점');

insert into location (location) values ('강남∙신논현');
insert into location (location) values ('교대∙서초');
insert into location (location) values ('삼성');
insert into location (location) values ('서울숲∙성수');
insert into location (location) values ('시청∙을지로∙광화문');
insert into location (location) values ('신사');
insert into location (location) values ('여의도∙구로');
insert into location (location) values ('역삼∙선릉');
insert into location (location) values ('용산∙한남');
insert into location (location) values ('홍대∙합정');

insert into branch_location (location_id, branch_id) values ('1', '1');
insert into branch_location (location_id, branch_id) values ('1', '2');
insert into branch_location (location_id, branch_id) values ('1', '3');
insert into branch_location (location_id, branch_id) values ('1', '4');
insert into branch_location (location_id, branch_id) values ('1', '5');
insert into branch_location (location_id, branch_id) values ('5', '6');
insert into branch_location (location_id, branch_id) values ('2', '7');
insert into branch_location (location_id, branch_id) values ('7', '8');
insert into branch_location (location_id, branch_id) values ('5', '9');
insert into branch_location (location_id, branch_id) values ('3', '10');
insert into branch_location (location_id, branch_id) values ('3', '11');
insert into branch_location (location_id, branch_id) values ('3', '12');
insert into branch_location (location_id, branch_id) values ('3', '13');
insert into branch_location (location_id, branch_id) values ('4', '14');
insert into branch_location (location_id, branch_id) values ('2', '15');
insert into branch_location (location_id, branch_id) values ('8', '16');
insert into branch_location (location_id, branch_id) values ('8', '17');
insert into branch_location (location_id, branch_id) values ('8', '18');
insert into branch_location (location_id, branch_id) values ('4', '19');
insert into branch_location (location_id, branch_id) values ('5', '20');
insert into branch_location (location_id, branch_id) values ('5', '21');
insert into branch_location (location_id, branch_id) values ('1', '22');
insert into branch_location (location_id, branch_id) values ('6', '23');
insert into branch_location (location_id, branch_id) values ('7', '24');
insert into branch_location (location_id, branch_id) values ('8', '25');
insert into branch_location (location_id, branch_id) values ('8', '26');
insert into branch_location (location_id, branch_id) values ('8', '27');
insert into branch_location (location_id, branch_id) values ('8', '28');
insert into branch_location (location_id, branch_id) values ('9', '29');
insert into branch_location (location_id, branch_id) values ('9', '30');
insert into branch_location (location_id, branch_id) values ('5', '31');
insert into branch_location (location_id, branch_id) values ('10', '32');
insert into branch_location (location_id, branch_id) values ('10', '33');
insert into branch_location (location_id, branch_id) values ('10', '34');

-- migrate:down

