import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import './HistoryPage.css';

function HistoryPage({ user, onBack }) {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const q = query(
        collection(db, 'interviews'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInterviews(data);
    } catch (error) {
      console.error('Error fetching:', error);
    }
    setLoading(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="history-loading">
        <div className="terminal-line">
          <span className="terminal-prompt">{'>'}</span>
          <span className="terminal-text"> loading interview history...</span>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="history-page">
        <div className="history-navbar">
          <button className="back-btn" onClick={() => setSelected(null)}>
            {'<'} Back
          </button>
          <span className="history-nav-tag">// interview details</span>
        </div>

        <div className="history-body">
          <div className="detail-header">
            <h1>Interview <span>Details</span></h1>
            <p>Domain: <span className="highlight">{selected.domain}</span> | Project: <span className="highlight">{selected.projectName}</span></p>
            <p className="detail-date">// {formatDate(selected.createdAt)}</p>
          </div>

          <div className="verdict-section">
            <span className={`verdict ${selected.scores.verdict === 'Selected' ? 'verdict-selected' : selected.scores.verdict === 'Keep Practicing' ? 'verdict-practice' : 'verdict-improve'}`}>
              {selected.scores.verdict === 'Selected' ? '✓ SELECTED' : selected.scores.verdict === 'Keep Practicing' ? '~ KEEP PRACTICING' : '✗ NEEDS IMPROVEMENT'}
            </span>
            <h2 className="overall-score">{selected.scores.overallScore}<span>/100</span></h2>
          </div>

          <div className="scores-grid">
            <div className="score-card">
              <span className="score-label">// hr round</span>
              <h3>{selected.scores.hrScore}</h3>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${selected.scores.hrScore}%` }}></div>
              </div>
            </div>
            <div className="score-card">
              <span className="score-label">// technical round</span>
              <h3>{selected.scores.technicalScore}</h3>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${selected.scores.technicalScore}%` }}></div>
              </div>
            </div>
            <div className="score-card">
              <span className="score-label">// project round</span>
              <h3>{selected.scores.projectScore}</h3>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${selected.scores.projectScore}%` }}></div>
              </div>
            </div>
          </div>

          <div className="feedback-details">
            <div className="detail-section">
              <h3>// weak areas</h3>
              {selected.scores.weakAreas?.map((area, i) => (
                <span key={i} className="tag tag-weak">{area}</span>
              ))}
            </div>
            <div className="detail-section">
              <h3>// strengths</h3>
              {selected.scores.strengths?.map((strength, i) => (
                <span key={i} className="tag tag-strong">{strength}</span>
              ))}
            </div>
            <div className="detail-section">
              <h3>// suggestions</h3>
              {selected.scores.suggestions?.map((suggestion, i) => (
                <p key={i} className="suggestion">{'>'} {suggestion}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-navbar">
        <button className="back-btn" onClick={onBack}>
          {'<'} Back
        </button>
        <span className="history-nav-tag">// interview history</span>
      </div>

      <div className="history-body">
        <div className="history-header">
          <div className="terminal-line">
            <span className="terminal-prompt">{'>'}</span>
            <span className="terminal-text"> loading sessions...</span>
          </div>
          <h1>Your <span>History</span></h1>
          <p>// {interviews.length} interviews completed</p>
        </div>

        {interviews.length === 0 ? (
          <div className="no-interviews">
            <p>{'>'} No interviews found</p>
            <p>// complete your first interview to see history</p>
          </div>
        ) : (
          <div className="interviews-list">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="interview-row"
                onClick={() => setSelected(interview)}
              >
                <div className="interview-row-left">
                  <span className="interview-domain">{interview.domain}</span>
                  <span className="interview-project">// {interview.projectName}</span>
                </div>
                <div className="interview-row-right">
                  <span className={`mini-verdict ${interview.scores.verdict === 'Selected' ? 'verdict-selected' : interview.scores.verdict === 'Keep Practicing' ? 'verdict-practice' : 'verdict-improve'}`}>
                    {interview.scores.verdict}
                  </span>
                  <span className="interview-score">{interview.scores.overallScore}/100</span>
                  <span className="interview-date">{formatDate(interview.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;