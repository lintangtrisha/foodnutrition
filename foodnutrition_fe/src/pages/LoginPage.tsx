
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className="auth-page">
      <Link to="/" className="brand auth-brand">
        <span className="brand-icon">F</span>
        <span>food<span className="brand-highlight">nutrition</span></span>
      </Link>

      <div className="auth-container">
        <div className="auth-heading">
          <span className="eyebrow">WELCOME BACK</span>
          <h1>Welcome back!</h1>
          <p>Log in to continue your nutrition journey.</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="button" className="button button-primary auth-submit">
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>

        <Link to="/" className="back-home">← Back to Home</Link>
      </div>

      <p className="auth-copyright">© 2026 FoodNutrition</p>
    </div>
  )
}

export default LoginPage
