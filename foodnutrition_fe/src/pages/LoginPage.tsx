import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

const location = useLocation()

const from = location.state?.from?.pathname || '/dashboard'

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      navigate(from, { replace: true })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login gagal. Silakan coba lagi.'
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
          <span className="eyebrow">WELCOME BACK</span>
          <h1>Welcome back!</h1>
          <p>Log in to continue your nutrition journey.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
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
                placeholder="Enter your password"
                autoComplete="current-password"
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
          </div>

          <div className="auth-login-options">
            <label className="auth-remember">
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password" className="auth-forgot-link">
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p role="alert" className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="button button-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>

        <Link to="/" className="back-home">
          &larr; Back to Home
        </Link>
      </div>

      <p className="auth-copyright">&copy; 2026 Nutrilens</p>
    </div>
  )
}

export default LoginPage