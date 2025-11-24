import React from 'react'
import { useNavigate } from 'react-router-dom'
import './OnboardingCard.css'

function OnboardingCard() {
  const navigate = useNavigate()
  return (
    <div className="onboarding-card">
      <div className="onboarding-header">
        <h2 className="onboarding-greeting">Hi Chitra, Let's Get Started!</h2>
        <p className="onboarding-subtitle">Follow these 3 steps to integrate AiSensy APIs:</p>
      </div>
      
      <div className="onboarding-steps">
        <div className="onboarding-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3 className="step-title">Generate API Key</h3>
            <p className="step-description">Create your first API key to authenticate requests</p>
            <button className="step-action-btn" onClick={() => navigate('/developer/api-keys')}>
              Start →
            </button>
          </div>
        </div>
        
        <div className="onboarding-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3 className="step-title">Choose an API</h3>
            <p className="step-description">Browse our catalog and pick one to integrate</p>
            <button className="step-action-btn" onClick={() => navigate('/developer/api-docs')}>
              Browse →
            </button>
          </div>
        </div>
        
        <div className="onboarding-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3 className="step-title">Integrate & Test</h3>
            <p className="step-description">Copy code and start building with our SDKs</p>
            <button className="step-action-btn">View Guide</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingCard

