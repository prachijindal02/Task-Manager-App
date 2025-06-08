import React from 'react';
import './SignIn.css'; // We'll create this next

export default function SignIn() {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="signin-title">Welcome Back</h2>
        <form className="signin-form">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" required />

          <label>Password</label>
          <input type="password" placeholder="••••••••" required />

          <div className="signin-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Sign In</button>

          <p className="signup-text">
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
