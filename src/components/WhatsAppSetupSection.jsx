import React from 'react'
import './WhatsAppSetupSection.css'

function WhatsAppSetupSection() {
  return (
    <div className="whatsapp-setup-section">
      <div className="setup-header">
        <div className="setup-title-wrapper">
          <span className="setup-icon">💬</span>
          <h2 className="setup-title">Setup FREE WhatsApp Business Account</h2>
        </div>
        <div className="steps-left">3 steps left</div>
      </div>
      
      <div className="setup-content">
        <div className="setup-step">
          <div className="step-header">
            <span className="step-status active">✓</span>
            <span className="step-start">START</span>
          </div>
          <h3 className="step-title">Apply for WhatsApp Business API</h3>
          <p className="step-instruction">
            Click on Continue With Facebook to apply for WhatsApp Business API.
          </p>
          <div className="step-requirements">
            <strong>Requirements:</strong> A Registered Business & Working Website.
          </div>
          <a href="#" className="step-link">
            <span>📖</span>
            How to apply for WhatsApp Business API?
          </a>
        </div>
        
        <div className="setup-video">
          <div className="video-thumbnail">
            <div className="video-bg-image"></div>
            <div className="video-play-overlay">
              <div className="play-button">▶</div>
            </div>
            <div className="video-overlay-top">
              <div className="video-title-small">How to get FREE Wh...</div>
            </div>
            <div className="video-overlay-text">
              <div className="overlay-text-large">7.5X</div>
              <div className="overlay-text-small">₹15.2 Cr</div>
            </div>
            <div className="video-text-bottom">GET FREE in 10 Mins WhatsApp API</div>
          </div>
        </div>
        
        <div className="setup-actions">
          <button className="btn-schedule">
            <span>📅</span>
            Schedule Meetings
          </button>
          <button className="btn-facebook">
            Continue With Facebook
          </button>
        </div>
        
        <div className="setup-all-steps">
          <span>All Steps</span>
          <span className="arrow-down">↓</span>
        </div>
      </div>
    </div>
  )
}

export default WhatsAppSetupSection
