import { useState } from 'react';
import './App.css';
import DomainSelector from './DomainSelector';

function App() {
  const [page, setPage] = useState('home');
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setPage('interview');
  };

  if (page === 'domain') {
    return <DomainSelector onSelect={handleDomainSelect} />;
  }

  if (page === 'interview') {
    return (
      <div style={{
        background: '#0a0a0a',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px'
      }}>
        Domain Selected: {selectedDomain} — Interview page coming soon!
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">Interview Mirror</h1>
      </nav>

      <div className="hero">
        <h1 className="hero-title">Ace Your Next Interview</h1>
        <p className="hero-subtitle">
          AI-powered mock interviews tailored to your domain and projects.
          Get real feedback, not just random questions.
        </p>
        <button className="start-btn" onClick={() => setPage('domain')}>
          Start Interview →
        </button>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>🎯 Domain Based</h3>
          <p>Questions tailored to your field — SDE, Web Dev, Data Science and more</p>
        </div>
        <div className="feature-card">
          <h3>🔥 Project Based</h3>
          <p>AI generates questions directly from your own projects</p>
        </div>
        <div className="feature-card">
          <h3>🧠 Adaptive AI</h3>
          <p>Difficulty adjusts based on your answers in real time</p>
        </div>
        <div className="feature-card">
          <h3>📊 Smart Feedback</h3>
          <p>Get scores, weak areas and improvement tips after every interview</p>
        </div>
      </div>
    </div>
  );
}

export default App;