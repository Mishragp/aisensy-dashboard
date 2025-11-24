import React, { useState } from 'react'
import './GenerateKeyModal.css'

function GenerateKeyModal({ onClose, onSuccess }) {
  const [step, setStep] = useState(1) // 1 = input form, 2 = result
  const [keyName, setKeyName] = useState('')
  const [generatedKey, setGeneratedKey] = useState('')
  const [keyCopied, setKeyCopied] = useState(false)
  const [keyStored, setKeyStored] = useState(false)

  const generateAPIKey = () => {
    const prefix = 'sk_live_'
    const randomPart = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const randomPart2 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    return prefix + randomPart + randomPart2
  }

  const handleGenerate = () => {
    // Generate key immediately and show result
    const newKey = generateAPIKey()
    setGeneratedKey(newKey)
    setStep(2)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey)
    setKeyCopied(true)
    setTimeout(() => setKeyCopied(false), 2000)
  }

  const handleComplete = () => {
    if (keyStored) {
      onSuccess({
        name: keyName || 'Unnamed Key',
        key: generatedKey
      })
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="generate-key-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {step === 2 ? '✓ API Key Generated & Ready to Use!' : 'Generate New API Key'}
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {step === 1 && (
          <div className="progress-indicator">
            <span className="progress-step active">
              • Generate Key
            </span>
          </div>
        )}

        {step === 2 && (
          <div className="progress-indicator">
            <span className="progress-step completed">
              ✓ Key Generated
            </span>
          </div>
        )}

        <div className="modal-content">
          {step === 1 && (
            <div className="step-content step-1">
              <h3 className="step-title">Name Your Key</h3>
              <p className="step-description">
                Give your API key a descriptive name to easily identify it later.
              </p>
              
              <div className="input-group">
                <label>Key Name (Optional but recommended)</label>
                <input
                  type="text"
                  placeholder="e.g., Production-Backend-Server"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="key-name-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleGenerate()
                    }
                  }}
                />
              </div>

              <div className="naming-tips">
                <span className="naming-tips-text">
                  💡 <strong>Naming Tips:</strong> Include environment (prod/staging/dev), usage context (backend/mobile), avoid sensitive info. Example: 'prod-mobile-app-v2'
                </span>
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={onClose}>Cancel</button>
                <button className="btn-generate" onClick={handleGenerate}>
                  Generate →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content step-3">
              <div className="success-content">
                <div className="key-display-section">
                  <label>Your API key: {keyName || 'Unnamed Key'}</label>
                  <div className="key-value-container">
                    <input
                      type="text"
                      readOnly
                      value={generatedKey}
                      className="generated-key-input"
                    />
                    <button 
                      className={`btn-copy ${keyCopied ? 'copied' : ''}`}
                      onClick={handleCopyKey}
                    >
                      {keyCopied ? '✓ Copied!' : 'Copy to Clipboard'}
                    </button>
                  </div>
                </div>

                <div className="status-badge-success">
                  ✓ Status: ACTIVE & READY TO USE
                </div>

                <div className="warning-box">
                  <strong>▲ IMPORTANT:</strong> Save this key now! You won't be able to see it again after closing this window.
                </div>

                <div className="confirmation-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={keyStored}
                      onChange={(e) => setKeyStored(e.target.checked)}
                    />
                    <span className="custom-checkbox"></span>
                    <span className="checkbox-text">I've copied and securely stored this key</span>
                  </label>
                </div>

                <div className="whats-next">
                  <h4>What's Next?</h4>
                  <ul>
                    <li>1. Use this key in your API requests</li>
                    <li>2. Add Authorization header: Bearer &lt;key&gt;</li>
                    <li>3. Test with your first API call</li>
                  </ul>
                  <div className="next-actions">
                    <button className="btn-link">View Integration Guide</button>
                    <button className="btn-link">Test with API →</button>
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn-primary"
                    onClick={handleComplete}
                    disabled={!keyStored}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GenerateKeyModal

