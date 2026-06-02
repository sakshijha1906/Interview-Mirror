import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
import './LoginPage.css';

function LoginPage({ onLogin }) {

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onLogin(user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="terminal-line">
          <span className="terminal-prompt">{'>'}</span>
          <span className="terminal-text"> authenticating user...</span>
        </div>
        <h1>Interview <span>Mirror</span></h1>
        <p className="login-subtitle">
          Sign in to save your interview history
          and track your progress over time
        </p>
        <button className="google-btn" onClick={handleGoogleLogin}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          Sign in with Google
        </button>
        <p className="login-note">
          // your data is saved securely
        </p>
      </div>
    </div>
  );
}

export default LoginPage;