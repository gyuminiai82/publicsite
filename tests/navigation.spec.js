import { test, expect } from '@playwright/test';

test.describe('네비게이션 및 공통 UI 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('로고 클릭 시 홈(Home) 화면으로 라우팅되는지 확인', async ({ page }) => {
    // 임의로 검색 화면으로 진입
    const searchBtn = page.locator('.search-trigger-btn');
    await searchBtn.click();
    const searchInput = page.locator('.search-input');
    await searchInput.fill('테스트');
    await searchInput.press('Enter');
    
    // 검색 결과 페이지 노출 확인
    await expect(page.locator('.search-results-page')).toBeVisible();

    // 로고 클릭
    const logo = page.locator('.header-logo');
    await logo.click();

    // 히어로 배너(홈 화면 고유 요소) 노출 확인
    await expect(page.locator('.hero-banner')).toBeVisible();
  });

  test('데스크톱 환경에서 내비게이션 메뉴 렌더링 확인', async ({ page }) => {
    // 1920x1080 데스크톱 뷰포트로 설정
    await page.setViewportSize({ width: 1920, height: 1080 });
    const desktopNav = page.locator('.desktop-nav-list');
    await expect(desktopNav).toBeVisible();
    await expect(desktopNav.locator('li')).toHaveCount(6);
  });

  test('통합검색 버튼 동작 및 모달 오픈 확인', async ({ page }) => {
    const searchBtn = page.locator('.search-trigger-btn');
    await searchBtn.click();
    const searchModal = page.locator('.search-modal-overlay');
    await expect(searchModal).toBeVisible();
    
    // 모달 닫기
    const closeBtn = page.locator('.search-close-btn');
    await closeBtn.click();
    await expect(searchModal).not.toBeVisible();
  });

  test('모바일 환경에서 햄버거 메뉴 동작 확인', async ({ page }) => {
    // 375x812 모바일 뷰포트로 설정
    await page.setViewportSize({ width: 375, height: 812 });
    
    // 데스크톱 메뉴가 안보이는지 확인
    const desktopNav = page.locator('.desktop-nav');
    await expect(desktopNav).toBeHidden();

    // 햄버거 버튼 클릭
    const menuBtn = page.locator('.menu-btn');
    await menuBtn.click();
    
    // 메뉴 모달 오픈 확인
    const menuModal = page.locator('.menu-modal-overlay');
    await expect(menuModal).toBeVisible();
  });
});
