import React from 'react';
import './BoardSection.css';

function BoardSection({ title, items, moreLink }) {
  return (
    <section className="board-section" aria-labelledby={`board-title-${title}`}>
      <div className="board-header">
        <h2 id={`board-title-${title}`} className="board-title">{title}</h2>
        <a href={moreLink} rel="noreferrer" className="board-more-link" aria-label={`${title} 더보기`}>
          더보기 <span>+</span>
        </a>
      </div>
      <ul className="board-list">
        {items.map((item, idx) => (
          <li key={idx} className="board-list-item">
            <a href={`#post-${idx}`} className="board-post-link">
              <span className="board-post-title">{item.title}</span>
              <span className="board-post-date">{item.date}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BoardSection;
