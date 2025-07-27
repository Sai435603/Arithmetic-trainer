import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  if (isSignedIn) navigate('/game');

  return (
    <div className="landing">
      <h1 className="title">Play Arithmetic Battle</h1>
      <p className="subtitle">Sharpen your brain with numbers!</p>

      <div className="auth-box">
        <SignInButton mode="modal">
          <button className="btn primary">Sign in</button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button className="btn outline">Sign up</button>
        </SignUpButton>
      </div>
    </div>
  );
}
