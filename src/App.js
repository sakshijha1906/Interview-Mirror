import './App.css';

function App() {
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
        <button className="start-btn">Start Interview →</button>
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