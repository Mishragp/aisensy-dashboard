import React, { useState, useMemo, useEffect, useRef } from 'react'
import './ListView.css'

function ListView({ apiKeys, onGenerateClick, onUpdateKey, onDeleteKey, onRotateKey }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('most-recent')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeActionMenu, setActiveActionMenu] = useState(null)
  const [menuPosition, setMenuPosition] = useState('bottom') // 'top' or 'bottom'
  const [menuButtonRect, setMenuButtonRect] = useState(null)
  const [copyToast, setCopyToast] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const filterRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    if (!activeActionMenu) return

    const handleClickOutside = (event) => {
      // Check if click is on menu button or menu content
      const target = event.target
      const menuWrapper = target.closest('.action-menu-wrapper')
      
      // If click is outside any menu wrapper, close menu
      if (!menuWrapper) {
        setActiveActionMenu(null)
      }
    }

    // Add listener with a small delay to avoid immediate closing
    const timer = setTimeout(() => {
      window.addEventListener('click', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('click', handleClickOutside)
    }
  }, [activeActionMenu])

  // Auto hide copy toast
  useEffect(() => {
    if (copyToast) {
      const timer = setTimeout(() => {
        setCopyToast(null)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [copyToast])

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

  // Filter and sort keys
  const filteredAndSortedKeys = useMemo(() => {
    let filtered = apiKeys.filter(key => {
      // Status filter
      if (filterStatus === 'active' && key.status !== 'active') return false
      if (filterStatus === 'inactive' && key.status !== 'inactive') return false
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return key.name.toLowerCase().includes(query) || 
               key.key.toLowerCase().includes(query)
      }
      
      return true
    })

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'most-recent') {
        return new Date(b.created) - new Date(a.created)
      } else if (sortBy === 'oldest') {
        return new Date(a.created) - new Date(b.created)
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
      return 0
    })

    return filtered
  }, [apiKeys, searchQuery, filterStatus, sortBy])

  // Pagination
  const totalKeys = filteredAndSortedKeys.length
  const totalPages = Math.ceil(totalKeys / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedKeys = filteredAndSortedKeys.slice(startIndex, endIndex)

  const activeKeysCount = apiKeys.filter(k => k.status === 'active').length
  const inactiveKeysCount = apiKeys.filter(k => k.status === 'inactive').length

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleCopyKey = (key, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    navigator.clipboard.writeText(key.key)
    setCopyToast('Copy to Clipboard')
    setActiveActionMenu(null)
  }

  const handleRename = (keyId, newName) => {
    onUpdateKey(keyId, { name: newName })
    setActiveActionMenu(null)
  }

  return (
    <div className="list-view">
      <div className="list-view-header">
        <div className="list-view-top-bar">
          <h2 className="list-view-title">API Keys</h2>
          <div className="header-actions-row">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search API keys by name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="search-input"
              />
            </div>
            <div className="filter-button-wrapper" ref={filterRef}>
              <button 
                className="btn-filters" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Filters
              </button>
              {showFilters && (
                <div className="filters-dropdown">
                  <button
                    className={`filter-option ${filterStatus === 'all' ? 'active' : ''}`}
                    onClick={() => {
                      setFilterStatus('all')
                      setCurrentPage(1)
                      setShowFilters(false)
                    }}
                  >
                    All ({apiKeys.length})
                  </button>
                  <button
                    className={`filter-option ${filterStatus === 'active' ? 'active' : ''}`}
                    onClick={() => {
                      setFilterStatus('active')
                      setCurrentPage(1)
                      setShowFilters(false)
                    }}
                  >
                    Active ({activeKeysCount})
                  </button>
                  <button
                    className={`filter-option ${filterStatus === 'inactive' ? 'active' : ''}`}
                    onClick={() => {
                      setFilterStatus('inactive')
                      setCurrentPage(1)
                      setShowFilters(false)
                    }}
                  >
                    Inactive ({inactiveKeysCount})
                  </button>
                </div>
              )}
            </div>
            <div className="sort-control">
              <svg className="sort-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 2L12 6M4 10L8 14L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="most-recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
            <button className="btn-generate-new" onClick={onGenerateClick}>
              + Generate New Key
            </button>
          </div>
        </div>
        <div className="showing-count">Showing {totalKeys} {totalKeys === 1 ? 'API key' : 'API keys'}</div>
      </div>

      <div className="table-container">
        <table className="api-keys-table">
          <thead>
            <tr>
              <th>Key Name</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last Used</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedKeys.map((key) => (
              <tr key={key.id}>
                <td className="key-name-cell">
                  <div className="key-name">{key.name}</div>
                  <div className="key-preview">{key.key.substring(0, 12)}...</div>
                </td>
                <td>
                  <span className={`status-badge status-${key.status}`}>
                    {key.status === 'active' ? '• Active' : '• Inactive'}
                  </span>
                </td>
                <td>{formatDate(key.created)}</td>
                <td>{formatDate(key.lastUsed)}</td>
                <td className="actions-cell">
                  <div className={`action-menu-wrapper ${activeActionMenu === key.id ? 'active' : ''}`}>
                    <button
                      className="action-menu-btn"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        const button = e.currentTarget
                        const rect = button.getBoundingClientRect()
                        setMenuButtonRect(rect)
                        const viewportHeight = window.innerHeight
                        const spaceBelow = viewportHeight - rect.bottom
                        const spaceAbove = rect.top
                        
                        // Menu is approximately 140px tall (3 items)
                        // Position above if not enough space below
                        if (spaceBelow < 150 && spaceAbove > spaceBelow) {
                          setMenuPosition('top')
                        } else {
                          setMenuPosition('bottom')
                        }
                        
                        const newActiveMenu = activeActionMenu === key.id ? null : key.id
                        setActiveActionMenu(newActiveMenu)
                      }}
                      aria-label="Open menu"
                    >
                      ⋮
                    </button>
                    {activeActionMenu === key.id && menuButtonRect && (
                      <div 
                        className={`action-menu ${menuPosition === 'top' ? 'menu-top' : 'menu-bottom'}`}
                        style={{
                          position: 'fixed',
                          ...(menuPosition === 'top' 
                            ? { bottom: `${window.innerHeight - menuButtonRect.top + 4}px` }
                            : { top: `${menuButtonRect.bottom + 4}px` }
                          ),
                          right: `${window.innerWidth - menuButtonRect.right}px`,
                          zIndex: 10000,
                          minHeight: 'auto'
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                      >
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleCopyKey(key, e)
                          }}
                        >
                          <span className="menu-icon">📋</span>
                          <span>Copy Key</span>
                        </button>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const newName = prompt('Enter new name:', key.name)
                            if (newName && newName.trim()) {
                              handleRename(key.id, newName.trim())
                            } else {
                              setActiveActionMenu(null)
                            }
                          }}
                        >
                          <span className="menu-icon">✏️</span>
                          <span>Rename</span>
                        </button>
                        <button 
                          type="button"
                          className="danger"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setActiveActionMenu(null)
                            setTimeout(() => {
                              if (window.confirm('Are you sure you want to remove this key? It will become inactive.')) {
                                onDeleteKey(key.id)
                              }
                            }, 100)
                          }}
                        >
                          <span className="menu-icon">🗑️</span>
                          <span>Remove</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {copyToast && (
        <div className="copy-toast">
          {copyToast}
        </div>
      )}

      {totalKeys === 0 && (
        <div className="no-results">
          No API keys found matching your search.
        </div>
      )}

      {totalKeys > 0 && (
        <div className="pagination-section">
          <div className="pagination-info">
            Showing {startIndex + 1}-{Math.min(endIndex, totalKeys)} of {totalKeys} keys
          </div>
          <div className="pagination-controls">
            <label>
              Rows per page:
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="rows-select"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </label>
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ← Previous
            </button>
            <div className="page-numbers">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <button
                    key={pageNum}
                    className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>
            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListView

