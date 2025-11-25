import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './WebhookDashboard.css'

function WebhookDashboard({
  webhooks,
  usedWebhooks,
  freeLimit,
  canCreateFree,
  remainingFree,
  onCreateClick,
  onUpdateWebhook,
  onDeleteWebhook
}) {
  const navigate = useNavigate()
  const [activeActionMenu, setActiveActionMenu] = useState(null)

  const handlePurchaseClick = () => {
    navigate('/subscription')
  }

  const handleActionClick = (webhookId, action) => {
    setActiveActionMenu(null)
    if (action === 'pause') {
      onUpdateWebhook(webhookId, { status: 'paused' })
    } else if (action === 'resume') {
      onUpdateWebhook(webhookId, { status: 'active' })
    } else if (action === 'remove') {
      if (window.confirm('Are you sure you want to remove this webhook?')) {
        onDeleteWebhook(webhookId)
      }
    }
  }

  return (
    <div className="webhook-dashboard">
      {/* Banner for 1 webhook used */}
      {usedWebhooks === 1 && (
        <div className="webhook-info-banner single">
          You have used 1/2 free webhook.
        </div>
      )}

      {/* Banner for 2 webhooks used */}
      {usedWebhooks >= 2 && (
        <div className="webhook-info-banner full">
          <div className="banner-content">
            <span className="banner-text">
              2/2 free webhooks used! Keep your automations flowing - upgrade now to save up to 2000 per month
            </span>
            <button className="banner-purchase-btn" onClick={handlePurchaseClick}>
              Purchase Now
            </button>
          </div>
        </div>
      )}

      <div className="webhook-dashboard-header">
        <h2 className="webhook-title">Webhooks ({webhooks.length})</h2>
        <button className="btn-add-webhook" onClick={onCreateClick}>
          + Add New Webhook
        </button>
      </div>

      <div className="webhooks-table-container">
        {webhooks.length > 0 ? (
          <table className="webhooks-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Event</th>
                <th>Endpoint</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map(webhook => (
                <tr key={webhook.id}>
                  <td className="webhook-name-cell">{webhook.name}</td>
                  <td>{webhook.event}</td>
                  <td className="webhook-endpoint-cell">
                    <code>{webhook.endpoint}</code>
                  </td>
                  <td>
                    <span className={`webhook-status ${webhook.status === 'active' ? 'active' : 'paused'}`}>
                      {webhook.status === 'active' ? '• Active' : '• Paused'}
                    </span>
                  </td>
                  <td className="webhook-actions-cell">
                    <button
                      className="action-btn edit"
                      onClick={() => onUpdateWebhook(webhook.id, { /* edit logic */ })}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleActionClick(webhook.id, webhook.status === 'active' ? 'pause' : 'resume')}
                    >
                      Pause
                    </button>
                    <button
                      className="action-btn remove"
                      onClick={() => handleActionClick(webhook.id, 'remove')}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-webhooks">
            <div className="empty-icon">🔗</div>
            <h3>No webhooks yet</h3>
            <p>Create your first webhook to receive real-time event notifications</p>
            <button className="btn-create-first-secondary" onClick={onCreateClick}>
              Create Your First Webhook
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WebhookDashboard

