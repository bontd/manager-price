// src/pages/NotFound.tsx
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import './404.css';

export default function NotFound() {
  return (
    <div className="not-found-container">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="error-container">
          {/* 404 Number with Glitch Effect */}
          <div className="error-number">
            <span className="glitch" data-text="404">404</span>
          </div>

          {/* Error Message */}
          <div className="error-message">
            <h1 className="error-title">Oops! Lost in Space</h1>
            <p className="error-description">
              The page you're looking for has been abducted by aliens or simply doesn't exist.
              <br />
              Let's get you back on track!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <Link to="/" className="btn-primary">
              <HomeOutlined />
              <span>Return Home</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="btn-secondary"
            >
              <ArrowLeftOutlined />
              <span>Go Back</span>
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="decorative-elements">
            <div className="orbit">
              <div className="satellite"></div>
            </div>
            <div className="stars">
              <div className="star star-1"></div>
              <div className="star star-2"></div>
              <div className="star star-3"></div>
              <div className="star star-4"></div>
              <div className="star star-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
