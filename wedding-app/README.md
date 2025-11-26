# 💒 Our Wedding - 웨딩 준비 관리 앱

결혼 준비를 체계적으로 관리할 수 있는 웹 애플리케이션입니다.

## ✨ 주요 기능

### 📍 웨딩홀 관리
- **지도 보기**: Kakao Map으로 웨딩홀 위치를 한눈에 확인
- **웨딩홀 등록**: 견적, 최소보증인원, 식대, 대관료, 메모, 사진, 최인근 전철역 등 상세 정보 입력
- **리스트 보기**: 등록된 웨딩홀 목록 확인 및 정렬
- **비교**: 여러 웨딩홀의 견적과 조건 비교

### ✅ 준비 체크리스트
- 사용자가 직접 체크리스트 항목 추가/수정
- 카테고리별 분류 (웨딩홀, 드레스, 스튜디오 등)
- D-Day 타임라인 설정
- 완료/미완료 상태 관리

### 💰 예산 관리
- 항목별 예산 및 실제 지출 관리
- 총 예산 대비 지출 현황 추적
- 카테고리별 예산 분류
- 진행률 시각화

### 👥 하객 관리
- 하객 명단 등록 및 관리
- 신랑측/신부측 구분
- 참석 여부 관리 (참석/미정/불참)
- 청첩장 발송 여부 체크
- 테이블 배치 관리
- 필터링 및 검색

### 🏠 홈 대시보드
- D-Day 카운터
- 전체 통계 한눈에 보기
- 주요 기능 바로가기

## 🎨 디자인 테마

- **컬러**: 화이트, 블러시 핑크, 골드, 라벤더
- **스타일**: 깔끔하고 웨딩스러운 밝은 톤
- **반응형**: 모바일/태블릿/데스크톱 지원

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand (with localStorage persistence)
- **Icons**: React Icons
- **Map**: Kakao Map API
- **Date Utils**: date-fns

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 📝 Kakao Map API 설정

1. [Kakao Developers](https://developers.kakao.com/)에서 앱 생성
2. JavaScript 키 발급
3. `src/pages/Map.tsx` 파일에서 `YOUR_APP_KEY`를 발급받은 키로 교체:

```typescript
script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false`;
```

## 💾 데이터 저장

모든 데이터는 브라우저의 **localStorage**에 저장됩니다.
- 별도 서버 없이 사용 가능
- 브라우저 데이터 삭제 시 초기화됨
- 추후 Firebase/Supabase 연동 가능

## 📱 주요 페이지

- `/` - 홈 대시보드
- `/map` - 웨딩홀 지도
- `/venues` - 웨딩홀 리스트
- `/venues/add` - 웨딩홀 추가
- `/checklist` - 준비 체크리스트
- `/budget` - 예산 관리
- `/guests` - 하객 관리

## 🎯 향후 개발 계획

- [ ] Kakao Map API 실제 연동
- [ ] 주소 검색 API 연동 (Kakao/Naver)
- [ ] Firebase/Supabase 백엔드 연동
- [ ] 사진 클라우드 스토리지 업로드
- [ ] 모바일 앱 (React Native)
- [ ] PWA 지원
- [ ] 데이터 내보내기/가져오기
- [ ] 웨딩홀 비교 기능 개선

## 📄 라이선스

MIT

---

Made with ❤️ for our special day
