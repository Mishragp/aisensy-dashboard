import React from 'react'
import DeveloperHeader from './DeveloperHeader'
import OnboardingCard from './OnboardingCard'
import QuickStatsBar from './QuickStatsBar'
import APIKeysPanel from './APIKeysPanel'
import WebhooksPanel from './WebhooksPanel'
import PopularAPIsGrid from './PopularAPIsGrid'
import HelpResources from './HelpResources'
import './DeveloperDashboard.css'

function DeveloperDashboard({ onMenuClick }) {
  return (
    <div className="developer-dashboard">
      <DeveloperHeader onMenuClick={onMenuClick} />
      <div className="developer-content">
        <div className="developer-main">
          <OnboardingCard />
          <QuickStatsBar />
          <APIKeysPanel />
          <WebhooksPanel />
        </div>
        <div className="developer-sidebar">
          <PopularAPIsGrid />
          <HelpResources />
        </div>
      </div>
    </div>
  )
}

export default DeveloperDashboard

