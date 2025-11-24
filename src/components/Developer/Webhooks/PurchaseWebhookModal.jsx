import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PurchaseWebhookModal.css'

function PurchaseWebhookModal({ onClose, onSuccess, currentWebhooks }) {
  const navigate = useNavigate()
  const [selectedQuantity, setSelectedQuantity] = useState('3')

  const pricingOptions = [
    { quantity: 1, price: 999, savings: 0 },
    { quantity: 3, price: 2700, savings: 10, bestValue: true },
    { quantity: 5, price: 4400, savings: 12 },
    { quantity: 10, price: 8000, savings: 20 }
  ]

  const selectedOption = pricingOptions.find(opt => opt.quantity.toString() === selectedQuantity)

  const handlePurchase = () => {
    navigate('/subscription')
  }

  return (
    <div className="modal-overlay purchase-overlay" onClick={onClose}>
      <div className="purchase-webhook-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Purchase Additional Webhooks</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div className="purchase-info">
            <p className="info-text">You've used your 2 free webhooks</p>
            <p className="current-webhooks">Current webhooks: {currentWebhooks}</p>
          </div>

          <div className="webhook-selection-section">
            <h3 className="selection-title">Choose how many webhooks you need:</h3>
            
            <div className="pricing-options">
              {pricingOptions.map(option => (
                <label
                  key={option.quantity}
                  className={`pricing-option ${selectedQuantity === option.quantity.toString() ? 'selected' : ''} ${option.bestValue ? 'best-value' : ''}`}
                >
                  <input
                    type="radio"
                    name="webhookQuantity"
                    value={option.quantity}
                    checked={selectedQuantity === option.quantity.toString()}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                  />
                  <div className="option-content">
                    <div className="option-header">
                      <span className="option-quantity">{option.quantity} webhook{option.quantity > 1 ? 's' : ''}</span>
                      {option.bestValue && (
                        <span className="best-value-badge">Best Value</span>
                      )}
                    </div>
                    <div className="option-price">
                      ₹{option.price.toLocaleString()} {option.savings > 0 && (
                        <span className="savings">(save {option.savings}%)</span>
                      )}
                    </div>
                    {option.quantity > 1 && (
                      <div className="per-webhook">₹{(option.price / option.quantity).toLocaleString()} per webhook</div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="upgrade-section">
            <div className="upgrade-header">
              <span className="upgrade-icon">★</span>
              <span>Or upgrade to Pro Plan for unlimited webhooks</span>
            </div>
            <div className="upgrade-features">
              <span>Pro includes: 20+ APIs, unlimited webhooks, 1000 req/min, priority support</span>
            </div>
            <button className="btn-view-pro" onClick={() => navigate('/subscription')}>View Pro Plan Features →</button>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-purchase" onClick={handlePurchase}>
            Purchase & Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default PurchaseWebhookModal

