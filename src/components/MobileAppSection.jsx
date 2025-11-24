import React from 'react'
import './MobileAppSection.css'

function MobileAppSection() {
  return (
    <div className="mobile-app-section">
      <div className="mobile-app-title">Scan to download the Mobile app</div>
      <div className="qr-container">
        <div className="qr-code">
          <div className="qr-pattern"></div>
          <div className="qr-icon">💬</div>
        </div>
        <div className="store-buttons">
          <button className="store-btn google-play">
            <span>GET IT ON</span>
            <span className="store-name">Google Play</span>
          </button>
          <button className="store-btn app-store">
            <span>Download on the</span>
            <span className="store-name">App Store</span>
          </button>
        </div>
      </div>
      
      <div className="key-features">
        <div className="features-title">Key Features</div>
        <ul className="features-list">
          <li>Real-time notifications</li>
          <li>Live Chat</li>
          <li>Ads Management</li>
          <li>Analytics Dashboard</li>
        </ul>
      </div>
    </div>
  )
}

export default MobileAppSection
