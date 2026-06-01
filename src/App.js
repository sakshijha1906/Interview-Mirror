import { useState } from 'react';
import './App.css';
import DomainSelector from './DomainSelector';
import ProjectInput from './ProjectInput';
import InterviewEngine from './InterviewEngine';

function App() {
  const [page, setPage] = useState('home');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [projectData, setProjectData] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const navigateTo = (target) => {
    setTransitioning(true);
    setTimeout(() => {
      setPage(target);
      setTransitioning(false);
    }, 400);
  };

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    navigateTo('project');
  };

  const handleProjectSubmit = (data) => {
    setProjectData(data);
    navigateTo('interview');
  };

  if (page === 'domain') {
    return (
      <div className={transitioning ? 'page-exit' : 'page-enter'}>
        <DomainSelector onSelect={handleDomainSelect} onBack={() => navigateTo('home')} />
      </div>
    );
  }

  if (page === 'project') {
    return (
      <div className={transitioning ? 'page-exit' : 'page-enter'}>
        <ProjectInput
          domain={selectedDomain}
          onSubmit={handleProjectSubmit}
          onBack={() => navigateTo('domain')}
        />
      </div>
    );
  }

  if (page === 'interview') {
    return (
      <div className={transitioning ? 'page-exit' : 'page-enter'}>
        <InterviewEngine
          domain={selectedDomain}
          projectData={projectData}
          onBack={() => navigateTo('project')}
        />
      </div>
    );
  }

  return (
    <div className={transitioning ? 'page-exit' : 'page-enter'}>
      <canvas id="particles-canvas"></canvas>
      <nav className="navbar">
        <h1 className="logo">Interview Mirror</h1>
        <span className="nav-tag">// adaptive ai interviews</span>
      </nav>

      <div className="hero">
        <div className="terminal-line">
          <span className="terminal-prompt">{'>'}</span>
          <span className="terminal-text"> initializing interview engine...</span>
        </div>
        <h1 className="hero-title">
          Ace Your Next<br />
          <span>Interview</span>
        </h1>
        <p className="hero-subtitle">
          AI-powered mock interviews  for your domain and projects.
          Get real feedback, not just random questions.
        </p>
        <button className="start-btn" onClick={() => navigateTo('domain')}>
          Start Interview
        </button>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Domain Based</h3>
          <p>Questions tailored to your field — SDE, Web Dev, Data Science and more</p>
        </div>
        <div className="feature-card">
          <h3>Project Based</h3>
          <p>AI generates questions directly from your own projects</p>
        </div>
        <div className="feature-card">
          <h3>Adaptive AI</h3>
          <p>Difficulty adjusts based on your answers in real time</p>
        </div>
        <div className="feature-card">
          <h3>Smart Feedback</h3>
          <p>Get scores, weak areas and improvement tips after every interview</p>
        </div>
      </div>
    </div>
  );
}

export default App;