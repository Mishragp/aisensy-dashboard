import React from 'react'
import './CreditsSection.css'

function CreditsSection() {
  return (
    <div className="credits-section">
      <div className="credit-item">
        <div className="credit-header">
          <span className="credit-label">Free Service Conversation</span>
        </div>
        <div className="credit-bar-container">
          <div className="credit-bar">
            <div className="credit-bar-fill" style={{ width: '30%' }}></div>
          </div>
          <div className="credit-bar-labels">
            <span>0</span>
            <span className="infinity">∞</span>
            <span>Unlimited</span>
          </div>
        </div>
      </div>
      
      <div className="credit-item">
        <div className="credit-header">
          <span className="credit-label">WhatsApp Conversation Credits (WCC)</span>
          <button className="btn-buy-small">Buy More</button>
        </div>
        <div className="credit-amount">₹ 50.00</div>
        <div className="credit-status">
          <span className="status-icon">🔄</span>
          <span>WCC auto-recharge is enabled</span>
        </div>
      </div>
      
      <div className="credit-item">
        <div className="credit-header">
          <span className="credit-label">AI Credits</span>
          <button className="btn-buy-small">Buy Credits</button>
        </div>
        <div className="credit-amount">₹ 500.00</div>
      </div>
      
      <div className="credit-item">
        <div className="credit-header">
          <span className="credit-label">Advertisement Credits</span>
          <button className="btn-buy-small">Buy Credits</button>
        </div>
        <div className="credit-amount">₹ 0</div>
      </div>
    </div>
  )
}

export default CreditsSection
