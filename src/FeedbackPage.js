import { useState, useEffect } from 'react';
import './FeedbackPage.css';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function FeedbackPage({ messages, domain, projectData, onRestart, user }) {
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

  useEffect(() => {
    analyzeFeedback();
  }, []);

  const saveToFirebase = async (parsedScores) => {
    try {
      await addDoc(collection(db, 'interviews'), {
        userId: user?.uid || 'anonymous',
        userName: user?.displayName || 'anonymous',
        domain: domain,
        projectName: projectData.projectName,
        techStack: projectData.techStack,
        scores: parsedScores,
        createdAt: new Date()
      });
      setSaved(true);
      console.log('Interview saved to Firebase!');
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const analyzeFeedback = async () => {
    const conversation = messages
      .map(m => `${m.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${m.content}`)
      .join('\n');

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are an expert interview evaluator. 
              Analyze the interview conversation and return ONLY a JSON object with this exact format:
              {
                "hrScore": 75,
                "technicalScore": 60,
                "projectScore": 70,
                "overallScore": 68,
                "verdict": "Keep Practicing",
                "weakAreas": ["State Management", "React Hooks"],
                "strengths": ["Communication", "Enthusiasm"],
                "suggestions": ["Revise React hooks", "Practice DSA daily"]
              }
              Score out of 100. Verdict should be "Selected", "Keep Practicing" or "Needs Improvement".
              Return ONLY the JSON, no other text.`
            },
            {
              role: 'user',
              content: `Analyze this interview:\n${conversation}`
            }
          ],
          max_tokens: 500,
          temperature: 0.3
        })
      });

      const data = await response.json();
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);
      setScores(parsed);
      await saveToFirebase(parsed);

    } catch (error) {
      console.error('Error:', error);
      const fallback = {
        hrScore: 70,
        technicalScore: 60,
        projectScore: 65,
        overallScore: 65,
        verdict: "Keep Practicing",
        weakAreas: ["Technical concepts"],
        strengths: ["Communication"],
        suggestions: ["Practice more technical questions"]
      };
      setScores(fallback);
      await saveToFirebase(fallback);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="feedback-loading">
        <div className="terminal-line">
          <span className="terminal-prompt">{'>'}</span>
          <span className="terminal-text"> analyzing your performance...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-page">

      <div className="feedback-navbar">
        <h1 className="logo">Interview Mirror</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {saved && <span style={{ color: '#00ff88', fontSize: '11px', letterSpacing: '2px', fontFamily: 'Courier New' }}>// saved ✓</span>}
          <span className="feedback-nav-tag">// performance report</span>
        </div>
      </div>

      <div className="feedback-body">

        <div className="feedback-header">
          <div className="terminal-line">
            <span className="terminal-prompt">{'>'}</span>
            <span className="terminal-text"> generating report...</span>
          </div>
          <h1>Your Interview <span>Report</span></h1>
          <p>Domain: <span className="highlight">{domain}</span> | Project: <span className="highlight">{projectData.projectName}</span></p>
        </div>

        <div className="verdict-section">
          <span className={`verdict ${scores.verdict === 'Selected' ? 'verdict-selected' : scores.verdict === 'Keep Practicing' ? 'verdict-practice' : 'verdict-improve'}`}>
            {scores.verdict === 'Selected' ? '✓ SELECTED' : scores.verdict === 'Keep Practicing' ? '~ KEEP PRACTICING' : '✗ NEEDS IMPROVEMENT'}
          </span>
          <h2 className="overall-score">{scores.overallScore}<span>/100</span></h2>
          <p className="overall-label">// overall score</p>
        </div>

        <div className="scores-grid">
          <div className="score-card">
            <span className="score-label">// hr round</span>
            <h3>{scores.hrScore}</h3>
            <div className="score-bar">
              <div className="score-fill" style={{ width: `${scores.hrScore}%` }}></div>
            </div>
          </div>
          <div className="score-card">
            <span className="score-label">// technical round</span>
            <h3>{scores.technicalScore}</h3>
            <div className="score-bar">
              <div className="score-fill" style={{ width: `${scores.technicalScore}%` }}></div>
            </div>
          </div>
          <div className="score-card">
            <span className="score-label">// project round</span>
            <h3>{scores.projectScore}</h3>
            <div className="score-bar">
              <div className="score-fill" style={{ width: `${scores.projectScore}%` }}></div>
            </div>
          </div>
        </div>

        <div className="feedback-details">
          <div className="detail-section">
            <h3>// weak areas</h3>
            {scores.weakAreas.map((area, i) => (
              <span key={i} className="tag tag-weak">{area}</span>
            ))}
          </div>
          <div className="detail-section">
            <h3>// strengths</h3>
            {scores.strengths.map((strength, i) => (
              <span key={i} className="tag tag-strong">{strength}</span>
            ))}
          </div>
          <div className="detail-section">
            <h3>// suggestions</h3>
            {scores.suggestions.map((suggestion, i) => (
              <p key={i} className="suggestion">{'>'} {suggestion}</p>
            ))}
          </div>
        </div>

        <button className="restart-btn" onClick={onRestart}>
          Start New Interview →
        </button>

      </div>
    </div>
  );
}

export default FeedbackPage;