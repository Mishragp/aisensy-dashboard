import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SubscriptionPayment.css'

function SubscriptionPayment() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [billingFrequency, setBillingFrequency] = useState('annual')

  const plans = {
    basic: {
      name: 'BASIC',
      price: { monthly: 1425, annual: 1425 },
      features: [
        'Upto 10 Tags',
        'Upto 5 Custom Attributes',
        'Unlimited Users',
        'Unlimited Agent Login',
        'Multi-Agent Live Chat',
        'Retargeting Campaigns',
        'Smart Campaign Manager',
        'Template Message APIs',
        '1200 message/min'
      ]
    },
    pro: {
      name: 'PRO',
      price: { monthly: 3040, annual: 21542.27 },
      originalPrice: { monthly: 3040, annual: 32318.79 },
      features: [
        'All in Basic',
        'Upto 100 Tags',
        'Upto 20 Custom Attributes',
        'Campaign Scheduler',
        'Campaign Click Tracking',
        'Campaign Budget & Analytics',
        'Project APIs',
        'Upto 5GB cloud storage'
      ]
    },
    enterprise: {
      name: 'ENTERPRISE',
      features: [
        'All in PRO',
        'Unlimited Tags',
        'Unlimited Attributes',
        'Downloadable Reports',
        'Dedicated Account Manager',
        'Priority Customer Support',
        'Webhooks',
        'Higher Messaging Speed',
        'Upto 10GB cloud storage'
      ]
    }
  }

  const selectedPlanData = plans[selectedPlan]
  const isAnnual = billingFrequency === 'annual'
  const isQuarter = billingFrequency === 'quarter'
  
  const calculatePrice = () => {
    if (selectedPlan === 'enterprise') return null
    
    let basePrice, originalPrice
    
    if (isAnnual) {
      basePrice = selectedPlanData.price.annual
      originalPrice = selectedPlanData.originalPrice ? selectedPlanData.originalPrice.annual : basePrice
    } else if (isQuarter) {
      basePrice = selectedPlanData.price.monthly * 3
      originalPrice = selectedPlanData.originalPrice ? selectedPlanData.originalPrice.monthly * 3 : basePrice
    } else {
      basePrice = selectedPlanData.price.monthly
      originalPrice = selectedPlanData.originalPrice ? selectedPlanData.originalPrice.monthly : basePrice
    }
    
    return {
      current: basePrice,
      original: originalPrice,
      monthly: selectedPlanData.price.monthly
    }
  }

  const priceInfo = calculatePrice()
  
  const getDisplayPrice = () => {
    if (selectedPlan === 'enterprise') return null
    if (isAnnual) {
      // For annual: show annual total
      return priceInfo?.current || 0
    } else if (isQuarter) {
      // For quarter: show quarterly price (monthly * 3)
      return (priceInfo?.monthly || 0) * 3
    } else {
      // For monthly: show monthly price
      return priceInfo?.monthly || 0
    }
  }

  const getAnnualTotal = () => {
    if (selectedPlan === 'enterprise') return null
    if (isAnnual) {
      return priceInfo?.current || 0
    } else if (isQuarter) {
      return (priceInfo?.monthly || 0) * 12
    } else {
      return (priceInfo?.monthly || 0) * 12
    }
  }

  const getMonthlyEquivalent = () => {
    if (selectedPlan === 'enterprise' || !priceInfo) return null
    if (isAnnual) {
      // For annual, show the discounted monthly rate
      return priceInfo.current / 12
    }
    return priceInfo.monthly
  }

  const getSavings = () => {
    if (selectedPlan === 'enterprise' || !priceInfo) return 0
    if (isAnnual && priceInfo.original && priceInfo.original > priceInfo.current) {
      return priceInfo.original - priceInfo.current
    }
    return 0
  }

  return (
    <div className="subscription-payment">
      <div className="subscription-header">
        <div className="breadcrumb">
          <span className="breadcrumb-active">1. Select plan</span>
          <span className="breadcrumb-arrow">›</span>
          <span>2. Customize with add-ons</span>
          <span className="breadcrumb-arrow">›</span>
          <span>3. Checkout</span>
        </div>
        <button className="close-btn" onClick={() => navigate(-1)}>×</button>
      </div>

      <div className="subscription-content">
        <div className="subscription-main">
          <div className="aisensy-header">
            <div className="aisensy-logo-section">
              <div className="aisensy-logo">⚡</div>
              <div className="aisensy-name">AiSensy</div>
            </div>
            <div className="aisensy-tagline">
              Orchestrate business-critical operations end-to-end with APIs, Webhooks, Tables, and AiSensy MCP.
              <a href="#" className="see-all-features">See all features</a>
            </div>
          </div>

          <div className="plans-grid">
            {/* Basic Plan */}
            <div className={`plan-card ${selectedPlan === 'basic' ? 'selected' : ''}`}>
              <label className="plan-radio-label">
                <input
                  type="radio"
                  name="plan"
                  value="basic"
                  checked={selectedPlan === 'basic'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <span className="plan-name">{plans.basic.name}</span>
              </label>
              <div className="plan-price">
                <span className="price-amount">₹{plans.basic.price.monthly.toFixed(2)}</span>
                <span className="price-period">/month</span>
              </div>
              <ul className="plan-features">
                {plans.basic.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button 
                className={`plan-select-btn ${selectedPlan === 'basic' ? 'chosen' : ''}`}
                onClick={() => setSelectedPlan('basic')}
              >
                {selectedPlan === 'basic' ? 'Chosen Plan' : 'Select Plan'} →
              </button>
            </div>

            {/* Pro Plan */}
            <div className={`plan-card ${selectedPlan === 'pro' ? 'selected' : ''}`}>
              <label className="plan-radio-label">
                <input
                  type="radio"
                  name="plan"
                  value="pro"
                  checked={selectedPlan === 'pro'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <span className="plan-name">{plans.pro.name}</span>
              </label>
              <div className="plan-price">
                <span className="price-amount">₹{plans.pro.price.monthly.toFixed(2)}</span>
                <span className="price-period">/month</span>
              </div>
              <ul className="plan-features">
                {plans.pro.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button 
                className={`plan-select-btn ${selectedPlan === 'pro' ? 'chosen' : ''}`}
                onClick={() => setSelectedPlan('pro')}
              >
                {selectedPlan === 'pro' ? 'Chosen Plan' : 'Select Plan'} →
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className={`plan-card ${selectedPlan === 'enterprise' ? 'selected' : ''}`}>
              <label className="plan-radio-label">
                <input
                  type="radio"
                  name="plan"
                  value="enterprise"
                  checked={selectedPlan === 'enterprise'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <span className="plan-name">{plans.enterprise.name}</span>
              </label>
              <ul className="plan-features">
                {plans.enterprise.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button 
                className={`plan-select-btn ${selectedPlan === 'enterprise' ? 'chosen' : ''}`}
                onClick={() => setSelectedPlan('enterprise')}
              >
                {selectedPlan === 'enterprise' ? 'Chosen Plan' : 'Select Plan'} →
              </button>
            </div>
          </div>
        </div>

        <div className="subscription-summary">
          <button className="summary-close-btn" onClick={() => navigate(-1)}>×</button>
          <div className="summary-header-content">
            <h3 className="summary-title">Your New Subscription</h3>

            <div className="billing-frequency">
              <label className={`billing-option ${billingFrequency === 'monthly' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="billing"
                  value="monthly"
                  checked={billingFrequency === 'monthly'}
                  onChange={(e) => setBillingFrequency(e.target.value)}
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
                  onChange={(e) => setBillingFrequency(e.target.value)}
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
                  onChange={(e) => setBillingFrequency(e.target.value)}
                  className="billing-radio"
                />
                <div className="billing-content">
                  <span className="billing-label-text">Annual</span>
                  <span className="save-badge">Save 10%</span>
                </div>
              </label>
            </div>
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
                    {selectedPlan !== 'enterprise' && priceInfo && isAnnual && (
                      <div className="plan-billing-detail">
                        ₹{getMonthlyEquivalent()?.toFixed(2)} x 12 months, billed annually
                      </div>
                    )}
                    {selectedPlan !== 'enterprise' && priceInfo && !isAnnual && (
                      <div className="plan-billing-detail">
                        Billed {billingFrequency === 'quarter' ? 'quarterly' : 'monthly'}
                      </div>
                    )}
                  </div>
                  {selectedPlan !== 'enterprise' && priceInfo && (
                    <div className="plan-right">
                      <div className="summary-price">
                        {isAnnual && priceInfo.original && priceInfo.original > priceInfo.current && (
                          <span className="price-original">₹{priceInfo.original.toFixed(2)}</span>
                        )}
                        <span className="price-current">₹{getDisplayPrice()?.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-item-header">
                <span className="summary-label">ADD-ONS</span>
              </div>
              
              <div className="summary-item-content">
                <div className="addon-item">
                  <div className="addon-left">
                    <div className="addon-name">Agent Seat</div>
                  </div>
                  <div className="addon-right">
                    <div className="summary-price">
                      <span className="price-current">₹0.00</span>
                    </div>
                  </div>
                </div>

                <div className="addon-item">
                  <div className="addon-left">
                    <div className="addon-name">Webhook X 2</div>
                    <div className="addon-note">Free with PRO</div>
                  </div>
                  <div className="addon-right">
                    <div className="summary-price">
                      <span className="price-current">₹0.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedPlan !== 'enterprise' && priceInfo && (
              <>
                <div className="summary-total">
                  <span>{isAnnual ? 'Annual total:' : isQuarter ? 'Quarterly total:' : 'Monthly total:'}</span>
                  <span className="total-amount">₹{getDisplayPrice()?.toFixed(2)}</span>
                </div>
                
                {!isAnnual && priceInfo && (
                  <div className="savings-message annual-savings-hint">
                    Save ₹{((priceInfo.monthly * 12) - (selectedPlanData.price.annual || 0)).toFixed(2)} per year by switching to annual billing
                  </div>
                )}
                
                {isAnnual && getSavings() > 0 && (
                  <div className="savings-message">
                    You annually saved Rs. {getSavings().toFixed(0)}
                  </div>
                )}
              </>
            )}

            <div className="summary-note">
              Credits and certain discounts applied at checkout
            </div>
          </div>

          <div className="summary-footer">
            <button className="btn-checkout" onClick={() => navigate(`/subscription/add-ons?billing=${billingFrequency}&plan=${selectedPlan}`)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPayment


