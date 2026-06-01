import { useState, useEffect } from 'react';
import './InterviewEngine.css';

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
console.log('API KEY:', GROQ_API_KEY);

function InterviewEngine({ domain, projectData, onBack }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [round, setRound] = useState('hr');
  const [questionCount, setQuestionCount] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);

  const roundLabels = {
    hr: 'HR Round',
    technical: 'Technical Round',
    project: 'Project Round'
  };

  const getSystemPrompt = () => {
    return `You are a professional technical interviewer conducting a job interview.
Domain: ${domain}
Project: ${projectData.projectName}
Tech Stack: ${projectData.techStack}
Project Description: ${projectData.description}
Current Round: ${roundLabels[round]}

Rules:
- Ask ONE question at a time
- Keep questions concise and clear
- For HR round: ask about background, motivation, strengths
- For Technical round: ask domain specific concepts
- For Project round: ask specifically about their project
- React to answers naturally like a real interviewer
- If answer is weak, ask a simpler follow up
- If answer is strong, ask a harder follow up
- After 3 questions in a round, say "Round complete. Moving to next round." and stop.
- Be professional but friendly
- Start with a greeting and first question immediately`;
  };

  const startInterview = async () => {
    setInterviewStarted(true);
    setLoading(true);

    const systemPrompt = getSystemPrompt();

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
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Start the interview' }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const aiMessage = data.choices[0].message.content;

      setMessages([{ role: 'interviewer', content: aiMessage }]);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const sendAnswer = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);
    setQuestionCount(prev => prev + 1);

    const systemPrompt = getSystemPrompt();

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...newMessages.map(m => ({
        role: m.role === 'interviewer' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
          messages: apiMessages,
          max_tokens: 300,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const aiMessage = data.choices[0].message.content;

      setMessages(prev => [...prev, { role: 'interviewer', content: aiMessage }]);

      if (aiMessage.includes('Round complete')) {
        if (round === 'hr') setRound('technical');
        else if (round === 'technical') setRound('project');
        setQuestionCount(0);
      }

    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendAnswer();
    }
  };

  return (
    <div className="interview-page">

      <div className="interview-navbar">
        <button className="back-btn" onClick={onBack}>
          {'<'} Exit
        </button>
        <div className="round-indicator">
          <span className={round === 'hr' ? 'round-active' : 'round-done'}>HR</span>
          <span className="round-divider">→</span>
          <span className={round === 'technical' ? 'round-active' : round === 'project' ? 'round-done' : 'round-pending'}>Technical</span>
          <span className="round-divider">→</span>
          <span className={round === 'project' ? 'round-active' : 'round-pending'}>Project</span>
        </div>
        <span className="interview-nav-tag">// {roundLabels[round]}</span>
      </div>

      <div className="interview-body">

        {!interviewStarted ? (
          <div className="start-screen">
            <div className="terminal-line">
              <span className="terminal-prompt">{'>'}</span>
              <span className="terminal-text"> system ready...</span>
            </div>
            <h1>Ready to Begin?</h1>
            <p>Domain: <span>{domain}</span></p>
            <p>Project: <span>{projectData.projectName}</span></p>
            <p>Tech Stack: <span>{projectData.techStack}</span></p>
            <button className="start-interview-btn" onClick={startInterview}>
              Begin Interview →
            </button>
          </div>
        ) : (
          <div className="chat-container">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                  <span className="message-label">
                    {msg.role === 'interviewer' ? '> interviewer' : '> you'}
                  </span>
                  <p>{msg.content}</p>
                </div>
              ))}
              {loading && (
                <div className="message interviewer">
                  <span className="message-label">> interviewer</span>
                  <p className="typing">thinking...</p>
                </div>
              )}
            </div>

            <div className="input-area">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer here... (Enter to send)"
                rows={3}
                disabled={loading}
              />
              <button
                className="send-btn"
                onClick={sendAnswer}
                disabled={loading}
              >
                {loading ? '...' : 'Send →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewEngine;