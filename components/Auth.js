/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Auth = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignupSuccess = () => {
    setIsSignedUp(true); 
    setMessage('Signup successful! Please log in.'); 
  };

  return (
    <div>
      {isSignedUp ? (
        <div>
          <h2>Login</h2>
          <LoginForm setMessage={setMessage} />
          <p>{message}</p>
          <p>
            <span onClick={() => setIsSignedUp(false)} style={{ cursor: 'pointer', color: 'blue' }}>
              Go to Sign Up
            </span>
          </p>
        </div>
      ) : (
        <div>
          <h2>Sign Up</h2>
          <SignupForm onSignupSuccess={handleSignupSuccess} />
          <p>{message}</p>
          <p>
            Already have an account? 
            <span onClick={() => setIsSignedUp(true)} style={{ cursor: 'pointer', color: 'blue' }}>
              Go to Login
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
