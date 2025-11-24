import React from 'react'
import './HelpResources.css'

function HelpResources() {
  return (
    <div className="help-resources">
      <h3 className="resources-title">Getting Started Resources</h3>
      
      <div className="resources-list">
        <a href="#" className="resource-link">
          <span className="resource-icon">▶️</span>
          <span>Watch: 5-Minute Quick Start</span>
        </a>
        
        <a href="#" className="resource-link">
          <span className="resource-icon">📖</span>
          <span>Read: Quick Start Guide</span>
        </a>
        
        <a href="#" className="resource-link">
          <span className="resource-icon">💬</span>
          <span>Chat with Developer Support</span>
        </a>
      </div>
    </div>
  )
}

export default HelpResources

