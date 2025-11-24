import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SubscriptionPayment.css'

function SubscriptionPayment() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [billingFrequency, setBillingFrequency] = useState('annual')
  const [taskCount, setTaskCount] = useState({ professional: 750, team: 2000 })
  const [agentCount, setAgentCount] = useState(1)
  const [agentActivities, setAgentActivities] = useState(1500)

  const plans = {
    free: {
      name: 'Free',
      description: 'For Individuals starting out with automation.',
      price: { monthly: 0, annual: 0 },
      tasks: 100,
      features: [
        'AiSensy automation platform',
        'Unlimited APIs, Webhooks, and Tables',
        'Two-step integrations',
        'AiSensy Copilot'
      ]
    },
    professional: {
      name: 'Professional',
      description: 'Unlock the full power of the AiSensy platform with unlimited access to APIs, Webhooks, and Tables.',
      price: { monthly: 29.99, annual: 19.99 },
      originalPrice: { monthly: 29.99, annual: 29.99 },
      tasks: taskCount.professional,
      features: [
        'Multi-step integrations',
        'Unlimited Premium apps',
        'Webhooks',
        'Email support',
        'AI fields',
        'Conditional form logic'
      ]
    },
    team: {
      name: 'Team',
      description: 'Collaborate with your team to build and manage complete AI-powered systems.',
      price: { monthly: 103.50, annual: 69 },
      originalPrice: { monthly: 103.50, annual: 103.50 },
      tasks: taskCount.team,
      features: [
        '25 users',
        'Shared APIs and folders',
        'Shared app connections',
        'SAML SSO',
        'Premier support'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      description: 'Scale AI-powered systems across your entire organization.',
      features: [
        'Unlimited users',
        'Advanced admin permissions and app controls',
        'Annual task limits',
        'Observability',
        'Technical Account Manager'
      ]
    }
  }

  const selectedPlanData = plans[selectedPlan]
  const isAnnual = billingFrequency === 'annual'
  
  const calculatePrice = () => {
    if (selectedPlan === 'free') return { current: 0, original: 0, monthly: 0 }
    if (selectedPlan === 'enterprise') return null
    
    const basePrice = isAnnual ? selectedPlanData.price.annual : selectedPlanData.price.monthly
    const originalPrice = isAnnual ? selectedPlanData.originalPrice.annual : selectedPlanData.originalPrice.monthly
    
    return {
      current: basePrice,
      original: originalPrice,
      monthly: basePrice
    }
  }

  const calculateAgentPrice = () => {
    if (agentCount === 0) return { current: 0, original: 0, monthly: 0 }
    const pricePerAgent = isAnnual ? 33.33 : 50
    const originalPricePerAgent = 50
    return {
      current: pricePerAgent * agentCount,
      original: originalPricePerAgent * agentCount,
      monthly: pricePerAgent
    }
  }

  const priceInfo = calculatePrice()
  const agentPriceInfo = calculateAgentPrice()
  
  const totalAnnual = () => {
    if (selectedPlan === 'enterprise') return null
    const planTotal = isAnnual ? (priceInfo?.current || 0) * 12 : (priceInfo?.current || 0) * 12
    const agentTotal = isAnnual ? (agentPriceInfo?.current || 0) * 12 : (agentPriceInfo?.current || 0) * 12
    return planTotal + agentTotal
  }

  const totalSavings = () => {
    if (selectedPlan === 'free' || selectedPlan === 'enterprise') return 0
    const planSavings = isAnnual ? ((priceInfo?.original || 0) - (priceInfo?.current || 0)) * 12 : 0
    const agentSavings = isAnnual ? ((agentPriceInfo?.original || 0) - (agentPriceInfo?.current || 0)) * 12 : 0
    return planSavings + agentSavings
  }

  return (
    <div className="subscription-payment">
      <div className="subscription-header">
        <div className="breadcrumb">
          <span>1. Select plan</span>
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
            {/* Free Plan */}
            <div className={`plan-card ${selectedPlan === 'free' ? 'selected' : ''}`}>
              <label className="plan-radio-label">
                <input
                  type="radio"
                  name="plan"
                  value="free"
                  checked={selectedPlan === 'free'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <span className="plan-header">
                  <span className="plan-name">Free</span>
                  {selectedPlan === 'free' && <span className="current-plan-badge">Current plan</span>}
                </span>
              </label>
              <p className="plan-description">{plans.free.description}</p>
              <div className="plan-price">
                <span className="price-amount">$0</span>
                <span className="price-period">USD/mo</span>
              </div>
              <div className="billing-info">Billed Annually</div>
              <div className="plan-tasks">100 tasks /mo</div>
              <ul className="plan-features">
                {plans.free.features.map((feature, index) => (
                  <li key={index}>
                    <span>{feature}</span>
                    <span className="info-icon">ℹ️</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Plan */}
            <div className={`plan-card ${selectedPlan === 'professional' ? 'selected' : ''}`}>
              <label className="plan-radio-label">
                <input
                  type="radio"
                  name="plan"
                  value="professional"
                  checked={selectedPlan === 'professional'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <span className="plan-name">Professional</span>
              </label>
              <p className="plan-description">{plans.professional.description}</p>
              <div className="plan-price">
                {isAnnual && (
                  <span className="price-original">${plans.professional.originalPrice.annual}</span>
                )}
                <span className="price-amount">${plans.professional.price.annual}</span>
                <span className="price-period">USD/mo</span>
              </div>
              <div className="billing-info">Billed Annually</div>
              <div className="plan-tasks">
                <span>{taskCount.professional} tasks /mo</span>
                <div className="task-adjuster">
                  <button onClick={() => setTaskCount({...taskCount, professional: Math.max(750, taskCount.professional - 250)})}>▼</button>
                  <button onClick={() => setTaskCount({...taskCount, professional: taskCount.professional + 250})}>▲</button>
                </div>
              </div>
              <ul className="plan-features">
                {plans.professional.features.map((feature, index) => (
                  <li key={index}>
                    <span>{feature}</span>
                    <span className="info-icon">ℹ️</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Team Plan */}
            <div className={`plan-card ${selectedPlan === 'team' ? 'selected' : ''}`}>
              <label className="plan-radio-label">
                <input
                  type="radio"
                  name="plan"
                  value="team"
                  checked={selectedPlan === 'team'}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <span className="plan-name">Team</span>
              </label>
              <p className="plan-description">{plans.team.description}</p>
              <div className="plan-price">
                {isAnnual && (
                  <span className="price-original">${plans.team.originalPrice.annual}</span>
                )}
                <span className="price-amount">${plans.team.price.annual}</span>
                <span className="price-period">USD/mo</span>
              </div>
              <div className="billing-info">Billed Annually</div>
              <div className="plan-tasks">
                <span>{taskCount.team} tasks /mo</span>
                <div className="task-adjuster">
                  <button onClick={() => setTaskCount({...taskCount, team: Math.max(2000, taskCount.team - 500)})}>▼</button>
                  <button onClick={() => setTaskCount({...taskCount, team: taskCount.team + 500})}>▲</button>
                </div>
              </div>
              <ul className="plan-features">
                {plans.team.features.map((feature, index) => (
                  <li key={index}>
                    <span>{feature}</span>
                    <span className="info-icon">ℹ️</span>
                  </li>
                ))}
              </ul>
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
                <span className="plan-name">Enterprise</span>
              </label>
              <p className="plan-description">{plans.enterprise.description}</p>
              <div className="plan-features">
                <div className="enterprise-features-header">Team features, plus:</div>
                <ul>
                  {plans.enterprise.features.map((feature, index) => (
                    <li key={index}>
                      <span>{feature}</span>
                      <span className="info-icon">ℹ️</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn-contact-sales">Contact Sales</button>
            </div>
          </div>
        </div>

        <div className="subscription-summary">
          <h3 className="summary-title">Your new subscription</h3>
          
          <div className="currency-selector">
            <span>USD $</span>
            <button className="refresh-icon">🔄</button>
          </div>

          <div className="billing-frequency">
            <label className={`billing-option ${billingFrequency === 'annual' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="billing"
                value="annual"
                checked={billingFrequency === 'annual'}
                onChange={(e) => setBillingFrequency(e.target.value)}
              />
              <span>Annual</span>
              <span className="save-badge">Save 33%</span>
            </label>
            <label className={`billing-option ${billingFrequency === 'monthly' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="billing"
                value="monthly"
                checked={billingFrequency === 'monthly'}
                onChange={(e) => setBillingFrequency(e.target.value)}
              />
              <span>Monthly</span>
            </label>
          </div>

          <div className="summary-section">
            <div className="summary-item">
              <div className="summary-item-header">
                <span className="summary-label">PLAN</span>
              </div>
              <div className="summary-item-content">
                <div className="summary-item-name">
                  AiSensy {selectedPlanData.name.toUpperCase()} with {selectedPlan === 'free' ? '100' : selectedPlanData.tasks} tasks
                </div>
                {selectedPlan !== 'free' && selectedPlan !== 'enterprise' && (
                  <>
                    <div className="summary-price">
                      {isAnnual && (
                        <span className="price-original">₹{(priceInfo.original * 12).toFixed(2)}</span>
                      )}
                      <span className="price-current">₹{(priceInfo.current * 12).toFixed(2)}</span>
                    </div>
                    <div className="summary-price-detail">
                      ₹{priceInfo.current.toFixed(2)} x 12 months, billed annually
                    </div>
                  </>
                )}
                {selectedPlan === 'free' && (
                  <div className="summary-price">₹0.00</div>
                )}
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-item-header">
                <span className="summary-label">ADD-ONS</span>
              </div>
              
              <div className="summary-item-content">
                <div className="addon-item">
                  <div className="addon-name">Agents:</div>
                  <div className="addon-details">
                    Pro with {agentActivities} activities
                  </div>
                    <div className="summary-price">
                      {agentCount > 0 && (
                        <>
                          {isAnnual && (
                            <span className="price-original">₹{(agentPriceInfo.original * 12).toFixed(2)}</span>
                          )}
                          <span className="price-current">₹{(agentPriceInfo.current * 12).toFixed(2)}</span>
                        </>
                      )}
                      {agentCount === 0 && <span className="price-current">₹0.00</span>}
                    </div>
                    <div className="summary-price-detail">
                      {agentCount > 0 && isAnnual && `₹${agentPriceInfo.monthly.toFixed(2)} x 12 months, billed annually`}
                    </div>
                </div>

                <div className="addon-item">
                  <div className="addon-name">Chatbots:</div>
                  <div className="addon-details">Free</div>
                  <div className="summary-price">₹0.00</div>
                </div>
              </div>
            </div>

            {selectedPlan !== 'enterprise' && (
              <>
                <div className="summary-total">
                  <span>Annual total:</span>
                  <span className="total-amount">₹{totalAnnual().toFixed(2)} USD</span>
                </div>
                
                {totalSavings() > 0 && (
                  <div className="savings-box">
                    Total annual savings: ₹{totalSavings().toFixed(2)}
                  </div>
                )}
              </>
            )}

            <div className="summary-note">
              Credits and certain discounts applied at checkout
            </div>

            <button className="btn-next">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPayment

