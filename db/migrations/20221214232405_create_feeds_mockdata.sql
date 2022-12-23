-- migrate:up

INSERT feeds
SET
    user_id = '2',
    category_id = '13',
    title = '둘레 에이아이',
    logo_img = 'https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8b2ZmaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    introduction = '로봇 인공지능 부분을 개발하고 있는 둘레 에이아이입니다. 2020년에 창립했으며 꾸준한 성장을 하고 있습니다.',
    website_url = 'https://delightful-gambler-8e8.notion.site/44f47ba6790f48ed982f1d9f8d69d90c',
    detail_introduction = 'Deep Learning 기술을 통해 산업용 로봇이 조금 더 스마트하게 일 할 수 있도록 만듭니다.
인공지능이 마침내 적용되어야 할 곳은 로봇이지만, 아직 세계적으로 이루어낸 곳이 없고 국내에서는 도전하고 있는 기업도 없습니다. 둘레 에이아이는 이 분야에 도전 중에 있습니다.
사람의 단순 반복적인 일은 둘레에이아이의 AI솔루션이 맡아서 하며, 이와 반대로 사람들은 복잡하면서도 가치있는 일을 할 수 있게 만들 것입니다.
엔지니어가 일하고 싶은 직장을 만들고, 하고 싶은 일을 할 수 있게 하는 회사를 만들고 있습니다.',
    member_benefit = '제휴사 물건 가격 5퍼센트 할인',
    contact = '010-1234-5678',
    use_branch_id = '1',
    status_id = '1';

INSERT INTO main_field
(field_name)
VALUES
    ('인공지능'),
    ('로봇AI');

INSERT INTO feeds_main_fields
(feeds_id, main_field_id)
VALUES
    (1, 1),
    (1, 2);

INSERT company_file
SET
    feed_id = '1',
    file_name = '둘레 에이아이 회사 소개서',
    file_link = 'https://fastfiveproject.s3.ap-northeast-2.amazonaws.com/%E1%84%83%E1%85%AE%E1%86%AF%E1%84%85%E1%85%A6+%E1%84%8B%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5.pdf';

INSERT feeds
SET
    user_id = '3',
    category_id = '14',
    title = '순양 개발',
    logo_img = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    introduction = '순양 개발은 순양 그룹에서 속한 자회사로 국내 1위를 향해 달려가는 기업입니다.',
    website_url = 'https://delightful-gambler-8e8.notion.site/4c61feb4d4504f9795ab306b75a61cf1',
    detail_introduction = 'IT성능관리·빅데이터·클라우드 전문 순양 개발입니다.
순양 개발은 대한민국 IT 인프라의 발전을 이끌고 있으며, 데이터베이스를 비롯한 시스템 전 구간 성능 관리에서 빅데이터, 클라우드에 이르기까지 폭넓은 기술력으로 대한민국을 대표하는 IT기업으로 성장할 것입니다.',
    member_benefit = '자사 제품 10퍼센트 할인',
    contact = '010-3456-5678',
    use_branch_id = '2',
    status_id = '1';

INSERT INTO main_field
(field_name)
VALUES
    ('빅데이터'),
    ('클라우드');

INSERT INTO feeds_main_fields
(feeds_id, main_field_id)
VALUES
    (2, 3),
    (2, 4);

INSERT company_file
SET
    feed_id = '2',
    file_name = '순양 개발 회사 소개서',
    file_link = 'https://fastfiveproject.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%AE%E1%86%AB%E1%84%8B%E1%85%A3%E1%86%BC+%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF.pdf';

INSERT feeds
SET
    user_id = '4',
    category_id = '15',
    title = '대영 솔루션',
    logo_img = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG9mZmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    introduction = '대영 솔루션은 대영 그룹에서 속한 자회사로 딥러닝, AI 전문회사입니다.',
    website_url = 'https://delightful-gambler-8e8.notion.site/4625e877941b4def85572897d6d96597',
    detail_introduction = '대영 솔루션은 현재 시리즈 A 투자 확정을 받았습니다.
현재 각 투자자 20억~50억원가량 씩 참여해 총 300억원 투자를 받았으며 벨류는 2300억원 이상입니다.
대영 솔루션은 영상합성 딥러닝 기반기술을 보유중이며, 음성합성 기술을 연구 중에 있습니다.
이러한 자금력과 기술력을 바탕으로 글로벌 시장에 도전하여 성공적인 비즈니스 모델을 만들어 최고의 유니콘 기업이 되려 합니다.',
    member_benefit = '자사 제휴 회사 제품 3퍼센트 할인',
    contact = '010-3456-6784',
    use_branch_id = '3',
    status_id = '1';

INSERT INTO main_field
(field_name)
VALUES
    ('딥러닝'),
    ('영상합성 딥러닝'),
    ('음성합성 딥러닝');

INSERT INTO feeds_main_fields
(feeds_id, main_field_id)
VALUES
    (3, 5),
    (3, 6),
    (3, 7);

INSERT company_file
SET
    feed_id = '3',
    file_name = '대영 솔루션 회사 소개서',
    file_link = 'https://fastfiveproject.s3.ap-northeast-2.amazonaws.com/%E1%84%83%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%BC+%E1%84%89%E1%85%A9%E1%86%AF%E1%84%85%E1%85%AE%E1%84%89%E1%85%A7%E1%86%AB.pdf';

INSERT feeds
SET
    user_id = '5',
    category_id = '16',
    title = 'QA의 모든 것',
    logo_img = 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTg5fHxvZmZpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    introduction = 'QA 테스트 엔지니어들을 파견해 주는 파견회사이며, 수준 급의 테스트 엔지니어들이 계약되어있습니다.',
    website_url = 'https://delightful-gambler-8e8.notion.site/QA-0c389ebc262942e38cae133e96f685bf',
    detail_introduction = 'QA 테스트 엔지니어들을 파견해 주는 파견회사이며, 수준 급의 테스트 엔지니어들이 계약되어있습니다.
최근 늘어나는 IT기업들을 대상으로 계약을 진행하고 있으며, 점차 파견 회사가 늘어갈 것이라고 자신합니다. 자세한 사항은 홈페이지를 참조해주시면 감사하겠습니다.',
    member_benefit = '엔지니어 파견 시 재계약 우선권을 드립니다.',
    contact = '010-3456-6564',
    use_branch_id = '4',
    status_id = '1';


INSERT INTO main_field
(field_name)
VALUES
    ('QA 엔지니어'),
    ('테스트 엔지니어');

INSERT INTO feeds_main_fields
(feeds_id, main_field_id)
VALUES
    (4, 8),
    (4, 9);

INSERT company_file
SET
    feed_id = '4',
    file_name = 'QA의 모든 것의 회사 소개서',
    file_link = 'https://fastfiveproject.s3.ap-northeast-2.amazonaws.com/QA%E1%84%8B%E1%85%B4+%E1%84%86%E1%85%A9%E1%84%83%E1%85%B3%E1%86%AB+%E1%84%80%E1%85%A5%E1%86%BA.pdf';

INSERT feeds
SET
    user_id = '6',
    category_id = '17',
    title = 'DG & TY',
    logo_img = 'https://images.unsplash.com/photo-1497366616365-e78dd380d3dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTM4fHxvZmZpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    introduction = 'DG & TY는 설립 이후로 IT/서버 관련 산업에 주력하며 지속적인 도약을 거듭해온 IT 토탈 솔루션 기업 입니다.',
    website_url = 'https://delightful-gambler-8e8.notion.site/DG-TY-981d014e723d4b0892f36b79348aae77',
    detail_introduction = 'DG & TY는 설립 이후로 IT/서버 관련 산업에 주력하며 지속적인 도약을 거듭해온 IT 토탈 솔루션 기업 입니다.
주요 고객사는 클라우드/클러스터 등을 구축하려고 하는 기업 (IT, IT 통신, 제조, 일반 등)과 연구소/대학교, 그 외에도 방송 분야에서도 다양한 목적의 서버 및 솔루션을 제공하고 있습니다.',
    member_benefit = '서버 솔루션 계약 진행 시 계약금 일부 할인 혜택 드립니다.',
    contact = '010-3346-6564',
    use_branch_id = '1',
    status_id = '1';


INSERT INTO main_field
(field_name)
VALUES
    ('시스템 엔지니어');

INSERT INTO feeds_main_fields
(feeds_id, main_field_id)
VALUES
    (5, 10);

INSERT company_file
SET
    feed_id = '5',
    file_name = 'DG & TY의 회사 소개서',
    file_link = 'https://fastfiveproject.s3.ap-northeast-2.amazonaws.com/DG+%26+TY.pdf';

INSERT feeds
SET
    user_id = '7',
    category_id = '18',
    title = 'SHIELD',
    logo_img = 'https://images.unsplash.com/photo-1507904953637-96429a46671a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTk0fHxvZmZpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    introduction = 'IT 모니터링 서비스 기업인 SHIELD는 데이터 기반의 분석 서비스를 제공하고 있는 SaaS 서비스 기업입니다.',
    website_url = 'https://delightful-gambler-8e8.notion.site/SHIELD-e58059f0c35648c288ac9d6ba17186e1',
    detail_introduction = 'SHIELD는 다수의 벤처 투자사으로부터 80억 이상의 누적투자를 받았으며 ‘아기 유니콘’기업으로 선정되었습니다. 2022년 손익 분기점을 통과하였으며 매출은 1.2배 성장하였습니다. 앞으로 꾸준히 성장하는 회사입니다.',
    member_benefit = '데이터 분석을 원하면 연락주시면 무료 상담해드립니다!',
    contact = '010-3346-6464',
    use_branch_id = '2',
    status_id = '1';


INSERT INTO main_field
(field_name)
VALUES
    ('보안 엔지니어'),
    ('정보보안 담당자'),
    ('SaaS');

INSERT INTO feeds_main_fields
(feeds_id, main_field_id)
VALUES
    (6, 11),
    (6, 12),
    (6, 13);

INSERT company_file
SET
    feed_id = '6',
    file_name = 'SHIELD의 회사 소개서',
    file_link = 'https://fastfiveproject.s3.ap-northeast-2.amazonaws.com/SHIELD.pdf';

INSERT feeds
SET
    user_id = '8',
    category_id = '13',
    title = '세탁 상태',
    logo_img = 'https://images.unsplash.com/photo-1582641547274-2770615179ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjkzfHxvZmZpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    introduction = '코인 세탁기 시설을 운영하고 있으며, 어플을 통해 자신과 가까운 지역의 코인 세탁소를 확인할 수 있으며, 세탁기 남은 시간을 확인할 수 있습니다.',
    website_url = 'https://delightful-gambler-8e8.notion.site/02a0614c124f4b36a720f9021d3ee2f6',
    detail_introduction = '코인 세탁기 시설을 운영하고 있으며, 어플을 통해 자신과 가까운 지역의 코인 세탁소를 확인할 수 있으며, 세탁기 남은 시간을 확인할 수 있습니다. 코로나의 위기를 잘 극복하고 꾸준히 성장하고 있으며,
사용자들의 편의성을 위해 열심히 노력하고 있습니다. 이에 많은 투자사의 투자를 받아 비즈니스 모델을 인정 받고 있습니다.',
    member_benefit = '코인 세탁 무료로 할 수 있는 쿠폰을 드립니다!',
    contact = '010-3346-6464',
    use_branch_id = '3',
    status_id = '1';


INSERT INTO main_field
(field_name)
VALUES
    ('딥러닝'),
    ('머신러닝 엔지니어'),
    ('코인세탁');

INSERT INTO feeds_main_fields
(feeds_id, main_field_id)
VALUES
    (7, 5),
    (7, 14),
    (7, 15);

INSERT company_file
SET
    feed_id = '7',
    file_name = '세탁 상태',
    file_link = 'https://fastfiveproject.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%A6%E1%84%90%E1%85%A1%E1%86%A8+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%90%E1%85%A2.pdf';

INSERT feeds
SET
    user_id = '9',
    category_id = '18',
    title = '트러스트인',
    logo_img = 'https://images.unsplash.com/photo-1558788833-5189550e2f16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzYzfHxvZmZpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    introduction = '트러스트인은 헬스케어산업에 특화된 Total Healthcare 솔루션구축 및 운영 전문기업입니다.',
    website_url = 'https://delightful-gambler-8e8.notion.site/535bf10011084d889b89d48d642183ee',
    detail_introduction = '트러스트인은 헬스케어산업에 특화된 Total Healthcare 솔루션구축 및 운영 전문기업입니다.
IT Outsourcing 서비스, Smart Factory 솔루션, 그룹웨어 솔루션 공급 등 주요사업을 운영하고 있으며, 신 사업과 대외적 사업을 확장 중에 있습니다.
최적의 상품과 서비스를 제공하는 전략적 파트너로서 고객과의 동반 성장을 지향하고 있습니다.',
    member_benefit = '무료 상담 및 견적을 내 드립니다.',
    contact = '010-8888-8888',
    use_branch_id = '4',
    status_id = '1';


INSERT INTO main_field
(field_name)
VALUES
    ('헬스케어'),
    ('IT Outsourcing'),
    ('Smart Factory 솔루션'),
    ('그룹웨어 솔루션');

INSERT INTO feeds_main_fields
(feeds_id, main_field_id)
VALUES
    (8, 16),
    (8, 17),
    (8, 18),
    (8, 19);

INSERT company_file
SET
    feed_id = '8',
    file_name = '트러스트인',
    file_link = 'https://fastfiveproject.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%B3%E1%84%85%E1%85%A5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.pdf';

-- migrate:down

