import React from 'react'
import './EmptyStateView.css'

function EmptyStateView({ onGenerateClick }) {
  return (
    <div className="empty-state-view">
      <div className="empty-state-container">
        <div className="empty-state-icon">🔑</div>
        <h2 className="empty-state-title">No API Keys Yet</h2>
        <p className="empty-state-description">
          API keys authenticate your requests to AiSensy APIs
        </p>
        
        <div className="empty-state-features">
          <h4 className="features-title">What you can do with API keys:</h4>
          <ul className="features-list">
            <li>✓ Send WhatsApp messages programmatically</li>
            <li>✓ Manage contacts and campaigns via API</li>
            <li>✓ Retrieve analytics and reports</li>
            <li>✓ Integrate with your CRM or backend systems</li>
          </ul>
        </div>
        
        <div className="empty-state-security-tip">
          <strong>Security tip:</strong> Keep your API keys secret. Never expose them in client-side code or public repos.
        </div>
        
        <button className="btn-generate-first-secondary" onClick={onGenerateClick}>
          + Generate Your First Key
        </button>
      </div>
    </div>
  )
}

export default EmptyStateView

