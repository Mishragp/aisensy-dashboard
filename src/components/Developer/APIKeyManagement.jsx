import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DeveloperHeader from './DeveloperHeader'
import EmptyStateView from './APIKeys/EmptyStateView'
import ListView from './APIKeys/ListView'
import GenerateKeyModal from './APIKeys/GenerateKeyModal'
import './APIKeyManagement.css'

function APIKeyManagement() {
  const navigate = useNavigate()
  const [apiKeys, setApiKeys] = useState([])
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load API keys from localStorage on mount
  useEffect(() => {
    const storedKeys = localStorage.getItem('aisensy_api_keys')
    if (storedKeys) {
      try {
        const parsedKeys = JSON.parse(storedKeys)
        setApiKeys(parsedKeys)
      } catch (error) {
        console.error('Error loading API keys:', error)
        setApiKeys([])
      }
    }
    setIsLoading(false)
  }, [])

  // Save API keys to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('aisensy_api_keys', JSON.stringify(apiKeys))
    }
  }, [apiKeys, isLoading])

  const handleGenerateKey = (keyData) => {
    const newKey = {
      id: Date.now().toString(),
      name: keyData.name || 'Unnamed Key',
      key: keyData.key,
      status: 'active',
      created: new Date().toISOString(),
      lastUsed: null,
      isVisible: true // Only show full key once
    }
    setApiKeys([newKey, ...apiKeys])
    setShowGenerateModal(false)
  }

  const handleUpdateKey = (keyId, updates) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId ? { ...key, ...updates } : key
    ))
  }

  const handleDeleteKey = (keyId) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId ? { ...key, status: 'inactive' } : key
    ))
  }

  const handleRotateKey = (keyId) => {
    const key = apiKeys.find(k => k.id === keyId)
    if (key) {
      const rotatedKey = {
        ...key,
        key: `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        lastRotated: new Date().toISOString(),
        isVisible: true
      }
      handleUpdateKey(keyId, rotatedKey)
    }
  }

  if (isLoading) {
    return <div className="loading-state">Loading...</div>
  }

  return (
    <div className="api-key-management">
      <DeveloperHeader activeTab="api-keys" />
      <div className="api-key-content">
        {apiKeys.length === 0 || apiKeys.filter(k => k.status === 'active').length === 0 ? (
          <EmptyStateView onGenerateClick={() => setShowGenerateModal(true)} />
        ) : (
          <ListView 
            apiKeys={apiKeys}
            onGenerateClick={() => setShowGenerateModal(true)}
            onUpdateKey={handleUpdateKey}
            onDeleteKey={handleDeleteKey}
            onRotateKey={handleRotateKey}
          />
        )}
      </div>

      {showGenerateModal && (
        <GenerateKeyModal
          onClose={() => setShowGenerateModal(false)}
          onSuccess={handleGenerateKey}
        />
      )}
    </div>
  )
}

export default APIKeyManagement

