import React from 'react';
import './QuickLinks.css';

const links = [
  { id: 1, title: '농산물\n가격정보', icon: import.meta.env.BASE_URL + 'assets/icon-price.svg' },
  { id: 2, title: '병해충\n발생정보', icon: import.meta.env.BASE_URL + 'assets/icon-bug.svg' },
  { id: 3, title: '농업기술\n상담', icon: import.meta.env.BASE_URL + 'assets/icon-consult.svg' },
  { id: 4, title: '사이버\n식물병원', icon: import.meta.env.BASE_URL + 'assets/icon-hospital.svg' },
];

function QuickLinks() {
  return (
    <section className="quick-links-section" aria-label="빠른 메뉴">
      <div className="quick-links-grid">
        {links.map((link) => (
          <a key={link.id} href={`#link${link.id}`} className="quick-link-card">
            <h3 className="quick-link-title text-heading">
              {link.title.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h3>
            <div className="quick-link-bottom">
              <img src={link.icon} alt="" className="quick-link-icon-img" aria-hidden="true" />
              <span className="quick-link-arrow" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default QuickLinks;
