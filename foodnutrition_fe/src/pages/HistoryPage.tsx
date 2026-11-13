
import { useState } from 'react'
import { Link } from 'react-router-dom'

type ScanHistory = {
  id: number
  name: string
  category: string
  date: string
  energy: number
  protein: number
}

const sampleHistory: ScanHistory[] = [
  {
    id: 1,
    name: 'Chocolate Milk',
    category: 'Milk Drink',
    date: 'November 12, 2026',
    energy: 150,
    protein: 8,
  },
  {
    id: 2,
    name: 'Potato Chips',
    category: 'Snack',
    date: 'November 11, 2026',
    energy: 160,
    protein: 2,
  },
  {
    id: 3,
    name: 'Strawberry Yogurt',
    category: 'Dairy Product',
    date: 'November 10, 2026',
    energy: 120,
    protein: 5,
  },
]

function HistoryPage() {
  const [search, setSearch] = useState('')

  const filteredHistory = sampleHistory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Link to="/dashboard" className="dashboard-logo">
          <span>🥗</span> foodnutrition
        </Link>

        <nav className="dashboard-nav">
          <Link to="/dashboard">▦ Dashboard</Link>
          <Link to="/scan">⌕ Scan Product</Link>
          <Link to="/compare">⇄ Compare Products</Link>
          <Link to="/history" className="active">◷ Scan History</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/">← Back to Website</Link>
          <Link to="/login">↪ Log Out</Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="history-header">
          <div>
            <p className="dashboard-greeting">YOUR ACTIVITY</p>
            <h1>Scan History</h1>
            <p>Keep track of the products you've explored.</p>
          </div>

          <Link to="/scan" className="dashboard-primary-button">
            + Scan New Product
          </Link>
        </header>

        <section className="history-summary">
          <div className="stat-card">
            <span className="stat-icon">📷</span>
            <p>Total Scans</p>
            <h2>{sampleHistory.length}</h2>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🥗</span>
            <p>Products Explored</p>
            <h2>{sampleHistory.length}</h2>
          </div>
        </section>

        <section className="history-section">
          <div className="history-section-heading">
            <div>
              <h2>Recent Scans</h2>
              <p>Browse your previously scanned products.</p>
            </div>

            <input
              type="text"
              className="history-search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="history-list">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <div className="history-item" key={item.id}>
                  <div className="history-product-icon">🥫</div>

                  <div className="history-product-info">
                    <h3>{item.name}</h3>
                    <p>{item.category} · {item.date}</p>
                  </div>

                  <div className="history-nutrients">
                    <div>
                      <strong>{item.energy} kcal</strong>
                      <span>Energy</span>
                    </div>
                    <div>
                      <strong>{item.protein} g</strong>
                      <span>Protein</span>
                    </div>
                  </div>

                  <span className="history-status">Scanned</span>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <span>🔎</span>
                <h3>No products found</h3>
                <p>Try searching with another product name.</p>
              </div>
            )}
          </div>

          <p className="history-demo-note">
            These are sample records for frontend demonstration.
            Your actual scan history will be connected to the database later.
          </p>
        </section>
      </main>
    </div>
  )
}

export default HistoryPage
