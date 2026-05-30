import './DomainSelector.css';

const domains = [
  {
    id: 1,
    title: "Software Development",
    description: "DSA, System Design, OOP concepts",
    icon: "💻"
  },
  {
    id: 2,
    title: "Web Development",
    description: "HTML, CSS, JavaScript, React, Node.js",
    icon: "🌐"
  },
  {
    id: 3,
    title: "Data Science",
    description: "Python, ML, Statistics, Data Analysis",
    icon: "📊"
  },
  {
    id: 4,
    title: "Database",
    description: "SQL, MongoDB, System Design",
    icon: "🗄️"
  },
  {
    id: 5,
    title: "DevOps",
    description: "Docker, CI/CD, Cloud, Linux",
    icon: "⚙️"
  },
  {
    id: 6,
    title: "Android Development",
    description: "Java, Kotlin, Android Studio",
    icon: "📱"
  }
];

function DomainSelector({ onSelect }) {
  return (
    <div className="domain-page">
      <div className="domain-header">
        <h1>Select Your Domain</h1>
        <p>Choose the field you want to be interviewed in</p>
      </div>

      <div className="domain-grid">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="domain-card"
            onClick={() => onSelect(domain.title)}
          >
            <span className="domain-icon">{domain.icon}</span>
            <h3>{domain.title}</h3>
            <p>{domain.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DomainSelector;