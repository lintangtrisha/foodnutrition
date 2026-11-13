
import { Link } from 'react-router-dom'

function ScanResultPage() {
  let scanData: { productName?: string; image?: string } = {}

  try {
    scanData = JSON.parse(
      sessionStorage.getItem('foodnutrition_scan') || '{}'
    )
  } catch {
    scanData = {}
  }

  const productName = scanData.productName || 'Sample Food Product'

  const nutrients = [
    { name: 'Energy', amount: '150 kcal' },
    { name: 'Protein', amount: '8 g' },
    { name: 'Total Fat', amount: '5 g' },
    { name: 'Carbohydrates', amount: '12 g' },
    { name: 'Total Sugar', amount: '10 g' },
    { name: 'Sodium', amount: '120 mg' },
  ]

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-logo">foodnutrition</h2>

        <nav className="dashboard-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/scan" className="active">Scan Product</Link>
          <Link to="/compare">Compare Products</Link>
          <Link to="/history">Scan History</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/">Back to Website</Link>
          <Link to="/login">Log Out</Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="result-header">
          <div>
            <p className="dashboard-greeting">FOOD ANALYSIS</p>
            <h1>Nutrition Analysis Result</h1>
            <p>Review the nutritional information of your product.</p>
          </div>

          <Link to="/scan" className="result-back-link">
            ← Scan Another Product
          </Link>
        </header>

        <section className="result-product-card">
          <div className="result-product-image">
            {scanData.image ? (
              <img src={scanData.image} alt={productName} />
            ) : (
              <span>🥗</span>
            )}
          </div>

          <div className="result-product-info">
            <span className="result-status">SCAN COMPLETED</span>
            <h2>{productName}</h2>
            <p>Nutrition facts overview</p>
          </div>
        </section>

        <section className="result-notice">
          <span>ℹ️</span>
          <p>
            This is a sample result for frontend demonstration.
            Actual nutrition values will be extracted from the uploaded
            label through the OCR backend.
          </p>
        </section>

        <section className="nutrition-result-section">
          <div className="result-section-heading">
            <div>
              <h2>Nutrition Facts</h2>
              <p>Estimated display per serving</p>
            </div>
            <span className="serving-badge">Per serving</span>
          </div>

          <div className="nutrition-table">
            {nutrients.map((nutrient) => (
              <div className="nutrition-row" key={nutrient.name}>
                <span>{nutrient.name}</span>
                <strong>{nutrient.amount}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="result-bottom-grid">
          <div className="result-info-card">
            <span className="result-card-icon">💡</span>
            <h3>Understand Your Nutrition</h3>
            <p>
              Learn about the nutrients in your food and understand
              what each value represents.
            </p>
          </div>

          <div className="result-info-card">
            <span className="result-card-icon">⚖️</span>
            <h3>Compare with Other Products</h3>
            <p>
              Compare this product with another food product to
              understand their nutritional differences.
            </p>
            <Link to="/compare">Compare Products →</Link>
          </div>
        </section>

        <div className="result-actions">
          <Link to="/scan" className="result-primary-button">
            Scan Another Product
          </Link>
          <Link to="/dashboard" className="result-secondary-button">
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}

export default ScanResultPage
