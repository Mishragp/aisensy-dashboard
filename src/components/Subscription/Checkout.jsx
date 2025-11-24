import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedPlan] = useState(searchParams.get('plan') || 'pro')
  const [billingFrequency] = useState(searchParams.get('billing') || 'annual')
  const [itContact, setItContact] = useState('')
  const [procurementContact, setProcurementContact] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showTaxModal, setShowTaxModal] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    country: ''
  })
  const [taxData, setTaxData] = useState({
    country: '',
    taxId: ''
  })
  const [taxNumber, setTaxNumber] = useState('')

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
      originalPrice: 750,
      currentPrice: 600,
      freeQuantity: 0,
      included: false
    },
    {
      id: 'agentSeats',
      name: 'Agent Seats',
      originalPrice: 600,
      currentPrice: 500,
      freeQuantity: 0,
      included: false
    },
    {
      id: 'webhook',
      name: 'Webhook',
      originalPrice: 0,
      currentPrice: 2000,
      freeQuantity: 2,
      included: true
    }
  ]

  // Get add-ons data from sessionStorage
  const [addOns] = useState(() => {
    try {
      const stored = sessionStorage.getItem('checkoutAddOns')
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error('Error parsing add-ons data:', e)
    }
    return {
      flowBuilder: { added: false, quantity: 0 },
      agentSeats: { added: false, quantity: 0 },
      webhook: { added: false, quantity: 0 }
    }
  })

  const selectedPlanData = plans[selectedPlan]
  const isAnnual = billingFrequency === 'annual'
  const isQuarter = billingFrequency === 'quarter'

  const calculatePrice = () => {
    let basePrice, originalPrice
    if (isAnnual) {
      basePrice = selectedPlanData.price.annual
      originalPrice = selectedPlanData.originalPrice.annual
    } else if (isQuarter) {
      basePrice = selectedPlanData.price.monthly * 3 * 0.95
      originalPrice = selectedPlanData.originalPrice.monthly * 3
    } else {
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
    if (addOn.freeQuantity) {
      const chargeableQuantity = Math.max(0, quantity - addOn.freeQuantity)
      if (chargeableQuantity === 0) return 0

      let price
      if (isAnnual) {
        price = addOn.currentPrice * 12 * 0.90
      } else if (isQuarter) {
        price = addOn.currentPrice * 3 * 0.95
      } else {
        price = addOn.currentPrice
      }
      return price * chargeableQuantity
    }

    // For other add-ons
    let price
    if (isAnnual) {
      price = addOn.currentPrice * 12 * 0.90
    } else if (isQuarter) {
      price = addOn.currentPrice * 3 * 0.95
    } else {
      price = addOn.currentPrice
    }
    return price * quantity
  }

  const getAddOnOriginalPrice = (addOn) => {
    const quantity = addOns[addOn.id]?.quantity || 0
    if (quantity === 0) return 0

    let originalEffectivePrice = addOn.originalPrice

    if (addOn.freeQuantity) {
      if (quantity <= addOn.freeQuantity) return 0
      originalEffectivePrice = addOn.originalPrice * (quantity - addOn.freeQuantity)
    } else {
      originalEffectivePrice = addOn.originalPrice * quantity
    }

    if (isAnnual) {
      return originalEffectivePrice * 12
    } else if (isQuarter) {
      return originalEffectivePrice * 3
    } else {
      return originalEffectivePrice
    }
  }

  const getTotalDue = () => {
    const planPrice = priceInfo.current
    const addOnsTotal = addOnsList.reduce((total, addOn) => {
      return total + getAddOnPrice(addOn)
    }, 0)
    return planPrice + addOnsTotal
  }

  const getNextChargeDate = () => {
    const today = new Date()
    if (isAnnual) {
      today.setFullYear(today.getFullYear() + 1)
    } else if (isQuarter) {
      today.setMonth(today.getMonth() + 3)
    } else {
      today.setMonth(today.getMonth() + 1)
    }
    return today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getNextChargeAmount = () => {
    return getTotalDue()
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="breadcrumb">
          <span>1. Select plan</span>
          <span className="breadcrumb-arrow">›</span>
          <span>2. Customize with add-ons</span>
          <span className="breadcrumb-arrow">›</span>
          <span className="breadcrumb-active">3. Checkout</span>
        </div>
        <button className="close-btn" onClick={() => navigate(-1)}>×</button>
      </div>

        <div className="checkout-content">
        <div className="checkout-main">
          <h1 className="checkout-title">Checkout</h1>

          <div className="checkout-section">
            <h2 className="section-title">Payment details</h2>
            <p className="section-description">
              Add a payment method to make purchases and keep your account active.
            </p>
            <div className="payment-icons">
              <div className="payment-icon visa" title="VISA">
                <svg viewBox="0 0 48 32" width="48" height="32">
                  <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                  <text x="24" y="22" fill="white" font-size="11" font-weight="700" text-anchor="middle" font-family="Arial, sans-serif">VISA</text>
                </svg>
              </div>
              <div className="payment-icon mastercard" title="Mastercard">
                <svg viewBox="0 0 48 32" width="48" height="32">
                  <rect width="48" height="32" rx="4" fill="#EB001B"/>
                  <circle cx="18" cy="16" r="8" fill="#F79E1B" opacity="0.9"/>
                  <circle cx="30" cy="16" r="8" fill="#FF5F00" opacity="0.9"/>
                </svg>
              </div>
              <div className="payment-icon upi" title="UPI">
                <svg viewBox="0 0 48 32" width="48" height="32">
                  <rect width="48" height="32" rx="4" fill="#0070BA"/>
                  <text x="24" y="21" fill="white" font-size="11" font-weight="700" text-anchor="middle" font-family="Arial, sans-serif">UPI</text>
                </svg>
              </div>
              <div className="payment-icon rupay" title="RuPay">
                <svg viewBox="0 0 48 32" width="48" height="32">
                  <rect width="48" height="32" rx="4" fill="#003087"/>
                  <text x="24" y="21" fill="white" font-size="9" font-weight="700" text-anchor="middle" font-family="Arial, sans-serif">RuPay</text>
                </svg>
              </div>
            </div>
            <button className="btn-add-payment" onClick={() => setShowPaymentModal(true)}>Add payment method</button>
          </div>

          <div className="checkout-section">
            <h2 className="section-title">Billing profile</h2>
            <p className="section-description">
              Add a registered Tax ID or VAT number to your purchase receipts.
            </p>
            {taxNumber ? (
              <div className="tax-number-display">
                <span>{taxNumber}</span>
                <button className="btn-edit-tax" onClick={() => setShowTaxModal(true)}>Edit</button>
              </div>
            ) : (
              <button className="btn-add-tax" onClick={() => setShowTaxModal(true)}>Add tax number</button>
            )}
          </div>

          <div className="checkout-section">
            <h2 className="section-title">Extra contacts</h2>
            
            <div className="contact-subsection">
              <h3 className="subsection-title">Add IT contact</h3>
              <input
                type="email"
                className="contact-input"
                placeholder="Enter IT contact's email"
                value={itContact}
                onChange={(e) => setItContact(e.target.value)}
              />
              <p className="contact-description">
                Add an IT contact to help with account recovery if needed. They may also receive some product-related news and updates.
              </p>
            </div>

            <div className="contact-subsection">
              <h3 className="subsection-title">Add procurement contact</h3>
              <input
                type="email"
                className="contact-input"
                placeholder="Enter procurement contact's email"
                value={procurementContact}
                onChange={(e) => setProcurementContact(e.target.value)}
              />
              <p className="contact-description">
                Add a contact to receive product-related news and updates.
              </p>
            </div>

            <button className="btn-save-contacts">Save</button>
          </div>
        </div>

        <div className="checkout-summary">
          <h2 className="summary-title">Purchase summary</h2>

          <div className="billing-frequency-summary">
            <label className={`billing-option-summary ${billingFrequency === 'monthly' ? 'selected' : ''}`}>
              <input type="radio" name="billing-summary" value="monthly" checked={billingFrequency === 'monthly'} readOnly className="billing-radio-summary" />
              <div className="billing-content-summary">
                <span>Monthly</span>
              </div>
            </label>
            <label className={`billing-option-summary ${billingFrequency === 'quarter' ? 'selected' : ''}`}>
              <input type="radio" name="billing-summary" value="quarter" checked={billingFrequency === 'quarter'} readOnly className="billing-radio-summary" />
              <div className="billing-content-summary">
                <span>Quarter</span>
                <span className="save-badge-summary">Save 5%</span>
              </div>
            </label>
            <label className={`billing-option-summary ${billingFrequency === 'annual' ? 'selected' : ''}`}>
              <input type="radio" name="billing-summary" value="annual" checked={billingFrequency === 'annual'} readOnly className="billing-radio-summary" />
              <div className="billing-content-summary">
                <span>Annual</span>
                <span className="save-badge-summary">Save 10%</span>
              </div>
            </label>
          </div>

          <div className="subscription-changes">
            <div className="changes-label">SUBSCRIPTION CHANGES</div>
            
            <div className="summary-section-checkout">
              <div className="summary-item-checkout">
                <div className="summary-item-header-checkout">
                  <span className="summary-label-checkout">PLAN</span>
                </div>
                <div className="summary-item-content-checkout">
                  <div className="plan-content-wrapper-checkout">
                    <div className="plan-left-details-checkout">
                      <div className="summary-plan-name-checkout">{selectedPlanData.name} Plan</div>
                      {isAnnual && (
                        <div className="plan-billing-detail-checkout">
                          ₹{(priceInfo.current / 12).toFixed(2)} x 12 months, billed annually
                        </div>
                      )}
                      {isQuarter && (
                        <div className="plan-billing-detail-checkout">
                          ₹{(priceInfo.current / 3).toFixed(2)} x 3 months, billed quarterly
                        </div>
                      )}
                      {!isAnnual && !isQuarter && (
                        <div className="plan-billing-detail-checkout">
                          Billed monthly
                        </div>
                      )}
                    </div>
                    <div className="plan-right-checkout">
                      <div className="summary-price-checkout">
                        {isAnnual && priceInfo.original > priceInfo.current && (
                          <span className="price-original-checkout">₹{priceInfo.original.toFixed(2)}</span>
                        )}
                        {isQuarter && priceInfo.original > priceInfo.current && (
                          <span className="price-original-checkout">₹{priceInfo.original.toFixed(2)}</span>
                        )}
                        <span className="price-current-checkout">₹{priceInfo.current.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="summary-item-checkout">
                <div className="summary-item-header-checkout">
                  <span className="summary-label-checkout">ADD-ONS</span>
                </div>
                <div className="summary-item-content-checkout">
                  {addOnsList.map((addOn) => {
                    const addOnState = addOns[addOn.id]
                    if (!addOnState?.added && addOnState?.quantity === 0) return null
                    
                    const price = getAddOnPrice(addOn)
                    const originalPrice = getAddOnOriginalPrice(addOn)

                    return (
                      <div key={addOn.id} className="addon-item-checkout">
                        <div className="addon-left-checkout">
                          <div className="addon-name-summary-checkout">
                            {addOnState.included && <span className="addon-icon-checkout">✓</span>}
                            {addOn.name}
                            {addOnState.quantity > 1 && <span className="addon-quantity-badge-checkout">X {addOnState.quantity}</span>}
                          </div>
                          {addOn.freeQuantity && addOnState.quantity <= addOn.freeQuantity && (
                            <div className="addon-note-checkout">FREE @ PRO</div>
                          )}
                        </div>
                        <div className="addon-right-checkout">
                          <div className="summary-price-checkout">
                            {price > 0 && billingFrequency !== 'monthly' && originalPrice > price && (
                              <span className="price-original-checkout">₹{originalPrice.toFixed(2)}</span>
                            )}
                            {price > 0 && (
                              <span className="price-current-checkout">₹{price.toFixed(2)}</span>
                            )}
                            {price === 0 && (
                              <span className="price-current-checkout">FREE</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="total-due">
            <div className="total-label">Total due today</div>
            <div className="total-amount">₹{getTotalDue().toFixed(2)}</div>
          </div>

          <button className="btn-pay-now">Pay now</button>

          <div className="next-charge">
            <div className="next-charge-label">
              Next {isAnnual ? 'annual' : isQuarter ? 'quarterly' : 'monthly'} charge on
              <span className="info-icon">ℹ️</span>
            </div>
            <div className="next-charge-date">{getNextChargeDate()}</div>
            <div className="next-charge-amount">₹{getNextChargeAmount().toFixed(2)} /{isAnnual ? 'yr' : isQuarter ? 'quarter' : 'mo'}</div>
          </div>

          <div className="info-section">
            <div className="info-title">All sales final</div>
            <div className="info-text">
              Payments for AiSensy subscriptions are non-refundable. You can change or cancel your plan at any time.
            </div>
          </div>

          <div className="info-section">
            <div className="info-title">Plan auto-renewal</div>
            <div className="info-text">
              Proceeding by selecting the button above will enroll you in a recurring subscription plan. AiSensy will charge your payment method this amount {isAnnual ? 'yearly' : isQuarter ? 'quarterly' : 'monthly'} plus applicable taxes, minus any credits or discounts.
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Payment details</h2>
              <button className="modal-close" onClick={() => setShowPaymentModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label className="modal-label">Cardholder name <span className="required">*</span></label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Full name"
                  value={paymentData.cardholderName}
                  onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">Card number <span className="required">*</span></label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="1234 1234 1234 1234"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                />
              </div>
              <div className="modal-row">
                <div className="modal-field">
                  <label className="modal-label">Expiry <span className="required">*</span></label>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="MM / YY"
                    value={paymentData.expiry}
                    onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                  />
                </div>
                <div className="modal-field">
                  <label className="modal-label">CVC <span className="required">*</span></label>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="CVC"
                    value={paymentData.cvc}
                    onChange={(e) => setPaymentData({...paymentData, cvc: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-field">
                <label className="modal-label">Country <span className="required">*</span></label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Search or select country"
                  value={paymentData.country}
                  onChange={(e) => setPaymentData({...paymentData, country: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-cancel" onClick={() => setShowPaymentModal(false)}>Cancel</button>
              <button className="modal-btn-save" onClick={() => {
                // Handle save payment
                setShowPaymentModal(false)
              }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Tax Details Modal */}
      {showTaxModal && (
        <div className="modal-overlay" onClick={() => setShowTaxModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add a registered Tax ID or VAT number</h2>
              <button className="modal-close" onClick={() => setShowTaxModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label className="modal-label">Country <span className="required">*</span></label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Search or select country"
                  value={taxData.country}
                  onChange={(e) => setTaxData({...taxData, country: e.target.value})}
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">Tax ID (ex. VAT or GST) <span className="required">*</span></label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Tax ID (ex. VAT or GST)"
                  value={taxData.taxId}
                  onChange={(e) => setTaxData({...taxData, taxId: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-cancel" onClick={() => setShowTaxModal(false)}>Cancel</button>
              <button className="modal-btn-save" onClick={() => {
                if (taxData.taxId) {
                  setTaxNumber(taxData.taxId)
                }
                setShowTaxModal(false)
              }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout

