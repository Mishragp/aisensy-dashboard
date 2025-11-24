import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DeveloperHeader from './DeveloperHeader'
import './APIDiscovery.css'

function APIDiscovery() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [planFilter, setPlanFilter] = useState('all')
  const [sortBy, setSortBy] = useState('most-popular')
  const [displayCount, setDisplayCount] = useState(6)
  const [showFilters, setShowFilters] = useState(false)

  // Mock API data
  const apis = [
    {
      id: 'send-message',
      name: 'Send Message API',
      plan: 'free',
      category: 'Messaging',
      description: 'Send WhatsApp messages via API',
      rateLimit: '100/min',
      popular: true
    },
    {
      id: 'receive-message',
      name: 'Receive Msg API',
      plan: 'free',
      category: 'Messaging',
      description: 'Receive incoming WhatsApp msgs',
      rateLimit: '100/min',
      popular: true
    },
    {
      id: 'campaign-analytics',
      name: 'Campaign Analytics PRO',
      plan: 'pro',
      category: 'Analytics',
      description: 'Track campaign performance & conversions',
      rateLimit: '1000/min (Pro only)',
      popular: true
    },
    {
      id: 'create-campaign',
      name: 'Create Campaign API',
      plan: 'pro',
      category: 'Campaigns',
      description: 'Create and schedule marketing campaigns',
      rateLimit: 'Unlimited (Pro)',
      popular: false
    },
    {
      id: 'contact-management',
      name: 'Contact Management API',
      plan: 'free',
      category: 'Contacts',
      description: 'Manage contacts and groups',
      rateLimit: '50/min',
      popular: false
    },
    {
      id: 'template-management',
      name: 'Template Management API',
      plan: 'pro',
      category: 'Messaging',
      description: 'Create and manage message templates',
      rateLimit: 'Unlimited (Pro)',
      popular: false
    },
    {
      id: 'webhook-create',
      name: 'Create Webhook API',
      plan: 'free',
      category: 'Webhooks',
      description: 'Create webhooks for event notifications',
      rateLimit: '20/min',
      popular: false
    },
    {
      id: 'webhook-list',
      name: 'List Webhooks API',
      plan: 'free',
      category: 'Webhooks',
      description: 'List all configured webhooks',
      rateLimit: '50/min',
      popular: false
    },
    {
      id: 'campaign-schedule',
      name: 'Schedule Campaign API',
      plan: 'pro',
      category: 'Campaigns',
      description: 'Schedule campaigns for future delivery',
      rateLimit: 'Unlimited (Pro)',
      popular: false
    },
    {
      id: 'analytics-dashboard',
      name: 'Analytics Dashboard API',
      plan: 'pro',
      category: 'Analytics',
      description: 'Get analytics data for dashboard',
      rateLimit: '500/min (Pro)',
      popular: false
    },
    {
      id: 'contact-import',
      name: 'Bulk Contact Import API',
      plan: 'pro',
      category: 'Contacts',
      description: 'Import contacts in bulk',
      rateLimit: '100/min (Pro)',
      popular: false
    },
    {
      id: 'message-status',
      name: 'Message Status API',
      plan: 'free',
      category: 'Messaging',
      description: 'Check delivery status of messages',
      rateLimit: '100/min',
      popular: true
    }
  ]

  // Filter and sort APIs
  const filteredAndSorted = useMemo(() => {
    let filtered = apis.filter(api => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!api.name.toLowerCase().includes(query) && 
            !api.description.toLowerCase().includes(query) &&
            !api.category.toLowerCase().includes(query)) {
          return false
        }
      }

      // Category filter
      if (categoryFilter !== 'all' && api.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false
      }

      // Plan filter
      if (planFilter !== 'all' && api.plan !== planFilter) {
        return false
      }

      return true
    })

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'most-popular') {
        if (a.popular && !b.popular) return -1
        if (!a.popular && b.popular) return 1
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category)
      }
      return 0
    })

    return filtered
  }, [searchQuery, categoryFilter, planFilter, sortBy])

  const displayedAPIs = filteredAndSorted.slice(0, displayCount)
  const totalAPIs = filteredAndSorted.length
  const filterRef = useRef(null)

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false)
      }
    }

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFilters])

  // Get category counts
  const categoryCounts = {
    all: apis.length,
    messaging: apis.filter(a => a.category === 'Messaging').length,
    campaigns: apis.filter(a => a.category === 'Campaigns').length,
    contacts: apis.filter(a => a.category === 'Contacts').length,
    analytics: apis.filter(a => a.category === 'Analytics').length,
    webhooks: apis.filter(a => a.category === 'Webhooks').length
  }

  // Get plan counts
  const planCounts = {
    all: apis.length,
    free: apis.filter(a => a.plan === 'free').length,
    pro: apis.filter(a => a.plan === 'pro').length
  }

  return (
    <div className="api-discovery">
      <DeveloperHeader activeTab="api-docs" />
      <div className="api-discovery-content">
        <div className="api-discovery-header">
          <h1 className="page-title">API Documentation</h1>
          <div className="search-filters-row">
          <div className="search-bar-wrapper">
            <svg className="search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.72 8.56L9.33 8.23C10.19 7.46 10.67 6.33 10.67 5.17C10.67 2.6 8.56 0.5 6 0.5C3.44 0.5 1.33 2.6 1.33 5.17C1.33 7.73 3.44 9.83 6 9.83C7.16 9.83 8.29 9.36 9.06 8.5L9.39 8.89V9.56L12.39 12.56L13.5 11.44L10.5 8.44L9.72 8.56ZM6 8.56C4.01 8.56 2.39 6.94 2.39 4.94C2.39 2.95 4.01 1.33 6 1.33C7.99 1.33 9.61 2.95 9.61 4.94C9.61 6.94 7.99 8.56 6 8.56Z" fill="#999"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search APIs by name, description, or use case.."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setDisplayCount(6)
              }}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                ×
              </button>
            )}
          </div>

          <div className="filters-controls">
            <div className="filter-dropdown-wrapper" ref={filterRef}>
              <button 
                className={`filter-dropdown-btn ${(categoryFilter !== 'all' || planFilter !== 'all') ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <svg className="filter-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Filters
                {(categoryFilter !== 'all' || planFilter !== 'all') && (
                  <span className="filter-count-badge">
                    {(categoryFilter !== 'all' ? 1 : 0) + (planFilter !== 'all' ? 1 : 0)}
                  </span>
                )}
              </button>
              
              {showFilters && (
                <div className="filter-dropdown-menu">
                  <div className="filter-section">
                    <div className="filter-section-title">Category</div>
                    <div className="filter-options">
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="category"
                          value="all"
                          checked={categoryFilter === 'all'}
                          onChange={(e) => {
                            setCategoryFilter(e.target.value)
                            setDisplayCount(6)
                          }}
                        />
                        <span>All ({categoryCounts.all})</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="category"
                          value="Messaging"
                          checked={categoryFilter === 'Messaging'}
                          onChange={(e) => {
                            setCategoryFilter(e.target.value)
                            setDisplayCount(6)
                          }}
                        />
                        <span>Messaging ({categoryCounts.messaging})</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="category"
                          value="Campaigns"
                          checked={categoryFilter === 'Campaigns'}
                          onChange={(e) => {
                            setCategoryFilter(e.target.value)
                            setDisplayCount(6)
                          }}
                        />
                        <span>Campaigns ({categoryCounts.campaigns})</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="category"
                          value="Contacts"
                          checked={categoryFilter === 'Contacts'}
                          onChange={(e) => {
                            setCategoryFilter(e.target.value)
                            setDisplayCount(6)
                          }}
                        />
                        <span>Contacts ({categoryCounts.contacts})</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="category"
                          value="Analytics"
                          checked={categoryFilter === 'Analytics'}
                          onChange={(e) => {
                            setCategoryFilter(e.target.value)
                            setDisplayCount(6)
                          }}
                        />
                        <span>Analytics ({categoryCounts.analytics})</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="category"
                          value="Webhooks"
                          checked={categoryFilter === 'Webhooks'}
                          onChange={(e) => {
                            setCategoryFilter(e.target.value)
                            setDisplayCount(6)
                          }}
                        />
                        <span>Webhooks ({categoryCounts.webhooks})</span>
                      </label>
                    </div>
                  </div>

                  <div className="filter-section">
                    <div className="filter-section-title">Plan Access</div>
                    <div className="filter-options">
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="plan"
                          value="all"
                          checked={planFilter === 'all'}
                          onChange={(e) => {
                            setPlanFilter(e.target.value)
                            setDisplayCount(6)
                          }}
                        />
                        <span>All</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="plan"
                          value="free"
                          checked={planFilter === 'free'}
                          onChange={(e) => {
                            setPlanFilter(e.target.value)
                            setDisplayCount(6)
                          }}
                        />
                        <span>Free ({planCounts.free})</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="plan"
                          value="pro"
                          checked={planFilter === 'pro'}
                          onChange={(e) => {
                            setPlanFilter(e.target.value)
                            setDisplayCount(6)
                          }}
                        />
                        <span>Pro ({planCounts.pro})</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="sort-wrapper">
              <svg className="sort-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 2L12 6M4 10L8 14L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="most-popular">Most Popular</option>
                <option value="name">Name (A-Z)</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
          </div>
        </div>
        
        {showFilters && (
          <div className="filter-overlay" onClick={() => setShowFilters(false)}></div>
        )}

        <div className="api-list-summary">
          Showing {totalAPIs} APIs
        </div>

        <div className="api-grid">
          {displayedAPIs.map(api => (
            <div
              key={api.id}
              className="api-card"
              onClick={() => navigate(`/developer/api-docs/${api.id}`)}
            >
              <div className="api-card-header">
                <h3 className="api-card-title">{api.name}</h3>
                <span className={`api-plan-badge ${api.plan === 'free' ? 'free' : 'pro'}`}>
                  {api.plan === 'free' ? 'FREE' : 'PRO'}
                </span>
              </div>
              <div className="api-card-category">{api.category}</div>
              <p className="api-card-description">{api.description}</p>
              <div className="api-card-footer">
                <span className="api-rate-limit">Rate: {api.rateLimit}</span>
                <button 
                  className={`api-card-action ${api.plan === 'pro' ? 'upgrade' : 'view'}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (api.plan === 'pro') {
                      navigate('/subscription')
                    } else {
                      navigate(`/developer/api-docs/${api.id}`)
                    }
                  }}
                >
                  {api.plan === 'pro' ? 'Upgrade to Pro' : 'View Docs →'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {displayCount < totalAPIs && (
          <div className="load-more-section">
            <button
              className="load-more-btn"
              onClick={() => setDisplayCount(prev => Math.min(prev + 6, totalAPIs))}
            >
              Load More ▼
            </button>
            <span className="load-more-info">
              Showing {displayCount} of {totalAPIs}
            </span>
          </div>
        )}

        <div className="help-resources">
          <h4 className="help-title">Need Help?</h4>
          <div className="help-links">
            <a href="#" className="help-link">Chat Support</a>
            <a href="#" className="help-link">Tutorials</a>
            <a href="#" className="help-link">API Selector</a>
            <a href="#" className="help-link">Docs</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIDiscovery

