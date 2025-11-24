import React from 'react'
import TrialSection from './TrialSection'
import WelcomeSection from './WelcomeSection'
import OfferSection from './OfferSection'
import MobileAppSection from './MobileAppSection'
import WhatsAppSetupSection from './WhatsAppSetupSection'
import CreditsSection from './CreditsSection'
import './MainContent.css'

function MainContent() {
  return (
    <div className="main-content">
      <div className="content-top">
        <TrialSection />
      </div>
      
      <div className="content-header">
        <WelcomeSection />
      </div>
      
      <div className="content-guidance">
        <a href="#" className="guide-link">
          <span>📅</span>
          Schedule Live Demo
        </a>
        <a href="#" className="guide-link">
          <span>▶️</span>
          Setup Guide
        </a>
        <a href="#" className="guide-link">
          <span>⚡</span>
          Watch Tutorials
        </a>
      </div>
      
      <div className="content-main">
        <div className="content-left">
          <OfferSection />
          <WhatsAppSetupSection />
        </div>
        
        <div className="content-right">
          <MobileAppSection />
          <CreditsSection />
        </div>
      </div>
    </div>
  )
}

export default MainContent
