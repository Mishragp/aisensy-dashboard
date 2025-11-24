import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DeveloperHeader from './DeveloperHeader'
import './APIDetailView.css'

function APIDetailView() {
  const { apiId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [testDestination, setTestDestination] = useState('+91')
  const [testMessage, setTestMessage] = useState('Hello! Your OTP is 1234')
  const [codeLanguage, setCodeLanguage] = useState('curl')
  const [stickyTabs, setStickyTabs] = useState(false)

  // Mock API data
  const apiData = {
    'send-message': {
      name: 'Send Message API',
      plan: 'free',
      category: 'Messaging',
      description: 'Send WhatsApp messages via API to single recipient',
      rateLimit: '100 req/min (Free) | 1000 req/min (Pro)',
      endpoint: 'POST /api/v2/messages/send',
      useCases: [
        'Send transactional messages (OTP, confirmations, receipts)',
        'Send promotional notifications and offers',
        'Send customer support messages and alerts',
        'Integrate delivery status into your dashboard'
      ]
    },
    'receive-message': {
      name: 'Receive Msg API',
      plan: 'free',
      category: 'Messaging',
      description: 'Receive incoming WhatsApp messages',
      rateLimit: '100 req/min',
      endpoint: 'POST /api/v2/messages/receive',
      useCases: [
        'Handle incoming messages from users',
        'Process customer inquiries',
        'Create automated responses'
      ]
    }
  }

  const api = apiData[apiId] || apiData['send-message']

  // Make tabs sticky on scroll
  useEffect(() => {
    const handleScroll = () => {
      const tabsElement = document.querySelector('.sticky-tabs-container')
      if (tabsElement) {
        const rect = tabsElement.getBoundingClientRect()
        setStickyTabs(rect.top <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const codeExamples = {
    curl: `curl -X POST https://backend.aisensy.com/campaign/t1/api/v2/messages \\
  -H "Authorization: Bearer sk_live_YOUR_KEY_HERE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "destination": "+919876543210",
    "message": "Hello! Your OTP is 1234",
    "campaignName": "OTP_Campaign"
  }'`,
    'node.js': `const axios = require('axios');

const response = await axios.post(
  'https://backend.aisensy.com/campaign/t1/api/v2/messages',
  {
    destination: '+919876543210',
    message: 'Hello! Your OTP is 1234',
    campaignName: 'OTP_Campaign'
  },
  {
    headers: {
      'Authorization': 'Bearer sk_live_YOUR_KEY_HERE',
      'Content-Type': 'application/json'
    }
  }
);`,
    python: `import requests

response = requests.post(
    'https://backend.aisensy.com/campaign/t1/api/v2/messages',
    json={
        'destination': '+919876543210',
        'message': 'Hello! Your OTP is 1234',
        'campaignName': 'OTP_Campaign'
    },
    headers={
        'Authorization': 'Bearer sk_live_YOUR_KEY_HERE',
        'Content-Type': 'application/json'
    }
)`,
    php: `<?php
$ch = curl_init('https://backend.aisensy.com/campaign/t1/api/v2/messages');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'destination' => '+919876543210',
    'message' => 'Hello! Your OTP is 1234',
    'campaignName' => 'OTP_Campaign'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer sk_live_YOUR_KEY_HERE',
    'Content-Type: application/json'
]);
$response = curl_exec($ch);
curl_close($ch);
?>`,
    go: `package main

import (
    "bytes"
    "net/http"
    "encoding/json"
)

func main() {
    data := map[string]interface{}{
        "destination": "+919876543210",
        "message": "Hello! Your OTP is 1234",
        "campaignName": "OTP_Campaign",
    }
    jsonData, _ := json.Marshal(data)
    
    req, _ := http.NewRequest("POST", 
        "https://backend.aisensy.com/campaign/t1/api/v2/messages",
        bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer sk_live_YOUR_KEY_HERE")
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://backend.aisensy.com/campaign/t1/api/v2/messages"))
    .header("Authorization", "Bearer sk_live_YOUR_KEY_HERE")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\\"destination\\":\\"+919876543210\\",\\"message\\":\\"Hello! Your OTP is 1234\\",\\"campaignName\\":\\"OTP_Campaign\\"}"
    ))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeExamples[codeLanguage])
    // Show toast notification (you can implement this)
  }

  const handleSendTest = () => {
    // Implement test request logic
    console.log('Sending test request...', { testDestination, testMessage })
  }

  return (
    <div className="api-detail-view">
      <DeveloperHeader activeTab="api-docs" />
      <div className="api-detail-content">
        <div className="api-detail-header">
          <button className="back-btn" onClick={() => navigate('/developer/api-docs')}>
            ← Back
          </button>
          <div className="api-detail-title">
            {api.name} | {api.plan === 'free' ? 'Free' : 'Pro'} | {api.category}
          </div>
        </div>

        <div className={`sticky-tabs-container ${stickyTabs ? 'sticky' : ''}`}>
          <div className="sticky-tabs">
            <button
              className={`sticky-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`sticky-tab ${activeTab === 'parameters' ? 'active' : ''}`}
              onClick={() => setActiveTab('parameters')}
            >
              Parameters
            </button>
            <button
              className={`sticky-tab ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
            <button
              className={`sticky-tab ${activeTab === 'try-it' ? 'active' : ''}`}
              onClick={() => setActiveTab('try-it')}
            >
              Try It
            </button>
            <button
              className={`sticky-tab ${activeTab === 'full-docs' ? 'active' : ''}`}
              onClick={() => setActiveTab('full-docs')}
            >
              Full Docs
            </button>
          </div>
        </div>

        <div className="api-detail-main">
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2 className="tab-title">TAB 1: OVERVIEW</h2>
              <p className="api-description">{api.description}</p>
              
              <div className="info-section">
                <div className="info-item">
                  <strong>Authentication:</strong> API Key Required
                </div>
                <div className="info-item">
                  <strong>Rate Limit:</strong> {api.rateLimit}
                </div>
              </div>

              <div className="use-cases-section">
                <h3 className="section-title">Use Cases:</h3>
                <ul className="use-cases-list">
                  {api.useCases.map((useCase, index) => (
                    <li key={index}>✓ {useCase}</li>
                  ))}
                </ul>
              </div>

              <div className="related-webhook">
                <strong>Related Webhook:</strong> Message Delivered Event → Get real-time delivery status
                <button className="subscribe-btn">Subscribe to Webhook</button>
              </div>

              <div className="cta-section">
                <p><strong>Ready to integrate?</strong></p>
                <div className="cta-buttons">
                  <button className="cta-btn" onClick={() => setActiveTab('code')}>
                    View Code Examples ↓
                  </button>
                  <button className="cta-btn" onClick={() => setActiveTab('try-it')}>
                    Try Now ↓
                  </button>
                  <button className="cta-btn" onClick={() => setActiveTab('full-docs')}>
                    View Full Docs ↓
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'parameters' && (
            <div className="tab-content">
              <h2 className="tab-title">TAB 2: PARAMETERS</h2>
              <div className="endpoint-info">
                <strong>Endpoint:</strong> {api.endpoint}
              </div>

              <div className="parameters-section">
                <h3 className="section-title">Required Parameters</h3>
                <div className="parameter-item">
                  <div className="parameter-name">
                    <code>destination</code> <span className="required">*</span>
                    <span className="param-type">(string)</span>
                  </div>
                  <div className="parameter-description">
                    Phone number in E.164 format (e.g., +919876543210)
                  </div>
                  <div className="parameter-example">
                    <strong>Example:</strong> "+919876543210"
                  </div>
                </div>

                <div className="parameter-item">
                  <div className="parameter-name">
                    <code>message</code> <span className="required">*</span>
                    <span className="param-type">(string)</span>
                  </div>
                  <div className="parameter-description">
                    Main message body. Maximum 4096 characters.
                  </div>
                  <div className="parameter-example">
                    <strong>Example:</strong> "Hello! Your OTP is 1234"
                  </div>
                </div>

                <h3 className="section-title">Optional Parameters</h3>
                <div className="parameter-item">
                  <div className="parameter-name">
                    <code>templateParams</code> <span className="param-type">[] (array)</span>
                  </div>
                  <div className="parameter-description">
                    Template variables for dynamic content
                  </div>
                  <div className="parameter-example">
                    <strong>Example:</strong> ["John", "2024-01-15"]
                  </div>
                </div>

                <div className="parameter-item">
                  <div className="parameter-name">
                    <code>media</code> <span className="param-type">{} (object)</span>
                  </div>
                  <div className="parameter-description">
                    Attach media (image, video, or document)
                  </div>
                  <div className="parameter-example">
                    <strong>Example:</strong> {"{ url: 'https://...', type: 'image', filename: 'photo.jpg' }"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="tab-content code-tab">
              <h2 className="tab-title">TAB 3: CODE</h2>
              <div className="code-language-selector">
                {['curl', 'node.js', 'python', 'php', 'go', 'java'].map(lang => (
                  <button
                    key={lang}
                    className={`lang-btn ${codeLanguage === lang ? 'active' : ''}`}
                    onClick={() => setCodeLanguage(lang)}
                  >
                    {lang === 'node.js' ? 'Node.js' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
              <div className="code-block-wrapper">
                <button className="copy-code-btn" onClick={handleCopyCode}>
                  Copy Code
                </button>
                <pre className="code-block">
                  <code>{codeExamples[codeLanguage]}</code>
                </pre>
              </div>
              <div className="code-note">
                <strong>Pre-filled with Your Data:</strong> API Key, Endpoint, and Authentication header are pre-filled. All you need to do: Copy & Paste → Update phone number.
              </div>
              <div className="code-links">
                <a href="#" className="code-link">Try in Postman →</a>
                <a href="#" className="code-link">View Full Examples →</a>
              </div>
            </div>
          )}

          {activeTab === 'try-it' && (
            <div className="tab-content try-it-tab">
              <h2 className="tab-title">TAB 4: TRY IT</h2>
              <div className="try-it-warning">
                <strong>Tip:</strong> This uses your actual API key. Messages will be sent to this number. Use a test/personal number to avoid sending real messages.
              </div>
              
              <div className="try-it-form">
                <div className="form-group">
                  <label>
                    Destination Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={testDestination}
                    onChange={(e) => setTestDestination(e.target.value)}
                    placeholder="+919876543210"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    rows={4}
                    placeholder="Enter your message..."
                  />
                  <div className="char-count">{testMessage.length}/4096</div>
                </div>

                <div className="optional-params">
                  <button className="add-param-btn">+ Template Params</button>
                  <button className="add-param-btn">+ Media</button>
                  <button className="add-param-btn">+ Tags</button>
                  <button className="add-param-btn">+ Attributes</button>
                </div>

                <button className="send-test-btn" onClick={handleSendTest}>
                  Send Test Request
                </button>
              </div>

              <div className="test-response">
                <h3 className="response-title">Response (Click Send to see result):</h3>
                <div className="response-status">Status: Waiting for request...</div>
              </div>
            </div>
          )}

          {activeTab === 'full-docs' && (
            <div className="tab-content">
              <h2 className="tab-title">TAB 5: FULL DOCS</h2>
              <p>Complete documentation will be available here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default APIDetailView

