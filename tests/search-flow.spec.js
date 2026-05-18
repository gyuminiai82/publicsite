import { test, expect } from '@playwright/test';

test.describe('통합 검색 E2E 시나리오 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('검색어 입력 후 결과 페이지 라우팅 전체 동작 확인', async ({ page }) => {
    // 1. 초기 상태: 메인 뷰 요소들 노출 확인
    const heroBanner = page.locator('.hero-banner');
    await expect(heroBanner).toBeVisible();

    // 2. 검색 모달 열기
    const searchBtn = page.locator('.search-trigger-btn');
    await searchBtn.click();

    // 3. 검색어 입력 및 폼 제출
    const searchInput = page.locator('.search-input');
    await searchInput.fill('사과');
    const searchSubmitBtn = page.locator('.search-submit-icon');
    await searchSubmitBtn.click();

    // 4. 검색 결과 뷰 노출 확인 및 검색어 표시 확인
    const searchResultsPage = page.locator('.search-results-page');
    await expect(searchResultsPage).toBeVisible();
    
    // 검색 뷰로 전환되면 메인 뷰 요소들은 숨겨져야 함
    await expect(heroBanner).toBeHidden();

    // 5. 헤더 로고 클릭 시 홈으로 복귀
    const logo = page.locator('.header-logo');
    await logo.click();

    // 메인 뷰 컴포넌트 재노출 확인
    await expect(heroBanner).toBeVisible();
    await expect(searchResultsPage).toBeHidden();
  });
});
