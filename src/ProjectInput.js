import { useState } from 'react';
import './ProjectInput.css';

function ProjectInput({ domain, onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    techStack: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.projectName || !formData.description || !formData.techStack) {
      alert('Please fill all fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="project-page">

      <div className="project-navbar">
        <button className="back-btn" onClick={onBack}>
          {'<'} Back
        </button>
        <span className="project-nav-tag">// project details</span>
      </div>

      <div className="project-header">
        <div className="terminal-line">
          <span className="terminal-prompt">{'>'}</span>
          <span className="terminal-text"> loading project context...</span>
        </div>
        <h1>Tell Us About Your <span>Project</span></h1>
        <p>Domain locked: <span className="domain-badge">{domain}</span></p>
      </div>

      <div className="project-form">

        <div className="form-group">
          <label>// project name</label>
          <input
            type="text"
            name="projectName"
            placeholder="e.g. Attendance Management System"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>// tech stack used</label>
          <input
            type="text"
            name="techStack"
            placeholder="e.g. React, Firebase, Node.js"
            value={formData.techStack}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>// project description</label>
          <textarea
            name="description"
            placeholder="Briefly describe what your project does, its features and your role in it..."
            value={formData.description}
            onChange={handleChange}
            rows={6}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Start Interview →
        </button>

      </div>
    </div>
  );
}

export default ProjectInput;