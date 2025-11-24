import React from 'react'
import { useNavigate } from 'react-router-dom'
import './TrialSection.css'

function TrialSection() {
  const navigate = useNavigate()
  
  return (
    <div className="trial-section">
      <div className="trial-content">
        <div className="trial-icon">🕐</div>
        <div className="trial-text">
          <div className="trial-title">4 Days Left in Your Trial</div>
          <div className="trial-subtitle">Upgrade now to unlock all premium features!</div>
        </div>
      </div>
      <button className="btn-upgrade" onClick={() => navigate('/subscription')}>
        <span>⚡</span>
        Upgrade Now
      </button>
    </div>
  )
}

export default TrialSection
