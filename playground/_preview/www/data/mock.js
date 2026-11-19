/* 파일을 바로 열 때(file://) 쓰는 데이터 사본 — 원본은 같은 폴더의 화면ID.json (tools/build.py 생성) */
window.CESCO_MOCK = {
 "MOW-CM-000101": {
  "request": {
   "login_id": "minjun.kim",
   "password": "••••••••",
   "remember_id": true
  },
  "response": {
   "access_token": "eyJhbGciOi…(생략)",
   "expires_at": "2026-11-18T18:00:00+09:00",
   "user": {
    "id": "u-0101",
    "name": "김민준",
    "role": "SC",
    "branch": "강남지사",
    "team": "영업2팀",
    "home_screen": "MOW-SC-010101"
   }
  },
  "errors": [
   {
    "code": "invalid_credentials",
    "message": "계정 또는 비밀번호가 맞지 않아요"
   },
   {
    "code": "session_expired",
    "message": "오래 사용하지 않아 로그아웃됐어요. 다시 로그인해 주세요"
   }
  ]
 },
 "MOW-CM-010101": {
  "date": "2026-11-11",
  "week": [
   {
    "date": "2026-11-08",
    "has_visit": false,
    "is_holiday": true
   },
   {
    "date": "2026-11-09",
    "has_visit": true,
    "is_holiday": false
   },
   {
    "date": "2026-11-10",
    "has_visit": true,
    "is_holiday": false
   },
   {
    "date": "2026-11-11",
    "has_visit": true,
    "is_holiday": false
   },
   {
    "date": "2026-11-12",
    "has_visit": true,
    "is_holiday": false
   },
   {
    "date": "2026-11-13",
    "has_visit": true,
    "is_holiday": false
   },
   {
    "date": "2026-11-14",
    "has_visit": false,
    "is_holiday": true
   }
  ],
  "visits": [
   {
    "id": "v-3201",
    "start_at": "2026-11-11T09:00:00+09:00",
    "service_type": "정기 방제",
    "status": "done",
    "customer_name": "한빛식당 강남점",
    "assignee_name": "이서준",
    "assignee_role": "DE",
    "address_short": "강남구 테헤란로"
   },
   {
    "id": "v-3202",
    "start_at": "2026-11-11T10:30:00+09:00",
    "service_type": "정기 방제",
    "status": "doing",
    "customer_name": "그린마트 역삼점",
    "assignee_name": "이서준",
    "assignee_role": "DE",
    "address_short": "강남구 역삼동"
   },
   {
    "id": "v-3203",
    "start_at": "2026-11-11T14:00:00+09:00",
    "service_type": "위생 진단",
    "status": "wait",
    "customer_name": "마루베이커리",
    "assignee_name": "김민준",
    "assignee_role": "SC",
    "address_short": "서초구 서초동"
   },
   {
    "id": "v-3204",
    "start_at": "2026-11-11T15:30:00+09:00",
    "service_type": "트랩 점검",
    "status": "wait",
    "customer_name": "서울푸드 본사",
    "assignee_name": "한결설비",
    "assignee_role": "PT",
    "address_short": "성남시 분당구"
   },
   {
    "id": "v-3205",
    "start_at": "2026-11-11T17:00:00+09:00",
    "service_type": "공기질 관리",
    "status": "error",
    "customer_name": "청솔어린이집",
    "assignee_name": "이서준",
    "assignee_role": "DE",
    "address_short": "강남구 대치동"
   }
  ]
 },
 "MOW-CM-020101": {
  "as_of": "2026-11-18T10:00:00+09:00",
  "notifications": [
   {
    "id": "n-2001",
    "type": "schedule",
    "category": "schedule",
    "title": "방문 시간이 바뀌었어요",
    "body": "그린마트 역삼점 15:30 → 16:30",
    "created_at": "2026-11-18T09:50:00+09:00",
    "read_at": null,
    "target_screen": "MOW-CM-010101"
   },
   {
    "id": "n-2002",
    "type": "task",
    "category": "work",
    "title": "마감이 지난 할 일이 있어요",
    "body": "청솔어린이집 체감효과 입력",
    "created_at": "2026-11-18T09:00:00+09:00",
    "read_at": null,
    "target_screen": "MOW-CM-030101"
   },
   {
    "id": "n-2003",
    "type": "contract",
    "category": "work",
    "title": "계약이 승인됐어요",
    "body": "한빛식당 강남점 정기 방제 · 월 2회",
    "created_at": "2026-11-18T09:31:00+09:00",
    "read_at": "2026-11-18T09:35:00+09:00",
    "target_screen": null
   },
   {
    "id": "n-2004",
    "type": "notice",
    "category": "notice",
    "title": "[공지] 11월 안전 교육 일정",
    "body": "11월 25일(화) 14시 · 강남지사 3층 교육장",
    "created_at": "2026-11-17T17:20:00+09:00",
    "read_at": "2026-11-17T18:02:00+09:00",
    "target_screen": null
   },
   {
    "id": "n-2005",
    "type": "feedback",
    "category": "work",
    "title": "고객이 체감효과를 남겼어요",
    "body": "마루베이커리 · 해충 발생 감소",
    "created_at": "2026-11-17T11:05:00+09:00",
    "read_at": "2026-11-17T12:40:00+09:00",
    "target_screen": null
   },
   {
    "id": "n-2006",
    "type": "security",
    "category": "notice",
    "title": "새 기기에서 로그인했어요",
    "body": "본인이 아니라면 비밀번호를 바꿔 주세요",
    "created_at": "2026-11-16T20:14:00+09:00",
    "read_at": "2026-11-16T20:30:00+09:00",
    "target_screen": null
   },
   {
    "id": "n-2007",
    "type": "app",
    "category": "notice",
    "title": "앱이 업데이트됐어요",
    "body": "1.0.0 · 주요 서비스 순서를 바꿀 수 있어요",
    "created_at": "2026-11-16T09:00:00+09:00",
    "read_at": "2026-11-16T09:10:00+09:00",
    "target_screen": null
   }
  ]
 },
 "MOW-CM-030101": {
  "as_of": "2026-11-18T10:00:00+09:00",
  "tasks": [
   {
    "id": "t-1001",
    "title": "체감효과 입력",
    "customer_name": "청솔어린이집",
    "memo": "공기질 관리",
    "due_at": "2026-11-17T18:00:00+09:00",
    "done_at": null,
    "target_screen": null
   },
   {
    "id": "t-1002",
    "title": "견적서 발송",
    "customer_name": "서울푸드 본사",
    "memo": "트랩 점검 추가",
    "due_at": "2026-11-18T13:00:00+09:00",
    "done_at": null,
    "target_screen": null
   },
   {
    "id": "t-1003",
    "title": "재계약 일정 통화",
    "customer_name": "그린마트 역삼점",
    "memo": "담당 박지은 점장",
    "due_at": "2026-11-18T15:00:00+09:00",
    "done_at": null,
    "target_screen": null
   },
   {
    "id": "t-1004",
    "title": "방문 보고 작성",
    "customer_name": "마루베이커리",
    "memo": "위생 진단",
    "due_at": "2026-11-18T18:00:00+09:00",
    "done_at": null,
    "target_screen": null
   },
   {
    "id": "t-1005",
    "title": "정기 방제 계약 등록",
    "customer_name": "한빛식당 강남점",
    "memo": null,
    "due_at": "2026-11-18T12:00:00+09:00",
    "done_at": "2026-11-18T09:12:00+09:00",
    "target_screen": null
   },
   {
    "id": "t-1006",
    "title": "방문 일정 확인 문자",
    "customer_name": "마루베이커리",
    "memo": null,
    "due_at": "2026-11-18T11:00:00+09:00",
    "done_at": "2026-11-18T08:40:00+09:00",
    "target_screen": null
   }
  ]
 },
 "MOW-DE-010101": {
  "as_of": "2026-11-18T12:10:00+09:00",
  "user": {
   "name": "이서준",
   "role": "DE"
  },
  "visits_today": [
   {
    "id": "v-3101",
    "customer_name": "한빛식당",
    "start_at": "2026-11-18T09:00:00+09:00",
    "end_at": "2026-11-18T10:00:00+09:00",
    "status": "done",
    "moved_from": null
   },
   {
    "id": "v-3102",
    "customer_name": "그린마트",
    "start_at": "2026-11-18T10:30:00+09:00",
    "end_at": "2026-11-18T11:30:00+09:00",
    "status": "done",
    "moved_from": null
   },
   {
    "id": "v-3103",
    "customer_name": "마루베이커리",
    "start_at": "2026-11-18T14:00:00+09:00",
    "end_at": "2026-11-18T15:00:00+09:00",
    "status": "next",
    "moved_from": null
   },
   {
    "id": "v-3104",
    "customer_name": "청솔",
    "start_at": "2026-11-18T17:00:00+09:00",
    "end_at": "2026-11-18T18:00:00+09:00",
    "status": "later",
    "moved_from": "2026-11-18T16:00:00+09:00"
   }
  ],
  "next_visit": {
   "visit_id": "v-3103",
   "customer_name": "마루베이커리",
   "start_at": "2026-11-18T14:00:00+09:00",
   "service_type": "위생 진단",
   "address_short": "서울 서초구 서초동",
   "trap_count": 6,
   "phone": "02-000-0000",
   "lat": 37.4919,
   "lng": 127.0076
  },
  "work_week": {
   "worked_hours": 28,
   "target_hours": 40,
   "visible": true
  },
  "notices": [
   {
    "id": "n-2101",
    "title": "청솔어린이집 방문 시간 변경",
    "body": "16:00 → 17:00",
    "created_at": "2026-11-18T12:00:00+09:00",
    "target_screen": "MOW-CM-010101"
   },
   {
    "id": "n-2004",
    "title": "[공지] 11월 안전 교육 일정",
    "body": "11월 25일(화) 14시",
    "created_at": "2026-11-17T17:20:00+09:00",
    "target_screen": null
   },
   {
    "id": "n-2102",
    "title": "약제 재고 부족",
    "body": "살충제 A형 2병 남음",
    "created_at": "2026-11-16T15:00:00+09:00",
    "target_screen": null
   }
  ]
 },
 "MOW-SC-010101": {
  "as_of": "2026-11-16T12:10:00+09:00",
  "user": {
   "name": "김민준",
   "role": "SC"
  },
  "visits_today": [
   {
    "id": "v-3001",
    "customer_name": "한빛식당",
    "start_at": "2026-11-16T09:00:00+09:00",
    "end_at": "2026-11-16T10:00:00+09:00",
    "status": "done",
    "moved_from": null
   },
   {
    "id": "v-3002",
    "customer_name": "마루베이커리",
    "start_at": "2026-11-16T14:00:00+09:00",
    "end_at": "2026-11-16T15:00:00+09:00",
    "status": "next",
    "moved_from": null
   },
   {
    "id": "v-3003",
    "customer_name": "그린마트",
    "start_at": "2026-11-16T16:30:00+09:00",
    "end_at": "2026-11-16T17:30:00+09:00",
    "status": "later",
    "moved_from": "2026-11-16T15:30:00+09:00"
   }
  ],
  "next_visit": {
   "visit_id": "v-3002",
   "customer_name": "마루베이커리",
   "start_at": "2026-11-16T14:00:00+09:00",
   "service_type": "위생 진단",
   "address_short": "서울 서초구 서초동",
   "last_visit_at": "2026-10-14",
   "phone": "02-000-0000",
   "lat": 37.4919,
   "lng": 127.0076
  },
  "work_week": {
   "worked_hours": 32,
   "target_hours": 40,
   "visible": true
  },
  "contract_month": {
   "amount": 12400000,
   "target": 15900000,
   "visible": true
  },
  "home_services": [
   {
    "key": "contract",
    "name": "계약 등록",
    "target_screen": null
   },
   {
    "key": "customer",
    "name": "고객 조회",
    "target_screen": null
   },
   {
    "key": "planner",
    "name": "SOL 플래너",
    "target_screen": "MOW-CM-010101"
   },
   {
    "key": "quote",
    "name": "견적서",
    "target_screen": null
   },
   {
    "key": "history",
    "name": "방제 이력",
    "target_screen": null
   },
   {
    "key": "effect",
    "name": "체감효과",
    "target_screen": null
   },
   {
    "key": "settle",
    "name": "정산",
    "target_screen": null
   },
   {
    "key": "notice",
    "name": "공지사항",
    "target_screen": null
   }
  ],
  "recent_activities": [
   {
    "id": "a-4001",
    "customer_name": "한빛식당 강남점",
    "action": "정기 방제 계약 등록",
    "at": "2026-11-16T09:12:00+09:00",
    "status": "done"
   },
   {
    "id": "a-4002",
    "customer_name": "그린마트 역삼점",
    "action": "재계약 일정 협의 통화",
    "at": "2026-11-15T16:40:00+09:00",
    "status": "doing"
   },
   {
    "id": "a-4003",
    "customer_name": "서울푸드 본사",
    "action": "견적서 발송",
    "at": "2026-11-09T10:20:00+09:00",
    "status": "wait"
   }
  ]
 },
 "MOW-SC-010102": {
  "max_home": 8,
  "services": [
   {
    "key": "contract",
    "name": "계약 등록",
    "required": true,
    "order": 1,
    "on_home": true
   },
   {
    "key": "customer",
    "name": "고객 조회",
    "required": false,
    "order": 2,
    "on_home": true
   },
   {
    "key": "planner",
    "name": "SOL 플래너",
    "required": false,
    "order": 3,
    "on_home": true
   },
   {
    "key": "quote",
    "name": "견적서",
    "required": false,
    "order": 4,
    "on_home": true
   },
   {
    "key": "history",
    "name": "방제 이력",
    "required": false,
    "order": 5,
    "on_home": true
   },
   {
    "key": "effect",
    "name": "체감효과",
    "required": false,
    "order": 6,
    "on_home": true
   },
   {
    "key": "settle",
    "name": "정산",
    "required": false,
    "order": 7,
    "on_home": true
   },
   {
    "key": "notice",
    "name": "공지사항",
    "required": false,
    "order": 8,
    "on_home": true
   },
   {
    "key": "diary",
    "name": "영업일지",
    "required": false,
    "order": 9,
    "on_home": false
   },
   {
    "key": "report",
    "name": "실적 현황",
    "required": false,
    "order": 10,
    "on_home": false
   },
   {
    "key": "inquiry",
    "name": "고객 문의",
    "required": false,
    "order": 11,
    "on_home": false
   },
   {
    "key": "docs",
    "name": "문서함",
    "required": false,
    "order": 12,
    "on_home": false
   }
  ]
 },
 "MOW-SC-010103": {
  "profile": {
   "name": "김민준",
   "role": "SC",
   "branch": "강남지사",
   "team": "영업2팀",
   "avatar_url": null
  },
  "privacy": {
   "show_work_hours": true,
   "show_contract_amount": true,
   "block_capture": true
  },
  "favorite_count": 8
 }
};
