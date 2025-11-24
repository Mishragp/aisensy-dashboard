import React from 'react'
import { useNavigate } from 'react-router-dom'
import './WebhooksPanel.css'

function WebhooksPanel() {
  const navigate = useNavigate()
  
  return (
    <div className="webhooks-panel">
      <div className="panel-header">
        <h3 className="panel-title">Your Webhooks (0/2 free)</h3>
      </div>
      
      <div className="panel-content">
        <div className="webhook-intro">
          <h4 className="webhook-question">What are webhooks?</h4>
          <p className="webhook-explanation">
            Webhooks notify your app when events happen in real-time (e.g., message delivered, campaign completed, contact updated).
          </p>
        </div>
        
        <div className="examples-section">
          <h4 className="examples-title">Real-world examples:</h4>
          <ul className="examples-list">
            <li>• Get notified when a message is delivered to a contact</li>
            <li>• Track campaign completion status in real-time</li>
            <li>• Update your database when contacts change</li>
            <li>• Sync delivery reports with your analytics platform</li>
          </ul>
        </div>
        
        <div className="pricing-info">
          <strong>Webhook Pricing:</strong> You get 2 free webhooks. Additional webhooks: ₹999 each (one-time) Or upgrade to Pro Plan for unlimited webhooks.
        </div>
        
        <div className="panel-actions">
          <button className="btn-primary" onClick={() => navigate('/developer/webhooks')}>
            + Create Your First Webhook
          </button>
          <button className="btn-link">Learn More About Webhooks</button>
          <button className="btn-secondary" onClick={() => navigate('/developer/webhooks')}>
            View All Webhooks →
          </button>
        </div>
      </div>
    </div>
  )
}

export default WebhooksPanel

