import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" aria-label="사이트 하단 정보">
      {/* Top section: Green background */}
      <div className="footer-top">
        <div className="footer-top-container">
          <ul className="footer-nav-list">
            <li><a href="#about" className="footer-nav-link">기술원 소개</a></li>
            <li><span className="divider" aria-hidden="true">|</span></li>
            <li><a href="#news" className="footer-nav-link">기술원 소식</a></li>
            <li><span className="divider" aria-hidden="true">|</span></li>
            <li><a href="#bid" className="footer-nav-link">입찰정보</a></li>
            <li><span className="divider" aria-hidden="true">|</span></li>
            <li><a href="#press" className="footer-nav-link">보도자료</a></li>
            <li><span className="divider" aria-hidden="true">|</span></li>
            <li><a href="#institute" className="footer-nav-link">연구소 안내</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom section: White background */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-policy-row">
            <div className="footer-policy">
              <a href="#privacy" className="policy-link highlight">개인정보처리방침</a>
              <a href="#copyright" className="policy-link">저작권 보호정책</a>
            </div>

            <div className="footer-family-site">
              <label htmlFor="family-site-select" className="sr-only">패밀리 사이트 선택</label>
              <select id="family-site-select" className="family-select">
                <option value="">- 바로가기 -</option>
                <option value="gg_home">경기도 누리집</option>
                <option value="gg_agri">경기도농업기술원</option>
                <option value="gg_animal">경기동물위생시험소</option>
                <option value="gg_forest">경기산림환경연구소</option>
                <option value="gg_marine">경기해양수산자원연구소</option>
              </select>
              <button className="family-btn">이동</button>
            </div>
          </div>

          <div className="footer-address">
            <p>(18388) 경기도 화성시 병점구 병점중앙로 283-33 (기산동)</p>
            <p>Copyright(c) 2015 경기도농업기술원 All Right Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
