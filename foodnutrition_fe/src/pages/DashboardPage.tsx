
import { Link } from 'react-router-dom'

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-logo">foodnutrition</h2>

        <nav className="dashboard-nav">
          <Link to="/dashboard" className="active">
            Dashboard
          </Link>
          <Link to="/scan">Scan Product</Link>
          <Link to="/compare">Compare Products</Link>
          <Link to="/history">Scan History</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/">Back to Website</Link>
          <Link to="/login">Log Out</Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-greeting">Welcome back!</p>
            <h1>Your Nutrition Dashboard</h1>
            <p>Understand your food, make better choices.</p>
          </div>

          <div className="dashboard-avatar">V</div>
        </header>

        <section className="dashboard-welcome">
          <div>
            <p className="welcome-label">YOUR HEALTHIER CHOICE STARTS HERE</p>
            <h2>Know what you eat, one scan at a time.</h2>
            <p>
              Scan food nutrition labels and discover what's inside
              your favorite products.
            </p>
            <Link to="/scan" className="dashboard-primary-button">
              + Scan New Product
            </Link>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <span>Total Scans</span>
            <h3>0</h3>
            <p>Products analyzed</p>
          </div>

          <div className="stat-card">
            <span>Products Compared</span>
            <h3>0</h3>
            <p>Comparisons made</p>
          </div>

          <div className="stat-card">
            <span>Recent Activity</span>
            <h3>0</h3>
            <p>Recent scans</p>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>What would you like to do today?</p>
            </div>
          </div>

          <div className="quick-actions">
            <Link to="/scan" className="action-card">
              <span className="action-icon">📷</span>
              <h3>Scan Product</h3>
              <p>Upload a nutrition label and analyze its contents.</p>
            </Link>

            <Link to="/compare" className="action-card">
              <span className="action-icon">⚖️</span>
              <h3>Compare Products</h3>
              <p>Compare nutrition facts from two different products.</p>
            </Link>

            <Link to="/history" className="action-card">
              <span className="action-icon">📋</span>
              <h3>Scan History</h3>
              <p>Review your previously analyzed products.</p>
            </Link>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Recent Scans</h2>
              <p>Your latest analyzed products will appear here.</p>
            </div>

            <Link to="/history" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="empty-state">
            <span>🥗</span>
            <h3>No scans yet</h3>
            <p>
              Start by scanning your first food product to see its
              nutrition information here.
            </p>
            <Link to="/scan">Scan Your First Product</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
