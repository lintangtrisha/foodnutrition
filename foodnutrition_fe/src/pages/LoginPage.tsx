
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="auth-page">
      <Link to="/" className="brand auth-brand">
        <span className="brand-icon">F</span>
        <span>
          food<span className="brand-highlight">nutrition</span>
        </span>
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
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="auth-password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="auth-login-options">
            <label className="auth-remember">
              <input
                type="checkbox"
                name="remember"
              />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password" className="auth-forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button
            type="button"
            className="button button-primary auth-submit"
          >
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>
      </div>

      <p className="auth-copyright">© 2026 FoodNutrition</p>
    </div>
  )
}

export default LoginPage
