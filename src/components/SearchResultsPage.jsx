import React, { useState, useRef, useEffect } from 'react';
import './SearchResultsPage.css';

function SearchResultsPage({ keyword }) {
  const [period, setPeriod] = useState('1개월');
  const [sort, setSort] = useState('최신순');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuResults = [
    {
      id: 1,
      title: '기술원에서 하는 일',
      description: '농업과학기술의 개발을 위한 시험연구 농업의 첨단기술개발 및 농업환경 보전에 관한 시험연구 비료·농약·토양·농산물 안전성에 관한 시험 및 분석 농업경영 및 농업정보에 관한 조사·연구 주요 농산물의 저장, 이용 및 가공에 관한 시험·연구 농촌청소년 및 농업인후계자 등 후계인력 및 농업인 조직의',
      path: '기술원 소개 > 기술원 소개 > 기술원에서 하는 일'
    },
    {
      id: 2,
      title: '경기도농업전문경영인',
      description: '목적 매년 10명 내외의 농업전문경영인을 선발하여 전문기술과 경영능력을 겸비한 우수한 농업인으로 육성 설립일/법적근거 1992년 경기도농촌지도자육성기금운영조례 제5183호 및 동 시행규칙 제3692호 제2조, 제7조 조직규모 조직수 : 20개 조직 회원수 : 225명(2024. 12. 기준) 육성방향 「세계 속의 경기농업」을',
      path: '농업기술원 소개 > 육성단체'
    }
  ];

  const postResults = [
    {
      id: 1,
      title: '기술원에서 하는 일',
      description: '농업기술 공보사업 1. 사업결과 요약 가. 총 평 ○ 새로운 영농기술정보의 발굴과 신속한 보도자료 제공으로 비젼있는 농업홍보활동을 전개하여 농가소득증대에 기여하였고, 또한 시군농업기술센터에 각종 기술공보장비를 지원하여 홍보활동 추진을 위한 공보기반을 조성하였음. ○ 농업인에게는...',
      path: '기술원 소개 > 기술원 소개 > 기술원에서 하는 일'
    },
    {
      id: 2,
      title: '기술원에서 하는 일',
      description: '2. 농업기술홍보 가. 방송·신문보도 활동 (1) 목 적 ○ 농업기술정보의 다매체·다채널을 통한 신속한 전파 ○ 우수영농사례 집중발굴 홍보로 농업인의 영농의욕 고취와 자신감 부여 (2) 추진방향 ○ 각종 홍보매체를 이용 연구개발된 새기술정보의 신속한 전파',
      path: '기술원 소개 > 기술원 소개 > 기술원에서 하는 일'
    }
  ];

  return (
    <div className="search-results-page">
      <div className="search-filters-container">
        {/* Period Selector */}
        <div className="filter-group">
          <span className="filter-label">검색조건</span>
          <div className="period-buttons">
            {['1개월', '3개월', '6개월', '12개월'].map(p => (
              <button
                key={p}
                className={`period-btn ${period === p ? 'active' : ''}`}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Selector */}
        <div className="filter-group sort-group">
          <span className="filter-label">정렬기준</span>
          <div className="sort-selector-wrapper" ref={sortRef}>
            <button 
              className="sort-selector"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span className="sort-text">{sort}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sort-icon">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {isSortOpen && (
              <ul className="sort-dropdown">
                {['최신순', '정확도순'].map(option => (
                  <li 
                    key={option} 
                    className={`sort-option ${sort === option ? 'active' : ''}`}
                    onClick={() => {
                      setSort(option);
                      setIsSortOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="search-summary-header">
        <h2>
          <span className="keyword-highlight">‘{keyword}’</span>에 대한 검색결과 1001건
        </h2>
      </div>

      <div className="search-results-content">
        {/* 메뉴 결과 */}
        <section className="result-section">
          <h3 className="section-title">메뉴(2건)</h3>
          <div className="result-list">
            {menuResults.map(item => (
              <article key={item.id} className="result-card">
                <h4 className="result-title">{item.title}</h4>
                <p className="result-desc">{item.description}</p>
                <div className="result-path">{item.path}</div>
              </article>
            ))}
          </div>
          <div className="more-btn-wrapper">
            <button className="more-btn">
              더보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="more-icon">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </section>

        {/* 게시물 결과 */}
        <section className="result-section">
          <h3 className="section-title">게시물(1022건)</h3>
          <div className="result-list">
            {postResults.map(item => (
              <article key={item.id} className="result-card">
                <h4 className="result-title">{item.title}</h4>
                <p className="result-desc">{item.description}</p>
                <div className="result-path">{item.path}</div>
              </article>
            ))}
          </div>
          <div className="more-btn-wrapper">
            <button className="more-btn">
              더보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="more-icon">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SearchResultsPage;
