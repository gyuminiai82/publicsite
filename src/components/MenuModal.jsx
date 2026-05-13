import React, { useEffect } from 'react';
import './MenuModal.css';

const menuItems = [
  { id: 1, label: '기술사업화', link: '#' },
  { id: 2, label: '원장과의 대화', link: '#' },
  { id: 3, label: '기관방문 안내', link: '#' },
  { id: 4, label: '육성단체', link: '#' },
  { id: 5, label: '농사정보', link: '#' },
  { id: 6, label: '농업 경영정보', link: '#' }
];

function MenuModal({ isOpen, onClose }) {
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="menu-modal-overlay" role="dialog" aria-modal="true" aria-label="전체 메뉴">
      <div className="menu-modal-container">
        
        {/* Header - Close Button Only */}
        <div className="menu-modal-header">
          <button className="menu-close-btn" onClick={onClose} aria-label="메뉴 닫기">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Menu List */}
        <div className="menu-modal-content">
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.id} className="menu-item">
                <a href={item.link} className="menu-link" onClick={onClose}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  );
}

export default MenuModal;
