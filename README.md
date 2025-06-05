# tourism-map-app

# 🏞 관광지 연관 정보 맵앱

한국관광공사의 **관광지별 연관 관광지 API**를 활용하여  
지역 중심 관광지와 함께 자주 방문되는 관광지, 음식, 숙박 정보를 시각적으로 제공하는 **모바일 앱**을 개발하였습니다.

------------------------------------------------------------
📌 프로젝트 개요

- 목표: 중심 관광지와의 연계 방문 가능성이 높은 연관 관광지 정보를 지도에 시각화하여 관광 계획에 도움 제공
- 기술 스택: Expo SDK 53, React Native, WebView, 공공데이터포털 OpenAPI
- 주요 기능:
  - 중심 관광지 키워드 검색
  - 연관 관광지(관광지/음식/숙박) 정보 조회
  - WebView 기반 지도에서 연관 장소 시각화
  - 관광지명 및 거리 기반 연관 순위 정렬

------------------------------------------------------------
🚀 실행 방법

1. 환경 준비
- Node.js 18 이상
- Expo CLI 설치:

  npm install -g expo-cli

2. 프로젝트 실행

  git clone https://github.com/your-username/tourism-map-app.git
  cd tourism-map-app
  npm install
  npx expo start

3. API 키 입력
App.js 또는 환경 설정 파일 내 아래 항목 수정:

  const serviceKey = "발급받은_서비스키를_여기에_입력하세요";

------------------------------------------------------------
📁 프로젝트 구조

tourism-map-app/
├── assets/                   : 앱에서 사용하는 이미지, 아이콘 등을 저장
├── components/               : 재사용 가능한 UI 컴포넌트 폴더
│   └── MapView.js            : 지도 UI를 WebView로 구현하는 컴포넌트
├── services/                 : API 요청 함수 저장
│   └── tourApi.js            : 관광지별 연관 관광지 정보 요청 함수 포함
├── screens/                  : 앱 주요 화면 컴포넌트
│   └── HomeScreen.js         : 검색 및 결과 출력 메인 화면
├── App.js                    : 앱 진입점 파일
├── app.json                  : Expo 설정 파일
├── package.json              : 프로젝트 메타 및 의존성 관리 파일
├── README.md                 : 프로젝트 설명 문서
└── .env                      : (선택 사항) API 키 등 민감 정보 저장

------------------------------------------------------------
🧠 주요 기능

- 🔍 키워드 기반 중심 관광지 검색
- 🏞 연관 관광지, 음식점, 숙소 최대 50개 조회
- 🗺 지도 기반 연관 장소 시각화
- 📊 거리 및 시간 기반 연계 방문 분석

------------------------------------------------------------
🔧 개선 및 고도화 작업

- 사용자 경험(UX) 향상을 위한 UI/UX 디자인 리뉴얼
- API 호출 최적화 및 에러 핸들링 강화
- 데이터 캐싱 및 오프라인 지원 기능 도입
- 다국어 지원 및 지역별 맞춤형 추천 기능 추가
- 사용자 리뷰, 평점 시스템 도입으로 신뢰도 향상
- 실시간 혼잡도, 날씨 정보 연동으로 방문 계획 지원
- SNS 공유 기능 및 커뮤니티 기능 개발
- 멀티미디어 콘텐츠(사진, 영상) 통합 강화
- 위치 기반 푸시 알림 및 이벤트 정보 제공
- 방문 경로 자동 추천 및 일정 관리 기능 추가

------------------------------------------------------------
📚 사용한 API 정보

- 한국관광공사_관광지별 연관 관광지 정보 API
  - 지역기반 중심 관광지와 연계된 장소 목록 제공
  - 제공 범위: 관광지 / 음식 / 숙박 유형별 최대 50개
  - 제공 기간: 2024년 5월 ~ 2025년 4월
  - https://www.data.go.kr/data/15097387/openapi.do

------------------------------------------------------------
📄 API 호출 예제

```js
import axios from 'axios';

const serviceKey = "발급받은_서비스키를_여기에_입력하세요";
const baseUrl = "https://apis.data.go.kr/B551011/KorService/areaBasedList";

async function fetchRelatedTourism(keyword, numOfRows = 10, pageNo = 1) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        serviceKey: serviceKey,
        MobileOS: "ETC",
        MobileApp: "TourismMapApp",
        _type: "json",
        numOfRows: numOfRows,
        pageNo: pageNo,
        arrange: "A",
        contentTypeId: 12,  // 12: 관광지, 39: 음식, 32: 숙박 등 선택 가능
        keyword: keyword
      }
    });
    return response.data.response.body.items.item;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}

fetchRelatedTourism("서울")
  .then(data => {
    console.log("관광지 관련 데이터:", data);
  })
  .catch(err => {
    console.error("데이터 조회 실패:", err);
  });
