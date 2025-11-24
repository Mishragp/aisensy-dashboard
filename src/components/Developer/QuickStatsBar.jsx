import React from 'react'
import './QuickStatsBar.css'

function QuickStatsBar() {
  return (
    <div className="quick-stats-bar">
      <h3 className="stats-title">QUICK STATS</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">API Calls:</span>
          <span className="stat-value">0</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Webhooks:</span>
          <span className="stat-value">0/2 free</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Plan:</span>
          <span className="stat-value">Free</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pricing Cues:</span>
          <span className="stat-value">See below</span>
        </div>
      </div>
    </div>
  )
}

export default QuickStatsBar

