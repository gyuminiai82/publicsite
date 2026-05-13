import React, { useState } from 'react';
import './Header.css';
import SearchModal from './SearchModal';
import MenuModal from './MenuModal';

function Header({ onSearch, onGoHome }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogoClick = (e) => {
    if (onGoHome) {
      e.preventDefault();
      onGoHome();
    }
  };

  const handleSearchSubmit = (query) => {
    setIsSearchOpen(false);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo Section */}
          <a href="/" className="header-logo" onClick={handleLogoClick} aria-label="경기도농업기술원 홈으로 이동">
            <img src="/assets/logo.png" alt="" className="logo-icon-img" aria-hidden="true" />
            <h1 className="text-heading logo-text">경기도농업기술원</h1>
          </a>

          {/* Desktop Navigation (Hidden on mobile/tablet) */}
          <nav className="desktop-nav" aria-label="메인 메뉴">
            <ul className="desktop-nav-list">
              <li><a href="#menu1" className="desktop-nav-link">기술사업화</a></li>
              <li><a href="#menu2" className="desktop-nav-link">원장과의 대화</a></li>
              <li><a href="#menu3" className="desktop-nav-link">기관방문 안내</a></li>
              <li><a href="#menu4" className="desktop-nav-link">육성단체</a></li>
              <li><a href="#menu5" className="desktop-nav-link">농사정보</a></li>
              <li><a href="#menu6" className="desktop-nav-link">농업 경영정보</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            {/* 통합검색 버튼 */}
            <button 
              className="search-trigger-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="통합검색 열기"
              aria-expanded={isSearchOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="search-trigger-text text-body">통합검색</span>
            </button>

            {/* 햄버거 메뉴 버튼 */}
            <button 
              className="menu-btn" 
              aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="hamburger-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </header>

      {/* PRD 요건: 검색 모달 */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSearch={handleSearchSubmit}
      />

      {/* 전체 메뉴 모달 */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}

export default Header;
