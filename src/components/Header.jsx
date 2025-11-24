import React from 'react'
import './Header.css'

function Header({ onMenuClick }) {
  return (
    <div className="header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <span className="skip-link">Skip</span>
      </div>
      
      <div className="header-center">
        <div className="status-badge pending">
          <span>WhatsApp Business API Status: PENDING</span>
          <button className="btn-apply">Apply Now ✓</button>
        </div>
      </div>
      
      <div className="header-right">
        <div className="plan-badge">
          <span className="plan-icon">💎</span>
          <span>Current Plan: TRIAL (Pro + Flows)</span>
          <span className="days-left">4 days left</span>
        </div>
      </div>
    </div>
  )
}

export default Header
