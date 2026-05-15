import React, { useState, useEffect, useCallback } from 'react';
import './HeroBanner.css';

const slides = [
  {
    id: 0,
    badge: '연구사업',
    title: '농업의 내일을 설계하는 첨단 \n과학의 힘, 경기도가 앞장섭니다.',
    bg: import.meta.env.BASE_URL + 'assets/hero-bg-1.png',
    link: 'https://nongup.gg.go.kr/works/28'
  },
  {
    id: 1,
    badge: '지도사업',
    title: '농업인의 든든한 파트너, 현장에서 \n답을 찾는 맞춤형 지도사업.',
    bg: import.meta.env.BASE_URL + 'assets/hero-bg-2.png',
    link: 'https://nongup.gg.go.kr/works/28'
  },
  {
    id: 2,
    badge: '품목별 정보',
    title: '심는 순간부터 수확까지, 성공 \n농사를 위한 품목별 맞춤 가이드.',
    bg: import.meta.env.BASE_URL + 'assets/hero-bg-3.png',
    link: 'https://nongup.gg.go.kr/data/57'
  },
  {
    id: 3,
    badge: '신품종 육성',
    title: '경기도의 이름으로 피어난 우리 \n품종,세계의 입맛을 사로잡습니다.',
    bg: import.meta.env.BASE_URL + 'assets/hero-bg-4.png',
    link: 'https://nongup.gg.go.kr/data/107311'
  }
];

function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const currentData = slides[currentSlide];

  return (
    <section className="hero-banner" aria-label="주요 연구사업 안내">
      {/* 백그라운드 크로스페이드 애니메이션을 위한 별도 레이어 */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`hero-bg-layer ${idx === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url('${slide.bg}')` }}
          aria-hidden="true"
        />
      ))}
      <div className="hero-bg-overlay"></div>

      <div className="hero-content">
        <span className="hero-badge text-caption">{currentData.badge}</span>
        <h2 className="hero-title">
          {currentData.title.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h2>
      </div>

      <div className="hero-controls">
        <a href={currentData.link} target="_blank" rel="noreferrer" className="hero-link-btn" aria-label="자세히 보기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        <div className="hero-slider-controls">
          <button className="ctrl-btn" onClick={prevSlide} aria-label="이전 슬라이드">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="pagination" role="tablist">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                role="tab"
                aria-selected={idx === currentSlide}
                aria-label={`${idx + 1}번째 슬라이드`}
                className={`page-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSlide(idx);
                  setIsPlaying(false);
                }}
              >
                {idx === currentSlide && isPlaying && (
                  <div className="page-dot-progress"></div>
                )}
                {idx === currentSlide && !isPlaying && (
                  <div className="page-dot-solid"></div>
                )}
              </button>
            ))}
          </div>

          <button className="ctrl-btn" onClick={nextSlide} aria-label="다음 슬라이드">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <button
            className="ctrl-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "슬라이드 일시정지" : "슬라이드 재생"}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="2" width="4" height="12" />
                <rect x="9" y="2" width="4" height="12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                <polygon points="4,2 14,8 4,14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
