import { useState } from 'react';
import './DomainSelector.css';

const domains = [
  {
    id: 1,
    title: "Web Development",
    description: "HTML, CSS, JavaScript, React, Node.js",
    tag: "// frontend + backend"
  },
  {
    id: 2,
    title: "AI / ML",
    description: "Python, Machine Learning, Deep Learning, NLP",
    tag: "// artificial intelligence"
  },
  {
    id: 3,
    title: "Cybersecurity",
    description: "Network Security, Ethical Hacking, Cryptography",
    tag: "// security & defense"
  },
  {
    id: 4,
    title: "Data Science",
    description: "Python, Statistics, Data Analysis, Visualization",
    tag: "// data & insights"
  },
  {
    id: 5,
    title: "HR / Behavioral",
    description: "Soft skills, Situational questions, Communication",
    tag: "// people & culture"
  },
  {
    id: 6,
    title: "Core CS Subjects",
    description: "OS, DBMS, CN, OOP, DSA fundamentals",
    tag: "// computer science"
  }
];

function DomainSelector({ onSelect, onBack }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (domain) => {
    setSelected(domain.id);
    setTimeout(() => {
      onSelect(domain.title);
    }, 600);
  };

  return (
    <div className="domain-page">

      <div className="domain-navbar">
        <button className="back-btn" onClick={onBack}>
          {'<'} Back
        </button>
        <span className="domain-nav-tag">// select domain</span>
      </div>

      <div className="domain-header">
        <div className="terminal-line">
          <span className="terminal-prompt">{'>'}</span>
          <span className="terminal-text"> select your interview domain...</span>
        </div>
        <h1>Choose Your <span>Domain</span></h1>
        <p>Your interview will be tailored based on this selection</p>
      </div>

      <div className="domain-grid">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className={`domain-card ${selected === domain.id ? 'selected' : ''}`}
            onClick={() => handleClick(domain)}
          >
            <span className="domain-tag">{domain.tag}</span>
            <h3>{domain.title}</h3>
            <p>{domain.description}</p>
            <span className="domain-arrow">→</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default DomainSelector;