import React, { useState } from 'react'
import './OfferSection.css'

function OfferSection() {
  const [accessCode, setAccessCode] = useState('')

  return (
    <div className="offer-section">
      <div className="offer-icon">🎁</div>
      <div className="offer-content">
        <div className="offer-text">
          Got any offer access code? Activate your special discounted offer now!
        </div>
        <div className="offer-actions">
          <input
            type="text"
            placeholder="Enter access code"
            className="offer-input"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />
          <button className="btn-activate">Activate →</button>
          <button className="btn-view-offers">View Offers</button>
        </div>
      </div>
    </div>
  )
}

export default OfferSection
