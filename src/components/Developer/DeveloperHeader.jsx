import React from 'react'
import { useNavigate } from 'react-router-dom'
import './DeveloperHeader.css'

function DeveloperHeader({ activeTab = 'dashboard', onMenuClick }) {
  const navigate = useNavigate()

  return (
    <div className="developer-header">
      <div className="dev-header-top">
        <div className="dev-header-left">
          <button className="dev-mobile-menu-btn" onClick={onMenuClick}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="dev-logo">
            <span className="aisensy-logo">AiSensy</span>
            <span className="dev-badge">Developer</span>
          </div>
        </div>
        <div className="dev-header-right">
          <div className="dev-user-info">
            <div className="dev-plan-info">
              <span>Pro Plan: ₹2,999/month</span>
              <span className="separator">|</span>
              <span>Additional Webhooks: ₹999 each</span>
            </div>
            <div className="dev-actions">
              <button className="dev-action-btn">👤</button>
              <button className="dev-action-btn">❓</button>
              <button className="dev-action-btn">⚙️</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dev-nav-tabs">
        <button 
          className={`dev-nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/developer')}
        >
          Dashboard
        </button>
        <button 
          className={`dev-nav-tab ${activeTab === 'api-keys' ? 'active' : ''}`}
          onClick={() => navigate('/developer/api-keys')}
        >
          API Keys
        </button>
        <button 
          className={`dev-nav-tab ${activeTab === 'webhooks' ? 'active' : ''}`}
          onClick={() => navigate('/developer/webhooks')}
        >
          Webhooks
        </button>
        <button 
          className={`dev-nav-tab ${activeTab === 'api-docs' ? 'active' : ''}`}
          onClick={() => navigate('/developer/api-docs')}
        >
          API Docs
        </button>
        <button 
          className={`dev-nav-tab ${activeTab === 'guides' ? 'active' : ''}`}
          onClick={() => {/* Will navigate to Guides later */}}
        >
          Guides
        </button>
      </div>
    </div>
  )
}

export default DeveloperHeader

