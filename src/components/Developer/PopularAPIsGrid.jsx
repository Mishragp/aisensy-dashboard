import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PopularAPIsGrid.css'

function PopularAPIsGrid() {
  const navigate = useNavigate()
  
  return (
    <div className="popular-apis-grid">
      <h3 className="apis-title">Popular APIs to Get Started</h3>
      
      <div className="apis-grid">
        <div className="api-card">
          <div className="api-badge free">FREE Messaging</div>
          <h4 className="api-name">Send Message API</h4>
          <p className="api-description">Send WhatsApp messages via API.</p>
          <div className="api-rate">100/min</div>
          <button className="api-action-btn" onClick={() => navigate('/developer/api-docs/send-message')}>
            View Docs
          </button>
        </div>
        
        <div className="api-card">
          <div className="api-badge free">FREE Messaging</div>
          <h4 className="api-name">Receive Msg API</h4>
          <p className="api-description">Receive incoming WhatsApp msgs.</p>
          <div className="api-rate">100/min</div>
          <button className="api-action-btn" onClick={() => navigate('/developer/api-docs/receive-message')}>
            View Docs
          </button>
        </div>
        
        <div className="api-card pro">
          <div className="api-badge pro">ANALYTICS</div>
          <h4 className="api-name">Campaign Analytics PRO</h4>
          <p className="api-description">Track campaign performance & conversions.</p>
          <div className="api-rate">1000/min (Pro only)</div>
          <button className="api-action-btn upgrade" onClick={() => navigate('/subscription')}>Upgrade to Pro</button>
        </div>
      </div>
      
      <a href="#" className="browse-all-link" onClick={(e) => { e.preventDefault(); navigate('/developer/api-docs') }}>
        Browse All 23 APIs →
      </a>
    </div>
  )
}

export default PopularAPIsGrid

