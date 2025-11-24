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
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (mobile) {
        // On mobile: sidebar should be closed by default
        setSidebarOpen(false)
      } else {
        // On desktop: sidebar should be open by default
        setSidebarOpen(true)
      }
    }

    // Check immediately
    checkMobile()

    // Also check after a small delay to handle SSR/hydration issues
    const timeoutId = setTimeout(checkMobile, 100)

    // Check on resize
    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkMobile)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const handleSidebarToggle = () => {
    // Both desktop and mobile: toggle sidebar open/close
    toggleSidebar()
  }

  return (
    <div className="dashboard">
      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
      <Sidebar 
        isOpen={sidebarOpen} 
        isHidden={false}
        onToggle={handleSidebarToggle}
        developerView={developerView}
      />
      <div className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
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
