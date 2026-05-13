import React, { useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import QuickLinks from './components/QuickLinks';
import BoardSection from './components/BoardSection';
import Footer from './components/Footer';
import SearchResultsPage from './components/SearchResultsPage';

function App() {
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'search'
  const [searchKeyword, setSearchKeyword] = useState('');

  // 샘플 데이터
  const newsItems = [
    { title: '주간일정(4.20.~4.26.)', date: '2026.01.01' },
    { title: '작물연구과 작물육종팀 기간제근로자 추가채용 최종...', date: '2026.01.01' },
    { title: '병해충 예찰방제단(기간제근로자) 채용 서류전형 합격...', date: '2026.01.02' },
    { title: '2026년 농작물 병해충 발생정보(제4호)', date: '2026.02.02' },
    { title: '주간일정(4.13.~4.19.)', date: '2026.04.13' },
  ];

  const eduItems = [
    { title: '2026년 곤충신규농업인 창업 기술교육 교육생 모집', date: '2026.01.02' },
    { title: '주간일정(4.20.~4.26.)', date: '2026.01.02' },
    { title: '주간일정(4.20.~4.26.)', date: '2026.01.02' },
    { title: '주간일정(4.20.~4.26.)', date: '2026.01.02' },
    { title: '주간일정(4.20.~4.26.)', date: '2026.04.12' },
  ];

  const handleSearch = (query) => {
    setSearchKeyword(query);
    setCurrentView('search');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setCurrentView('main');
    setSearchKeyword('');
  };

  return (
    <>
      <Header onSearch={handleSearch} onGoHome={handleGoHome} />
      <main>
        {currentView === 'main' ? (
          <>
            <HeroBanner />
            <QuickLinks />
            <div className="boards-container">
              <BoardSection title="기술원소식" items={newsItems} />
              <BoardSection title="교육정보" items={eduItems} />
            </div>
          </>
        ) : (
          <SearchResultsPage keyword={searchKeyword} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
