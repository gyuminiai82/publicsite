# 경기도농업기술원 메인 페이지 테스트 계획서 (Test Plan)

이 문서는 Playwright를 사용하여 현재 프로젝트(경기도농업기술원 공공사이트)의 메인 페이지 기능과 접근성, UI/UX 품질을 보장하기 위한 자동화 테스트 계획서입니다. 모든 테스트 시나리오는 Gherkin 문법을 기반으로 한 BDD(Behavior-Driven Development)의 Feature-Scenario-Given-When-Then 구조를 엄격히 따릅니다.

## 1. 테스트 개요
- **대상**: 메인 페이지 (`/publicsite/`) 및 검색 결과 페이지
- **도구**: Playwright, `@axe-core/playwright`
- **목표**: 
  1. 시각적 렌더링 및 기능 오류 방지 (Regression 방지)
  2. 웹 접근성 가이드라인 준수 확인
  3. 반응형 웹 환경(모바일/데스크톱)에서의 올바른 동작 보장

---

## 2. 테스트 환경
- **브라우저**: Chromium, WebKit, Firefox (Playwright 지원 브라우저 전체)
- **Viewport**:
  - Desktop: `1920x1080`
  - Tablet: `768x1024`
  - Mobile: `375x812`

---

## 3. 테스트 시나리오 상세 (Test Cases)

### 3.1. 웹 접근성 (Accessibility) 테스트

```gherkin
Feature: 웹 접근성 (Accessibility) 보장
  장애인 및 고령자를 포함한 모든 사용자가 서비스를 이용하는 데 불편함이 없는지 검사한다.

  Scenario: A11Y-01 메인 페이지 전체 접근성 검사
    Given 사용자가 메인 페이지에 접속한 상태에서
    When AxeBuilder를 통해 접근성 검사를 실행하면
    Then 검출되는 접근성 위반 사항(Violations)이 0개여야 한다.

  Scenario: A11Y-02 검색 모달 창 오픈 상태 접근성
    Given 사용자가 메인 페이지에 접속해 있는 상태에서
    When 통합검색 버튼을 클릭하여 모달을 띄운 뒤 접근성 검사를 실행하면
    Then 포커스 트랩과 ARIA 속성 등에 대한 위반 사항이 없어야 한다.

  Scenario: A11Y-03 전체 메뉴(햄버거) 오픈 상태 접근성
    Given 모바일 뷰포트에서 사용자가 메인 페이지에 접속한 상태에서
    When 햄버거 메뉴 버튼을 클릭하여 메뉴 모달을 띄운 뒤 접근성 검사를 실행하면
    Then 스크린 리더 환경 등을 고려한 접근성 위반 사항이 없어야 한다.
```

### 3.2. 공통 UI 및 내비게이션 (Header & Footer)

```gherkin
Feature: 공통 UI 및 내비게이션 동작 확인
  페이지 진입 및 최상단/최하단 공통 컴포넌트의 정상적인 동작을 확인한다.

  Scenario: NAV-01 로고 클릭 시 홈(Home) 이동
    Given 사용자가 검색 결과 페이지 등 다른 뷰를 보고 있는 상태에서
    When 헤더의 로고 이미지(logo.webp)를 클릭하면
    Then 메인 화면(currentView 상태가 메인)으로 초기화되어야 한다.

  Scenario: NAV-02 데스크톱 내비게이션 렌더링
    Given 사용자가 데스크톱 해상도(1920x1080)로 메인 페이지에 접속한 상태에서
    When 헤더 영역을 확인하면
    Then 6개의 메인 메뉴(기술사업화, 원장과의 대화 등)가 정상적으로 렌더링되어야 한다.

  Scenario: NAV-03 통합검색 버튼 동작 확인
    Given 사용자가 메인 페이지에 접속해 있는 상태에서
    When 헤더의 돋보기(통합검색) 버튼을 클릭하면
    Then 화면에 검색 모달(SearchModal 컴포넌트)이 노출되어야 한다.

  Scenario: NAV-04 반응형 모바일 햄버거 메뉴 동작
    Given 사용자가 모바일 해상도(375x812)로 접속하여 데스크톱 메뉴가 숨겨진 상태에서
    When 헤더의 햄버거 메뉴 버튼을 클릭하면
    Then 전체 메뉴 모달(MenuModal 컴포넌트)이 화면에 나타나야 한다.
```

### 3.3. 히어로 배너 (Hero Banner) 상호작용

```gherkin
Feature: 히어로 배너 상호작용 검증
  메인 화면에서 가장 큰 비중을 차지하는 슬라이더의 자동 재생 및 수동 조작을 확인한다.

  Scenario: HERO-01 배너 초기 렌더링 및 LCP 확인
    Given 사용자가 메인 페이지에 처음 접속했을 때
    When 히어로 배너 영역을 확인하면
    Then 첫 번째 슬라이드의 텍스트와 배경 이미지(hero-bg-1.webp)가 정상적으로 표시되어야 한다.

  Scenario: HERO-02 자동 재생(Autoplay) 기능
    Given 히어로 배너가 표시되고 자동 재생이 활성화된 상태에서
    When 사용자가 아무런 조작 없이 4초를 대기하면
    Then 두 번째 슬라이드로 배경과 텍스트가 자동 전환되어야 한다.

  Scenario: HERO-03 수동 슬라이드 조작 (Next/Prev)
    Given 히어로 배너가 표시된 상태에서
    When 사용자가 '다음' 또는 '이전' 화살표 버튼을 클릭하면
    Then 즉시 해당 방향의 다음/이전 슬라이드로 화면이 전환되어야 한다.

  Scenario: HERO-04 재생/일시정지 버튼 토글
    Given 자동 재생이 진행 중인 슬라이드 상태에서
    When 사용자가 일시정지 버튼을 클릭하면
    Then 버튼 아이콘이 재생 아이콘으로 변경되며 슬라이드 전환 타이머가 정지되어야 한다.

  Scenario: HERO-05 페이지네이션(Dot) 클릭 이동
    Given 히어로 배너가 표시된 상태에서
    When 사용자가 하단의 특정 페이지네이션(Dot) 버튼을 클릭하면
    Then 클릭한 순서에 해당하는 슬라이드로 즉각 이동해야 한다.
```

### 3.4. 퀵 링크 및 게시판 (Quick Links & Boards)

```gherkin
Feature: 퀵 링크 및 게시판 데이터 출력 확인
  주요 메뉴 이동 버튼과 공지사항/교육정보 게시판 리스트가 잘 출력되는지 확인한다.

  Scenario: CONT-01 퀵 링크 리스트 검증
    Given 사용자가 메인 페이지의 퀵 링크 영역을 볼 때
    When 화면을 확인하면
    Then 4개의 퀵 링크 카드가 텍스트, 화살표, SVG 아이콘과 함께 노출되어야 한다.

  Scenario: CONT-02 퀵 링크 하이퍼링크 라우팅
    Given 퀵 링크 카드가 정상적으로 노출된 상태에서
    When 특정 퀵 링크(예: 농산물 가격정보)를 클릭하면
    Then 지정된 올바른 URL로 이동(또는 속성 부여)되어야 한다.

  Scenario: CONT-03 기술원소식 게시판 렌더링
    Given 사용자가 메인 페이지의 게시판 영역을 볼 때
    When '기술원소식' 섹션을 확인하면
    Then 제목과 함께 전달받은 5개의 뉴스 아이템이 리스트 형태로 정확히 출력되어야 한다.

  Scenario: CONT-04 교육정보 게시판 더보기 버튼
    Given 사용자가 메인 페이지의 '교육정보' 게시판 영역을 볼 때
    When '더보기' 버튼의 요소를 확인하면
    Then 연결된 올바른 앵커(href) 속성을 가지고 있어야 한다.
```

### 3.5. 검색 기능 (Search Flow)

```gherkin
Feature: 메인 페이지 검색 흐름(Search Flow) 검증
  사용자가 검색어를 입력하고 검색 결과 페이지로 이동하는 전체 플로우를 확인한다.

  Scenario: SRCH-01 검색어 입력 및 폼 제출
    Given 사용자가 검색 모달을 열어둔 상태에서
    When 검색어(예: "사과")를 입력하고 검색 버튼(또는 엔터)을 눌러 폼을 제출하면
    Then 검색 모달 창이 닫혀야 한다.

  Scenario: SRCH-02 검색 결과 뷰 전환 확인
    Given 사용자가 검색어를 성공적으로 제출한 상태에서
    When 화면 렌더링 상태를 확인하면
    Then 메인 화면 요소(히어로 배너, 게시판 등)는 숨겨지고 SearchResultsPage 컴포넌트가 화면에 표시되어야 한다.

  Scenario: SRCH-03 검색 후 다시 홈으로 복귀
    Given 사용자가 검색 결과 페이지(SearchResultsPage)를 보고 있는 상태에서
    When 헤더 영역의 로고 이미지를 클릭하면
    Then 검색 결과 화면이 닫히고 다시 메인 뷰(히어로 배너 등)가 나타나야 한다.
```

---

## 4. 자동화 스크립트 구조
본 계획서에 작성된 내용들은 `tests/` 디렉터리 하위에 Playwright 테스트 코드(spec.js)로 구현되어 있습니다.
- `tests/accessibility.spec.js`
- `tests/navigation.spec.js`
- `tests/home-components.spec.js`
- `tests/search-flow.spec.js`

실행 명령어: `npm run test:e2e`
