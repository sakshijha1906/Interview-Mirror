# Interview Mirror

An AI-powered mock interview simulator built to make interview preparation more personalized, adaptive, and interactive.

## Live Demo
https://interview-mirror-84672.web.app

## About The Project

Interview Mirror is a personal project built while pursuing BE Information Technology to explore how AI can improve the interview preparation experience.

Instead of relying on static question lists, the application generates interview questions based on the user's domain and project details, adapts difficulty based on answer quality, and provides AI-powered feedback to help identify areas for improvement.

The goal was not just to integrate AI into an application, but to build something practical that simulates a realistic interview experience.

## Features

- Personalized interview question generation based on domain and project
- Multi-round interview simulation (HR, Technical, Project rounds)
- Adaptive difficulty that adjusts based on answer quality
- AI-powered feedback with scores and weak area detection
- Interview history tracking with past session details
- Google Authentication for secure login
- Interactive terminal-style user interface

## Tech Stack

| Category | Technologies |
| -------------- | ------------ |
| Frontend | React.js |
| Database | Firebase Firestore |
| Authentication | Firebase Auth |
| AI Integration | Groq API (LLaMA 3.3 70B) |
| Hosting | Firebase Hosting |

## How It Works

1. User logs in with Google account
2. Selects interview domain (Web Dev, AI/ML, Core CS etc.)
3. Enters project name, tech stack and description
4. AI conducts multi-round interview (HR, Technical, Project)
5. System adapts questions based on answer quality
6. AI analyzes responses and generates detailed feedback
7. Scores, weak areas and suggestions are saved to history

## Getting Started

### Clone the repository
```bash
git clone https://github.com/sakshijha1906/Interview-Mirror.git
```

### Navigate to the project folder
```bash
cd Interview-Mirror
```

### Install dependencies
```bash
npm install
```

### Add environment variables
Create a `.env` file in root folder:
