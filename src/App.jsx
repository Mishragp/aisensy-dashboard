import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import SubscriptionPayment from './components/Subscription/SubscriptionPayment'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard developerView={null} />} />
        <Route path="/developer" element={<Dashboard developerView="dashboard" />} />
        <Route path="/developer/api-keys" element={<Dashboard developerView="api-keys" />} />
        <Route path="/developer/api-docs" element={<Dashboard developerView="api-docs" />} />
        <Route path="/developer/api-docs/:apiId" element={<Dashboard developerView="api-detail" />} />
        <Route path="/developer/webhooks" element={<Dashboard developerView="webhooks" />} />
        <Route path="/subscription" element={<SubscriptionPayment />} />
      </Routes>
    </Router>
  )
}

export default App
