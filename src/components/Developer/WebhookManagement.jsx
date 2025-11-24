import React, { useState, useEffect } from 'react'
import DeveloperHeader from './DeveloperHeader'
import WebhookDashboard from './Webhooks/WebhookDashboard'
import CreateWebhookModal from './Webhooks/CreateWebhookModal'
import PurchaseWebhookModal from './Webhooks/PurchaseWebhookModal'
import './WebhookManagement.css'

function WebhookManagement() {
  const [webhooks, setWebhooks] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const FREE_WEBHOOK_LIMIT = 2

  // Load webhooks from localStorage on mount
  useEffect(() => {
    const storedWebhooks = localStorage.getItem('aisensy_webhooks')
    if (storedWebhooks) {
      try {
        const parsedWebhooks = JSON.parse(storedWebhooks)
        setWebhooks(parsedWebhooks)
      } catch (error) {
        console.error('Error loading webhooks:', error)
        setWebhooks([])
      }
    }
    setIsLoading(false)
  }, [])

  // Save webhooks to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('aisensy_webhooks', JSON.stringify(webhooks))
    }
  }, [webhooks, isLoading])

  const activeWebhooks = webhooks.filter(w => w.status === 'active')
  const usedWebhooks = activeWebhooks.length
  const canCreateFree = usedWebhooks < FREE_WEBHOOK_LIMIT
  const remainingFree = FREE_WEBHOOK_LIMIT - usedWebhooks

  const handleCreateClick = () => {
    if (canCreateFree) {
      setShowCreateModal(true)
    } else {
      setShowPurchaseModal(true)
    }
  }

  const handleCreateWebhook = (webhookData) => {
    const newWebhook = {
      id: Date.now().toString(),
      name: webhookData.name,
      event: webhookData.event,
      endpoint: webhookData.endpoint,
      status: 'active',
      created: new Date().toISOString(),
      lastTriggered: null
    }
    setWebhooks([...webhooks, newWebhook])
    setShowCreateModal(false)
  }

  const handleUpdateWebhook = (webhookId, updates) => {
    setWebhooks(webhooks.map(w =>
      w.id === webhookId ? { ...w, ...updates } : w
    ))
  }

  const handleDeleteWebhook = (webhookId) => {
    setWebhooks(webhooks.map(w =>
      w.id === webhookId ? { ...w, status: 'inactive' } : w
    ))
  }

  const handlePurchaseSuccess = () => {
    setShowPurchaseModal(false)
    setShowCreateModal(true)
  }

  if (isLoading) {
    return <div className="loading-state">Loading...</div>
  }

  return (
    <div className="webhook-management">
      <DeveloperHeader activeTab="webhooks" />
      <div className="webhook-management-content">
        <WebhookDashboard
          webhooks={activeWebhooks}
          usedWebhooks={usedWebhooks}
          freeLimit={FREE_WEBHOOK_LIMIT}
          canCreateFree={canCreateFree}
          remainingFree={remainingFree}
          onCreateClick={handleCreateClick}
          onUpdateWebhook={handleUpdateWebhook}
          onDeleteWebhook={handleDeleteWebhook}
        />

        {showCreateModal && (
          <CreateWebhookModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={handleCreateWebhook}
            canCreateFree={canCreateFree}
          />
        )}

        {showPurchaseModal && (
          <PurchaseWebhookModal
            onClose={() => setShowPurchaseModal(false)}
            onSuccess={handlePurchaseSuccess}
            currentWebhooks={usedWebhooks}
          />
        )}
      </div>
    </div>
  )
}

export default WebhookManagement

