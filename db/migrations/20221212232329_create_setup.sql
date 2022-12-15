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

# TODO 카테고리 소개글, img_url 제대로 넣기
insert into category (id, category, introduction, category_img_url) values ('1', 'IT', '이것은 IT 카테고리입니다.', 'http://dummyimage.com/925x443.png/ff4444/ffffff');
insert into category (id, category, introduction, category_img_url) values ('2', '광고, 마케팅', '이것은 광고, 마케팅입니다.', 'http://dummyimage.com/623x504.png/dddddd/000000');
insert into category (id, category, introduction, category_img_url) values ('3', '콘텐츠', '이것은 콘텐츠 입니다.', 'http://dummyimage.com/608x598.png/5fa2dd/ffffff');
insert into category (id, category, introduction, category_img_url) values ('4', '개발', '이것은 개발입니다.','http://dummyimage.com/269x518.png/5fa2dd/ffffff');
insert into category (id, category, introduction, category_img_url) values ('5', '디자인', '이것은 디자인입니다.','http://dummyimage.com/1562x1009.png/ff4444/ffffff');
insert into category (id, category, introduction, category_img_url) values ('6', '기획, 컨설팅', '이건 기획이랑 컨설팅이에요','http://dummyimage.com/1809x493.png/cc0000/ffffff');
insert into category (id, category, introduction, category_img_url) values ('7', '법률', '법률이라면 이쪽으로','http://dummyimage.com/484x268.png/ff4444/ffffff');
insert into category (id, category, introduction, category_img_url) values ('8', '세무, 회계', '세금이 문제입니까?!','http://dummyimage.com/984x928.png/dddddd/000000');
insert into category (id, category, introduction, category_img_url) values ('9', '교육', '교육계통 환영해요','http://dummyimage.com/417x1054.png/5fa2dd/ffffff');
insert into category (id, category, introduction, category_img_url) values ('10', '금융', '돈! 돈! 돈!','http://dummyimage.com/778x111.png/dddddd/000000');
insert into category (id, category, introduction, category_img_url) values ('11', '온라인', '온라인의 모든것!!','http://dummyimage.com/698x369.png/5fa2dd/ffffff');
insert into category (id, category, introduction, category_img_url) values ('12', '기타', '잘 모르겠다구요?!','http://dummyimage.com/343x956.png/5fa2dd/ffffff');


insert into category (parent_category_id, category) values ('1', '인공지능(AI)');
insert into category (parent_category_id, category) values ('1', '데이터분석가');
insert into category (parent_category_id, category) values ('1', '딥러닝');
insert into category (parent_category_id, category) values ('1', 'QA');
insert into category (parent_category_id, category) values ('1', '시스템 엔지니어');
insert into category (parent_category_id, category) values ('1', '정보보안');

insert into category (parent_category_id, category) values ('2', '마케터');
insert into category (parent_category_id, category) values ('2', '디지털 마케터');
insert into category (parent_category_id, category) values ('2', '퍼포먼스 마케터');
insert into category (parent_category_id, category) values ('2', '광고 기획자(AE)');
insert into category (parent_category_id, category) values ('2', '마켓 리서처');

insert into category (parent_category_id, category) values ('3', '콘텐츠 크리에이터');
insert into category (parent_category_id, category) values ('3', '영상 편집가');
insert into category (parent_category_id, category) values ('3', 'PD');
insert into category (parent_category_id, category) values ('3', '에디터');
insert into category (parent_category_id, category) values ('3', '연예-엔터테인먼트');
insert into category (parent_category_id, category) values ('3', '통번역');
insert into category (parent_category_id, category) values ('3', '작가');

insert into category (parent_category_id, category) values ('4', '웹개발자');
insert into category (parent_category_id, category) values ('4', '서버 개발자');
insert into category (parent_category_id, category) values ('4', '안드로이드 개발자');
insert into category (parent_category_id, category) values ('4', 'IOS 개발자');
insert into category (parent_category_id, category) values ('4', '게임 개발자');

insert into category (parent_category_id, category) values ('5', 'UX 디자이너');
insert into category (parent_category_id, category) values ('5', '웹 디자이너');
insert into category (parent_category_id, category) values ('5', '그래픽 디자이너');
insert into category (parent_category_id, category) values ('5', '모바일 디자이너');
insert into category (parent_category_id, category) values ('5', '제품 디자이너');

insert into category (parent_category_id, category) values ('6', '서비스 기획자');
insert into category (parent_category_id, category) values ('6', '사업개발 기획자');
insert into category (parent_category_id, category) values ('6', '전략 기획자');
insert into category (parent_category_id, category) values ('6', '컨설턴트');
insert into category (parent_category_id, category) values ('6', '상품기획자');
insert into category (parent_category_id, category) values ('6', '세미나/포럼');

insert into category (parent_category_id, category) values ('7', '변호사');
insert into category (parent_category_id, category) values ('7', '변리사');
insert into category (parent_category_id, category) values ('7', '수사관');
insert into category (parent_category_id, category) values ('7', '법무관');
insert into category (parent_category_id, category) values ('7', '법무사');
insert into category (parent_category_id, category) values ('7', '법무사');

insert into category (parent_category_id, category) values ('8', '공인회계사');
insert into category (parent_category_id, category) values ('8', '세무사');

insert into category (parent_category_id, category) values ('9', '교재-교육기획');
insert into category (parent_category_id, category) values ('9', '유아교육');
insert into category (parent_category_id, category) values ('9', '전문강사');

insert into category (parent_category_id, category) values ('10', '투자-증권');
insert into category (parent_category_id, category) values ('10', '애널리스트');
insert into category (parent_category_id, category) values ('10', '자산관리사');
insert into category (parent_category_id, category) values ('10', '감정평가사');


-- migrate:down

