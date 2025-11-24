import React, { useState } from 'react'
import './CreateWebhookModal.css'

const WEBHOOK_EVENTS = [
  { id: 'message-received', name: 'Message Received', description: 'Triggered when a new message is received' },
  { id: 'message-sent', name: 'Message Sent', description: 'Triggered when a message is sent' },
  { id: 'campaign-delivered', name: 'Campaign Delivered', description: 'Triggered when a campaign is delivered' },
  { id: 'order-placed', name: 'Order Placed', description: 'Triggered when an order is placed' },
  { id: 'contact-updated', name: 'Contact Updated', description: 'Triggered when a contact is updated' },
  { id: 'payment-received', name: 'Payment Received', description: 'Triggered when a payment is received' },
]

function CreateWebhookModal({ onClose, onSuccess, canCreateFree }) {
  const [selectedEvent, setSelectedEvent] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [webhookName, setWebhookName] = useState('')
  const [testWebhook, setTestWebhook] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Auto-suggest name based on selected event
  React.useEffect(() => {
    if (selectedEvent && !webhookName) {
      const event = WEBHOOK_EVENTS.find(e => e.id === selectedEvent)
      if (event) {
        setWebhookName(event.name + ' Notifications')
      }
    }
  }, [selectedEvent, webhookName])

  const handleCreate = () => {
    if (!selectedEvent || !endpoint || !webhookName) return
    
    const event = WEBHOOK_EVENTS.find(e => e.id === selectedEvent)
    onSuccess({
      event: event.name,
      endpoint: endpoint,
      name: webhookName,
      testWebhook: testWebhook
    })
  }

  const getWebhookPayload = () => {
    const eventKey = selectedEvent?.replace(/-/g, '.') || 'webhook.event'
    return JSON.stringify({
      event: eventKey,
      timestamp: new Date().toISOString(),
      data: {
        id: 'example_123',
        status: 'success',
        message: 'This is a test webhook payload'
      }
    }, null, 2)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getWebhookPayload())
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const selectedEventData = WEBHOOK_EVENTS.find(e => e.id === selectedEvent)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-webhook-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Webhook</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div className="form-group">
            <label htmlFor="event-select">Event Type *</label>
            <select
              id="event-select"
              className="form-select"
              value={selectedEvent}
              onChange={(e) => {
                setSelectedEvent(e.target.value)
                if (e.target.value && !webhookName) {
                  const event = WEBHOOK_EVENTS.find(ev => ev.id === e.target.value)
                  if (event) {
                    setWebhookName(event.name + ' Notifications')
                  }
                }
              }}
            >
              <option value="">Select an event type</option>
              {WEBHOOK_EVENTS.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name} - {event.description}
                </option>
              ))}
            </select>
            {selectedEventData && (
              <div className="event-description-hint">
                {selectedEventData.description}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="endpoint">Endpoint URL *</label>
            <input
              type="text"
              id="endpoint"
              className="form-input"
              placeholder="https://mysite.com/webhook-endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
            <div className="input-hint">Must be a publicly accessible HTTPS URL</div>
          </div>

          <div className="form-group">
            <label htmlFor="webhookName">Webhook Name *</label>
            <input
              type="text"
              id="webhookName"
              className="form-input"
              placeholder="Campaign Delivery Notifications"
              value={webhookName}
              onChange={(e) => setWebhookName(e.target.value)}
            />
            <div className="input-hint">(Auto-suggested based on event type)</div>
          </div>

          <div className="form-group radio-wrapper">
            <div 
              className={`radio-option ${testWebhook ? 'selected' : ''}`}
              onClick={() => setTestWebhook(!testWebhook)}
            >
              <div className="radio-circle">
                {testWebhook && <div className="radio-dot"></div>}
              </div>
              <span className="radio-text">Send test webhook to verify endpoint</span>
            </div>
          </div>

          {selectedEvent && endpoint && (
            <div className="code-snippet-section">
              <div className="code-snippet-header">
                <span className="code-snippet-title">Webhook Payload Sample:</span>
                <button className="btn-copy-code" onClick={handleCopyCode}>
                  {copiedCode ? '✓ Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="code-snippet">
                <code>{getWebhookPayload()}</code>
              </pre>
            </div>
          )}

          <div className="help-links">
            <a href="#" className="help-link">Learn: What are webhooks?</a>
            <a href="#" className="help-link">View all events</a>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-create"
            onClick={handleCreate}
            disabled={!selectedEvent || !endpoint || !webhookName}
          >
            Create Webhook
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateWebhookModal

