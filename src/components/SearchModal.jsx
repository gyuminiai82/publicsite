import React, { useState, useRef, useEffect } from 'react';
import './SearchModal.css';

// Mock Data
const popularSearches = [
  { id: 1, keyword: '농업기술', trend: 'up', change: 1 },
  { id: 2, keyword: '교육일정', trend: 'up', change: 2 },
  { id: 3, keyword: '농작물', trend: 'same', change: 0 },
  { id: 4, keyword: '병해충', trend: 'down', change: 2 }
];

const initialRecentSearches = [
  { id: 1, keyword: '농업기술' },
  { id: 2, keyword: '농업기술' },
  { id: 3, keyword: '농업기술' }
];

function SearchModal({ isOpen, onClose, onSearch }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [recentSearches, setRecentSearches] = useState(initialRecentSearches);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
    if (!isOpen) {
      setQuery('');
      setError(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }
    setError(false);
    
    // Add to recent searches mock
    const newRecent = { id: Date.now(), keyword: query };
    setRecentSearches([newRecent, ...recentSearches.slice(0, 2)]);
    
    if (onSearch) {
      onSearch(query);
    }
    setQuery('');
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (error && e.target.value.trim()) {
      setError(false);
    }
  };

  const removeRecentSearch = (id) => {
    setRecentSearches(recentSearches.filter(item => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
      <div className="search-modal-container">
        
        {/* Header - Close Button Only */}
        <div className="search-modal-header">
          <button className="search-close-btn" onClick={onClose} aria-label="닫기">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="search-modal-content">
          {/* Input Section */}
          <div className="search-input-section">
            <h2 id="search-modal-title" className={`search-label ${error ? 'error-text' : ''}`}>검색어를 입력해주세요</h2>
            <form className="search-form" onSubmit={handleSubmit} role="search" noValidate>
              <div className={`search-input-box ${error ? 'input-error' : ''}`}>
                <input
                  ref={inputRef}
                  type="search"
                  className="search-input"
                  placeholder="농업기술"
                  value={query}
                  onChange={handleChange}
                  aria-invalid={error}
                />
                <button type="submit" className={`search-submit-icon ${error ? 'error-icon' : ''}`} aria-label="검색">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Keywords Section */}
          <div className="search-keywords-section">
            
            {/* Popular Searches */}
            <div className="keyword-group">
              <h3 className="keyword-group-title">인기검색어</h3>
              <ul className="popular-list">
                {popularSearches.map((item, index) => (
                  <li key={item.id} className="popular-item">
                    <div className="popular-item-left">
                      <span className="popular-keyword">{index + 1}. {item.keyword}</span>
                    </div>
                    <div className={`popular-trend ${item.trend}`}>
                      {item.trend === 'up' && <span className="trend-icon up">▲</span>}
                      {item.trend === 'down' && <span className="trend-icon down">▼</span>}
                      {item.trend === 'same' && <span className="trend-icon same">—</span>}
                      {item.trend !== 'same' && <span className="trend-change">{item.change}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Searches */}
            <div className="keyword-group">
              <h3 className="keyword-group-title">최근검색어</h3>
              {recentSearches.length > 0 ? (
                <ul className="recent-list">
                  {recentSearches.map((item) => (
                    <li key={item.id} className="recent-item">
                      <span className="recent-keyword">{item.keyword}</span>
                      <button
                        className="recent-delete-btn"
                        onClick={() => removeRecentSearch(item.id)}
                        aria-label={`${item.keyword} 삭제`}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="recent-empty">최근 검색어가 없습니다.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
