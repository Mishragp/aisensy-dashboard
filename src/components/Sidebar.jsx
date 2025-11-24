import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar({ isOpen, isHidden, onToggle }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (path) => {
    if (path) {
      navigate(path)
    }
    // Close sidebar on mobile when nav item is clicked
    if (window.innerWidth <= 768) {
      onToggle()
    } else {
      // On desktop, clicking nav item shows sidebar if hidden
      if (isHidden) {
        onToggle()
      }
    }
  }

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''} ${isHidden ? 'hidden' : ''}`}>
        <div className="sidebar-header">
          <div className="menu-icon-container">
            <div className="menu-icon-square" onClick={onToggle}>
              <div className="menu-icon-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <span className="sidebar-skip-text">Skip</span>
          </div>
        </div>
      
      <nav className="sidebar-nav">
        <div 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} 
          onClick={() => handleNavClick('/')}
        >
          <span className="nav-icon">⊞</span>
          <span className="nav-label">Dashboard</span>
        </div>
        
        <div 
          className={`nav-item developer ${location.pathname.startsWith('/developer') ? 'active' : ''}`} 
          onClick={() => handleNavClick('/developer')}
        >
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Developer</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">💬</span>
          <span className="nav-label">Live Chat</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">🕐</span>
          <span className="nav-label">History</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">👤</span>
          <span className="nav-label">Contacts</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">✈️</span>
          <span className="nav-label">Campaigns</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">f</span>
          <span className="nav-label">Ads Manager</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">○</span>
          <span className="nav-label">Flows</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">₹</span>
          <span className="nav-label">WA Pay</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Manage</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">⊞</span>
          <span className="nav-label">Integrations</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">💎</span>
          <span className="nav-label">EComm+</span>
        </div>
        
        <div className="nav-item" onClick={handleNavClick}>
          <span className="nav-icon">🔄</span>
          <span className="nav-label">All Projects</span>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-avatar">C</div>
      </div>
      </div>
    </>
  )
}

export default Sidebar
