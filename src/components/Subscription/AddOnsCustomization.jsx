import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './AddOnsCustomization.css'

function AddOnsCustomization() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState(searchParams.get('plan') || 'pro')
  const [billingFrequency, setBillingFrequency] = useState(searchParams.get('billing') || 'annual')
  
  const handleBillingChange = (value) => {
    setBillingFrequency(value)
  }
  const [addOns, setAddOns] = useState({
    flowBuilder: { added: false, quantity: 0 },
    agentSeats: { added: false, quantity: 0 },
    webhook: { added: true, quantity: 2, free: true, included: true }
  })

  const plans = {
    pro: {
      name: 'PRO',
      price: { monthly: 3040, annual: 21542.27 },
      originalPrice: { monthly: 3040, annual: 32318.79 }
    }
  }

  const addOnsList = [
    {
      id: 'flowBuilder',
      name: 'Flow Builder',
      description: 'Definte flow builder with consimions and rpacs that entne to compirmnations.',
      originalPrice: 750,
      currentPrice: 600,
      period: 'mo.'
    },
    {
      id: 'agentSeats',
      name: 'Agent Seats',
      description: 'Agent Seat / customers sealling and tro-reolimiond compoents.',
      originalPrice: 600,
      currentPrice: 500,
      period: 'mo.'
    },
    {
      id: 'webhook',
      name: 'Webhook',
      description: 'Webhook uses wicatioaks with customer needed foirs, and runing your chancee.',
      originalPrice: 0,
      currentPrice: 2000,
      period: 'mo.',
      freeText: 'FREE @ PRO',
      included: true,
      freeQuantity: 2
    }
  ]

  const selectedPlanData = plans[selectedPlan]
  const isAnnual = billingFrequency === 'annual'
  const isQuarter = billingFrequency === 'quarter'
  
  const calculatePrice = () => {
    let basePrice, originalPrice
    if (isAnnual) {
      basePrice = selectedPlanData.price.annual
      originalPrice = selectedPlanData.originalPrice.annual
    } else if (isQuarter) {
      // Quarterly: monthly * 3 with 5% discount
      basePrice = selectedPlanData.price.monthly * 3 * 0.95
      originalPrice = selectedPlanData.originalPrice.monthly * 3
    } else {
      // Monthly: no discount
      basePrice = selectedPlanData.price.monthly
      originalPrice = selectedPlanData.originalPrice.monthly
    }
    return { current: basePrice, original: originalPrice, monthly: selectedPlanData.price.monthly }
  }

  const priceInfo = calculatePrice()

  const getAddOnPrice = (addOn) => {
    const quantity = addOns[addOn.id]?.quantity || 0
    if (quantity === 0) return 0
    
    // For webhooks: first 2 are free, charge for additional
    if (addOn.freeText && addOn.freeQuantity) {
      const freeQuantity = addOn.freeQuantity
      const chargeableQuantity = Math.max(0, quantity - freeQuantity)
      if (chargeableQuantity === 0) return 0
      
      let price
      if (isAnnual) {
        // Annual: monthly * 12, then 10% discount
        price = addOn.currentPrice * 12 * 0.90
      } else if (isQuarter) {
        // Quarterly: monthly * 3, then 5% discount
        price = addOn.currentPrice * 3 * 0.95
      } else {
        // Monthly: no discount
        price = addOn.currentPrice
      }
      return price * chargeableQuantity
    }
    
    // For other add-ons
    if (addOn.freeText) return 0
    
    let price
    if (isAnnual) {
      // Annual: monthly * 12, then 10% discount
      price = addOn.currentPrice * 12 * 0.90
    } else if (isQuarter) {
      // Quarterly: monthly * 3, then 5% discount
      price = addOn.currentPrice * 3 * 0.95
    } else {
      // Monthly: no discount
      price = addOn.currentPrice
    }
    return price * quantity
  }

  const getAddOnOriginalPrice = (addOn) => {
    const quantity = addOns[addOn.id]?.quantity || 0
    if (quantity === 0) return 0
    
    // For webhooks: first 2 are free, charge for additional
    if (addOn.freeText && addOn.freeQuantity) {
      const freeQuantity = addOn.freeQuantity
      const chargeableQuantity = Math.max(0, quantity - freeQuantity)
      if (chargeableQuantity === 0) return 0
      
      let price
      if (isAnnual) {
        // Annual: original monthly * 12
        price = addOn.originalPrice * 12
      } else if (isQuarter) {
        // Quarterly: original monthly * 3
        price = addOn.originalPrice * 3
      } else {
        // Monthly: original price
        price = addOn.originalPrice
      }
      return price * chargeableQuantity
    }
    
    // For other add-ons
    if (addOn.freeText) return 0
    
    let price
    if (isAnnual) {
      // Annual: original monthly * 12
      price = addOn.originalPrice * 12
    } else if (isQuarter) {
      // Quarterly: original monthly * 3
      price = addOn.originalPrice * 3
    } else {
      // Monthly: original price
      price = addOn.originalPrice
    }
    return price * quantity
  }

  const getTotalAddOnsPrice = () => {
    return addOnsList.reduce((total, addOn) => {
      return total + getAddOnPrice(addOn)
    }, 0)
  }

  const getDisplayTotal = () => {
    // Plan price is already calculated with discount in calculatePrice()
    return priceInfo.current + getTotalAddOnsPrice()
  }

  const getSavings = () => {
    if (isAnnual && priceInfo.original > priceInfo.current) {
      return priceInfo.original - priceInfo.current
    }
    return 0
  }

  const handleAddOn = (addOnId) => {
    setAddOns(prev => ({
      ...prev,
      [addOnId]: { ...prev[addOnId], added: true, quantity: (prev[addOnId]?.quantity || 0) + 1 }
    }))
  }

  const handleRemoveOn = (addOnId) => {
    setAddOns(prev => ({
      ...prev,
      [addOnId]: { ...prev[addOnId], added: false, quantity: 0 }
    }))
  }

  const handleQuantityChange = (addOnId, delta) => {
    setAddOns(prev => {
      const current = prev[addOnId]
      const newQuantity = Math.max(0, (current.quantity || 0) + delta)
      if (newQuantity === 0) {
        return {
          ...prev,
          [addOnId]: { ...current, quantity: 0, added: false }
        }
      }
      return {
        ...prev,
        [addOnId]: { ...current, quantity: newQuantity, added: newQuantity > 0 }
      }
    })
  }

  return (
    <div className="addons-customization">
      <div className="addons-header">
        <div className="breadcrumb">
          <span>1. Select plan</span>
          <span className="breadcrumb-arrow">›</span>
          <span className="breadcrumb-active">2. Customize with add-ons</span>
          <span className="breadcrumb-arrow">›</span>
          <span>3. Checkout</span>
        </div>
        <button className="close-btn" onClick={() => navigate(-1)}>×</button>
      </div>

      <div className="addons-content">
        <div className="addons-main">
          <h2 className="addons-title">Customize with add-ons</h2>

          <div className="addons-grid">
            {addOnsList.map((addOn) => {
              const addOnState = addOns[addOn.id]
              const isAdded = addOnState?.added || addOnState?.quantity > 0
              
              return (
                <div key={addOn.id} className={`addon-card ${isAdded ? 'added' : ''}`}>
                  {isAdded && (
                    <div className="addon-check-icon">✓</div>
                  )}
                  <h3 className="addon-name">{addOn.name}</h3>
                  <p className="addon-description">{addOn.description}</p>
                  <a href="#" className="addon-read-more">read more</a>
                  
                  <div className="addon-pricing">
                    {addOn.freeText && addOn.freeQuantity ? (
                      addOns[addOn.id]?.quantity > addOn.freeQuantity ? (
                        <span className="addon-price-current">₹{addOn.currentPrice}/{addOn.period}</span>
                      ) : (
                        <>
                          {addOn.originalPrice > 0 && addOn.originalPrice !== addOn.currentPrice && (
                            <span className="addon-price-original">₹{addOn.originalPrice}</span>
                          )}
                          <span className="addon-price-free">{addOn.freeText}</span>
                        </>
                      )
                    ) : addOn.freeText ? (
                      <span className="addon-price-free">{addOn.freeText}</span>
                    ) : (
                      <>
                        {addOn.originalPrice > 0 && addOn.originalPrice > addOn.currentPrice && (
                          <span className="addon-price-original">₹{addOn.originalPrice}</span>
                        )}
                        <span className="addon-price-current">₹{addOn.currentPrice}/{addOn.period}</span>
                      </>
                    )}
                  </div>

                  {isAdded ? (
                    <div className="addon-actions">
                      <div className="addon-quantity-selector">
                        <button 
                          className="quantity-btn minus"
                          onClick={() => handleQuantityChange(addOn.id, -1)}
                        >−</button>
                        <span className="quantity-value">{addOnState.quantity || 1}</span>
                        <button 
                          className="quantity-btn plus"
                          onClick={() => handleQuantityChange(addOn.id, 1)}
                        >+</button>
                      </div>
                      <button 
                        className="addon-remove-btn"
                        onClick={() => handleRemoveOn(addOn.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="addon-add-btn"
                      onClick={() => handleAddOn(addOn.id)}
                    >
                      Add
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="subscription-summary">
          <div className="summary-header-content">
            <h3 className="summary-title">Your new subscription</h3>
          </div>

          <div className="billing-frequency">
            <label className={`billing-option ${billingFrequency === 'monthly' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="billing" 
                value="monthly" 
                checked={billingFrequency === 'monthly'} 
                onChange={(e) => handleBillingChange(e.target.value)}
                className="billing-radio"
              />
              <div className="billing-content">
                <span className="billing-label-text">Monthly</span>
              </div>
            </label>
            <label className={`billing-option ${billingFrequency === 'quarter' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="billing" 
                value="quarter" 
                checked={billingFrequency === 'quarter'} 
                onChange={(e) => handleBillingChange(e.target.value)}
                className="billing-radio"
              />
              <div className="billing-content">
                <span className="billing-label-text">Quarter</span>
                <span className="save-badge">Save 5%</span>
              </div>
            </label>
            <label className={`billing-option ${billingFrequency === 'annual' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="billing" 
                value="annual" 
                checked={billingFrequency === 'annual'} 
                onChange={(e) => handleBillingChange(e.target.value)}
                className="billing-radio"
              />
              <div className="billing-content">
                <span className="billing-label-text">Annual</span>
                <span className="save-badge">Save 10%</span>
              </div>
            </label>
          </div>

          <div className="summary-section">
            <div className="summary-item">
              <div className="summary-item-header">
                <span className="summary-label">PLAN</span>
              </div>
              <div className="summary-item-content">
                <div className="summary-item-name">
                  AiSensy subscription
                </div>
                <div className="plan-content-wrapper">
                  <div className="plan-left-details">
                    <div className="summary-plan-name">{selectedPlanData.name} Plan</div>
                    {isAnnual && (
                      <div className="plan-billing-detail">
                        ₹{(priceInfo.current / 12).toFixed(2)} x 12 months, billed annually
                      </div>
                    )}
                  </div>
                  <div className="plan-right">
                    <div className="summary-price">
                      {isAnnual && priceInfo.original > priceInfo.current && (
                        <span className="price-original">₹{priceInfo.original.toFixed(2)}</span>
                      )}
                      <span className="price-current">₹{priceInfo.current.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-item-header">
                <span className="summary-label">ADD-ONS</span>
              </div>
              <div className="summary-item-content">
                {addOnsList.map((addOn) => {
                  const addOnState = addOns[addOn.id]
                  if (!addOnState?.added && addOnState?.quantity === 0) return null
                  
                  return (
                    <div key={addOn.id} className="addon-item">
                      <div className="addon-left">
                        <div className="addon-name-summary">
                          {addOn.included && <span className="addon-icon">✓</span>}
                          {addOn.name}
                          {addOnState.quantity > 1 && <span className="addon-quantity-badge">X {addOnState.quantity}</span>}
                        </div>
                        {addOn.freeText && addOn.freeQuantity && addOnState.quantity <= addOn.freeQuantity && (
                          <div className="addon-note">{addOn.freeText}</div>
                        )}
                      </div>
                      <div className="addon-right">
                        <div className="summary-price">
                          {addOn.freeText && addOn.freeQuantity && addOnState.quantity > addOn.freeQuantity && billingFrequency !== 'monthly' && getAddOnOriginalPrice(addOn) > getAddOnPrice(addOn) && (
                            <span className="price-original">₹{getAddOnOriginalPrice(addOn).toFixed(2)}</span>
                          )}
                          {!addOn.freeText && billingFrequency !== 'monthly' && getAddOnOriginalPrice(addOn) > getAddOnPrice(addOn) && (
                            <span className="price-original">₹{getAddOnOriginalPrice(addOn).toFixed(2)}</span>
                          )}
                          <span className="price-current">₹{getAddOnPrice(addOn).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="summary-total">
              <span>{isAnnual ? 'Annual total:' : isQuarter ? 'Quarterly total:' : 'Monthly total:'}</span>
              <span className="total-amount">₹{getDisplayTotal().toFixed(2)}</span>
            </div>

            {getSavings() > 0 && (
              <div className="savings-message">
                You annually saved Rs. {getSavings().toFixed(0)}
              </div>
            )}

            <div className="summary-note">
              Credits and certain discounts applied at checkout
            </div>
          </div>

          <div className="summary-footer">
            <button className="btn-checkout" onClick={() => {
              // Store add-ons data in sessionStorage for checkout page
              sessionStorage.setItem('checkoutAddOns', JSON.stringify(addOns))
              navigate(`/subscription/checkout?billing=${billingFrequency}&plan=${selectedPlan}`)
            }}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddOnsCustomization

