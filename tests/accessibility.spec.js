import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

// 리포트를 저장할 파일 경로 설정 (프로젝트 루트)
const reportPath = path.resolve(process.cwd(), 'accessibility-violations.json');

// 모든 테스트에서 발견된 위반 사항을 누적할 배열
let allViolations = [];

test.describe('웹 접근성 자동화 테스트', () => {

  // 테스트 시작 전 이전 리포트 파일 삭제
  test.beforeAll(() => {
    if (fs.existsSync(reportPath)) {
      fs.unlinkSync(reportPath);
    }
  });

  // 모든 테스트 종료 후 위반 사항이 1개라도 있으면 JSON 파일로 저장
  test.afterAll(() => {
    if (allViolations.length > 0) {
      fs.writeFileSync(reportPath, JSON.stringify(allViolations, null, 2), 'utf-8');
      console.log(`\n🚨 접근성 위반 사항이 발견되어 리포트가 생성되었습니다.`);
      console.log(`📄 파일 위치: ${reportPath}\n`);
    } else {
      console.log('\n✅ 접근성 위반 사항이 없습니다.\n');
    }
  });

  test('A11Y-01: 메인 페이지 전체 접근성 검사', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 접근성 검사 실행
    const results = await new AxeBuilder({ page }).analyze();
    
    // 위반 사항이 있으면 누적
    if (results.violations.length > 0) {
      allViolations.push({ 
        testCase: 'A11Y-01: 메인 페이지', 
        url: await page.url(),
        violations: results.violations 
      });
    }

    // 소스 수정 전 리포트가 필요하므로, expect 에러 발생시켜 테스트 실패로 처리
    expect(results.violations.length, '메인 페이지 전체 접근성 위반 사항이 없어야 합니다.').toBe(0);
  });

  test('A11Y-02: 검색 모달 창 오픈 상태 접근성', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 검색 모달 띄우기
    await page.locator('.search-trigger-btn').click();
    await expect(page.locator('.search-modal-overlay')).toBeVisible();

    // 모달이 열린 상태로 접근성 검사 실행
    const results = await new AxeBuilder({ page }).analyze();
    
    if (results.violations.length > 0) {
      allViolations.push({ 
        testCase: 'A11Y-02: 검색 모달 오픈 상태', 
        violations: results.violations 
      });
    }
    
    expect(results.violations.length, '검색 모달 창 오픈 상태에서 접근성 위반 사항이 없어야 합니다.').toBe(0);
  });

  test('A11Y-03: 전체 메뉴(햄버거) 오픈 상태 접근성', async ({ page }) => {
    // 모바일 뷰포트로 변경하여 햄버거 메뉴 노출
    await page.setViewportSize({ width: 375, height: 812 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 햄버거 메뉴 열기
    await page.locator('.menu-btn').click();
    await expect(page.locator('.menu-modal-overlay')).toBeVisible();

    // 메뉴가 열린 상태로 접근성 검사 실행
    const results = await new AxeBuilder({ page }).analyze();
    
    if (results.violations.length > 0) {
      allViolations.push({ 
        testCase: 'A11Y-03: 전체 메뉴 모달 오픈 상태', 
        violations: results.violations 
      });
    }
    
    expect(results.violations.length, '전체 메뉴 모달 오픈 상태에서 접근성 위반 사항이 없어야 합니다.').toBe(0);
  });
});
