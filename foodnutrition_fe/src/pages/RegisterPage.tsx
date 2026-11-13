
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <div className="auth-page">
      <Link to="/" className="brand auth-brand">
        <span className="brand-icon">F</span>
        <span>food<span className="brand-highlight">nutrition</span></span>
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
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
            />
          </div>

          <button type="button" className="button button-primary auth-submit">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>

        <Link to="/" className="back-home">← Back to Home</Link>
      </div>

      <p className="auth-copyright">© 2026 FoodNutrition</p>
    </div>
  )
}

export default RegisterPage
