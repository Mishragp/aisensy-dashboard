import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import MainContent from './MainContent'
import DeveloperDashboard from './Developer/DeveloperDashboard'
import APIKeyManagement from './Developer/APIKeyManagement'
import APIDiscovery from './Developer/APIDiscovery'
import APIDetailView from './Developer/APIDetailView'
import WebhookManagement from './Developer/WebhookManagement'
import './Dashboard.css'

function Dashboard({ developerView }) {
  const location = useLocation()
  
  // Ensure that root path (/) always shows MainContent, not developer view
  const isRootPath = location.pathname === '/'
  const shouldShowMainContent = isRootPath || developerView === null || developerView === undefined
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarHidden, setSidebarHidden] = useState(false) // Desktop: start with sidebar visible

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const handleSidebarToggle = () => {
    // On desktop: hide/show sidebar
    // On mobile: toggle open/close
    if (window.innerWidth > 768) {
      setSidebarHidden(!sidebarHidden)
      setSidebarOpen(false) // Ensure mobile state is reset
    } else {
      toggleSidebar()
    }
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false)
      } else {
        setSidebarHidden(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="dashboard">
      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
      <div 
        className={`sidebar-hover-trigger ${sidebarHidden ? 'active' : ''}`}
        onMouseEnter={() => {
          if (sidebarHidden && window.innerWidth > 768) {
            setSidebarHidden(false)
          }
        }}
      ></div>
      <Sidebar 
        isOpen={sidebarOpen} 
        isHidden={sidebarHidden}
        onToggle={handleSidebarToggle}
        developerView={developerView}
      />
      <div className={`dashboard-main ${sidebarHidden ? 'sidebar-hidden' : ''}`}>
        {shouldShowMainContent && <Header onMenuClick={handleSidebarToggle} />}
        {shouldShowMainContent ? (
          <MainContent />
        ) : developerView === "dashboard" ? (
          <DeveloperDashboard onMenuClick={handleSidebarToggle} />
        ) : developerView === "api-keys" ? (
          <APIKeyManagement onMenuClick={handleSidebarToggle} />
        ) : developerView === "api-docs" ? (
          <APIDiscovery onMenuClick={handleSidebarToggle} />
        ) : developerView === "api-detail" ? (
          <APIDetailView onMenuClick={handleSidebarToggle} />
        ) : developerView === "webhooks" ? (
          <WebhookManagement onMenuClick={handleSidebarToggle} />
        ) : (
          <MainContent />
        )}
      </div>
    </div>
  )
}

export default Dashboard
