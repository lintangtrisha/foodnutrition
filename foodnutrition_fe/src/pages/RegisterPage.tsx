import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Password and confirmation password do not match.')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      })

      if (error) throw error

      if (data.session) {
        setSuccess('Account created successfully. You can now log in.')
      } else {
        setSuccess(
          'Account created! Please check your email and click the verification link before logging in.'
        )
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

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

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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

          {error && (
            <p role="alert" className="auth-error">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="auth-success">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="button button-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>

        <Link to="/" className="back-home">
          &larr; Back to Home
        </Link>
      </div>

      <p className="auth-copyright">&copy; 2026 FoodNutrition</p>
    </div>
  )
}

export default RegisterPage