import React, { useState, useEffect } from 'react'
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
        {!developerView && <Header onMenuClick={handleSidebarToggle} />}
        {developerView === "dashboard" ? (
          <DeveloperDashboard />
        ) : developerView === "api-keys" ? (
          <APIKeyManagement />
        ) : developerView === "api-docs" ? (
          <APIDiscovery />
        ) : developerView === "api-detail" ? (
          <APIDetailView />
        ) : developerView === "webhooks" ? (
          <WebhookManagement />
        ) : (
          <MainContent />
        )}
      </div>
    </div>
  )
}

export default Dashboard
