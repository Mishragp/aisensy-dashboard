import React from 'react'
import { useNavigate } from 'react-router-dom'
import './APIKeysPanel.css'

function APIKeysPanel() {
  const navigate = useNavigate()
  return (
    <div className="api-keys-panel">
      <div className="panel-header">
        <h3 className="panel-title">Your API Keys (0)</h3>
      </div>
      
      <div className="panel-content">
        <p className="panel-description">
          API keys authenticate your requests to AiSensy APIs. They're required for all API calls and should be kept secret.
        </p>
        
        <div className="features-list">
          <h4 className="features-title">What you can do:</h4>
          <ul className="features-items">
            <li>✓ Send WhatsApp messages programmatically</li>
            <li>✓ Manage contacts and campaigns via API</li>
            <li>✓ Retrieve analytics and reports</li>
            <li>✓ Integrate with your CRM or backend systems</li>
          </ul>
        </div>
        
        <div className="security-tip">
          <strong>Security Tip:</strong> Never expose keys in client-side code or repos.
        </div>
        
        <div className="panel-actions">
          <button className="btn-primary" onClick={() => navigate('/developer/api-keys')}>
            + Generate Your First API Key
          </button>
          <button className="btn-secondary" onClick={() => navigate('/developer/api-keys')}>
            View All Keys →
          </button>
        </div>
      </div>
    </div>
  )
}

export default APIKeysPanel

