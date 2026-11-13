
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
          <span className="eyebrow">JOIN FOODNUTRITION</span>
          <h1>Create your account</h1>
          <p>Start understanding your food choices today.</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

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
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
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
            <span className="auth-field-hint">
              Use at least 8 characters.
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="auth-password-wrapper">
              <input
                id="confirm-password"
                name="password_confirmation"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                minLength={8}
                required
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <label className="auth-terms">
            <input type="checkbox" required />
            <span>
              I agree to the <Link to="/terms">Terms & Conditions</Link>
              {' '}and <Link to="/privacy">Privacy Policy</Link>.
            </span>
          </label>

          <button
            type="button"
            className="button button-primary auth-submit"
          >
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>
      </div>

      <p className="auth-copyright">© 2026 FoodNutrition</p>
    </div>
  )
}

export default RegisterPage
