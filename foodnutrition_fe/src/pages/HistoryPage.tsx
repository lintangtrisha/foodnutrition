
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Camera,
  Salad,
  Search,
  ScanLine,
  Flame,
  Dumbbell,
  Clock3,
  PackageSearch,
} from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'

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

  const filteredHistory = sampleHistory.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-main history-page-main">
        {/* HEADER */}
        <header className="history-header">
          <div>
            <p className="dashboard-greeting">YOUR ACTIVITY</p>
            <h1>Scan History</h1>
            <p>Keep track of the products you've explored.</p>
          </div>

          <Link to="/scan" className="dashboard-primary-button">
            <ScanLine size={18} />
            Scan New Product
          </Link>
        </header>

        {/* SUMMARY */}
        <section className="history-summary">
          <div className="history-stat-card">
            <div className="history-stat-icon">
              <Camera size={22} />
            </div>
            <div className="history-stat-info">
              <p>Total Scans</p>
              <h2>{sampleHistory.length}</h2>
              <span>Products analyzed</span>
            </div>
          </div>

          <div className="history-stat-card">
            <div className="history-stat-icon">
              <Salad size={22} />
            </div>
            <div className="history-stat-info">
              <p>Products Explored</p>
              <h2>{sampleHistory.length}</h2>
              <span>Unique products</span>
            </div>
          </div>
        </section>

        {/* HISTORY LIST */}
        <section className="history-section">
          <div className="history-section-heading">
            <div>
              <h2>Recent Scans</h2>
              <p>Browse your previously scanned products.</p>
            </div>

            <div className="history-search-wrapper">
              <Search size={18} />
              <input
                type="text"
                className="history-search"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search scan history"
              />
            </div>
          </div>

          <div className="history-list">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <article className="history-item" key={item.id}>
                  <div className="history-product-icon">
                    <PackageSearch size={25} />
                  </div>

                  <div className="history-product-info">
                    <h3>{item.name}</h3>

                    <div className="history-product-meta">
                      <span>{item.category}</span>
                      <span className="history-meta-dot">•</span>
                      <span className="history-date">
                        <Clock3 size={13} />
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <div className="history-nutrients">
                    <div>
                      <Flame size={16} />
                      <strong>{item.energy} kcal</strong>
                      <span>Energy</span>
                    </div>

                    <div>
                      <Dumbbell size={16} />
                      <strong>{item.protein} g</strong>
                      <span>Protein</span>
                    </div>
                  </div>

                  <span className="history-status">
                    <span />
                    Scanned
                  </span>
                </article>
              ))
            ) : (
              <div className="history-empty-state">
                <div className="history-empty-icon">
                  <Search size={30} />
                </div>
                <h3>No products found</h3>
                <p>
                  We couldn't find any products matching "{search}".
                  Try another product name or category.
                </p>
                <button
                  type="button"
                  onClick={() => setSearch('')}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

          <div className="history-demo-note">
            <Clock3 size={16} />
            <p>
              These are sample records for frontend demonstration.
              Your actual scan history will be connected to the database later.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <div className="history-footer">
          <p>
            Showing {filteredHistory.length} of {sampleHistory.length} products
          </p>

        </div>
      </main>
    </div>
  )
}

export default HistoryPage
