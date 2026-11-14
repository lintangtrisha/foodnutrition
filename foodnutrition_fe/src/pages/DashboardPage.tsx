
import { Link } from 'react-router-dom'
import {
  ScanLine,
  GitCompareArrows,
  History,
  Salad,
  ArrowRight,
  Activity,
} from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-main">
        {/* HEADER */}
        <header className="dashboard-header">
          <div className="dashboard-header-content">
            <p className="dashboard-greeting">Welcome back!</p>
            <h1>Your Nutrition Dashboard</h1>
            <p className="dashboard-subtitle">
              Understand your food, make better choices.
            </p>
          </div>

          <button
            type="button"
            className="dashboard-profile"
            aria-label="User profile"
          >
            <span className="dashboard-avatar">V</span>
            <span className="dashboard-profile-info">
              <strong>Vivi</strong>
              <small>Food Explorer</small>
            </span>
          </button>
        </header>

        {/* WELCOME BANNER */}
        <section className="dashboard-welcome">
          <div>
            <p className="welcome-label">
              YOUR HEALTHIER CHOICE STARTS HERE
            </p>
            <h2 style={{ color: 'white' }}>Know what you eat, one scan at a time.</h2>
            <p>
              Scan food nutrition labels and discover what's inside
              your favorite products.
            </p>

            <Link to="/scan" className="dashboard-primary-button">
              <ScanLine size={18} />
              Scan New Product
            </Link>
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-card-top">
              <span>Total Scans</span>
              <div className="stat-icon">
                <ScanLine size={21} />
              </div>
            </div>
            <h3>0</h3>
            <p>Products analyzed</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span>Products Compared</span>
              <div className="stat-icon">
                <GitCompareArrows size={21} />
              </div>
            </div>
            <h3>0</h3>
            <p>Comparisons made</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span>Recent Activity</span>
              <div className="stat-icon">
                <Activity size={21} />
              </div>
            </div>
            <h3>0</h3>
            <p>Recent scans</p>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="dashboard-section">
          <div className="section-heading centered-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>What would you like to do today?</p>
            </div>
          </div>

          <div className="quick-actions">
            <Link to="/scan" className="action-card">
              <span className="action-icon">
                <ScanLine size={27} />
              </span>
              <h3>Scan Product</h3>
              <p>
                Upload a nutrition label and analyze its contents.
              </p>
              <span className="action-arrow">
                Get Started <ArrowRight size={16} />
              </span>
            </Link>

            <Link to="/compare" className="action-card">
              <span className="action-icon">
                <GitCompareArrows size={27} />
              </span>
              <h3>Compare Products</h3>
              <p>
                Compare nutrition facts from two different products.
              </p>
              <span className="action-arrow">
                Get Started <ArrowRight size={16} />
              </span>
            </Link>

            <Link to="/history" className="action-card">
              <span className="action-icon">
                <History size={27} />
              </span>
              <h3>Scan History</h3>
              <p>
                Review your previously analyzed products.
              </p>
              <span className="action-arrow">
                Get Started <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </section>

        {/* RECENT SCANS */}
        <section className="dashboard-section">
          <div className="section-heading centered-heading">
            <div>
              <h2>Recent Scans</h2>
              <p>Your latest analyzed products will appear here.</p>
            </div>
          </div>

          <div className="empty-state">
            <div className="empty-state-icon">
              <Salad size={38} />
            </div>

            <h3>No scans yet</h3>
            <p>
              Start by scanning your first food product to see its
              nutrition information here.
            </p>

            <Link to="/scan">
              Scan Your First Product <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
