import { test, expect } from '@playwright/test';

test.describe('홈 컴포넌트 상호작용 테스트 (Hero Banner & Quick Links & Boards)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('히어로 배너 초기 렌더링 확인', async ({ page }) => {
    const heroBanner = page.locator('.hero-banner');
    await expect(heroBanner).toBeVisible();
    // 1번째 뱃지 렌더링 확인
    const badge = page.locator('.hero-badge');
    await expect(badge).toHaveText('연구사업');
  });

  test('히어로 배너 수동 조작 (다음/이전 슬라이드)', async ({ page }) => {
    const nextBtn = page.locator('.hero-slider-controls .ctrl-btn[aria-label="다음 슬라이드"]');
    const badge = page.locator('.hero-badge');

    await nextBtn.click();
    await expect(badge).toHaveText('지도사업'); // 2번째 슬라이드

    const prevBtn = page.locator('.hero-slider-controls .ctrl-btn[aria-label="이전 슬라이드"]');
    await prevBtn.click();
    await expect(badge).toHaveText('연구사업'); // 1번째 슬라이드로 복귀
  });

  test('퀵 링크 리스트 렌더링 확인', async ({ page }) => {
    const quickLinks = page.locator('.quick-link-card');
    await expect(quickLinks).toHaveCount(4);

    const firstLink = quickLinks.nth(0);
    await expect(firstLink).toContainText('농산물가격정보');
    await expect(firstLink).toHaveAttribute('href', 'https://nongup.gg.go.kr/data/62');
  });

  test('게시판(기술원소식, 교육정보) 렌더링 확인', async ({ page }) => {
    const boards = page.locator('.board-section');
    await expect(boards).toHaveCount(2);

    const newsBoard = boards.nth(0);
    await expect(newsBoard.locator('.board-title')).toHaveText('기술원소식');
    await expect(newsBoard.locator('.board-list-item')).toHaveCount(5);

    const eduBoard = boards.nth(1);
    await expect(eduBoard.locator('.board-title')).toHaveText('교육정보');
    await expect(eduBoard.locator('.board-list-item')).toHaveCount(5);
  });
});
