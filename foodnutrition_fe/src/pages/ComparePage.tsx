
import { useState } from 'react'
import { Link } from 'react-router-dom'

type Product = {
  id: string
  name: string
  category: string
  serving: string
  energy: number
  protein: number
  fat: number
  carbohydrates: number
  sugar: number
  sodium: number
}

const sampleProducts: Product[] = [
  {
    id: 'milk-choco',
    name: 'Chocolate Milk',
    category: 'Milk Drink',
    serving: '200 ml',
    energy: 150,
    protein: 8,
    fat: 5,
    carbohydrates: 12,
    sugar: 10,
    sodium: 120,
  },
  {
    id: 'milk-strawberry',
    name: 'Strawberry Milk',
    category: 'Milk Drink',
    serving: '200 ml',
    energy: 180,
    protein: 7,
    fat: 6,
    carbohydrates: 20,
    sugar: 16,
    sodium: 110,
  },
  {
    id: 'yogurt',
    name: 'Plain Yogurt',
    category: 'Dairy Product',
    serving: '100 g',
    energy: 95,
    protein: 5,
    fat: 3,
    carbohydrates: 11,
    sugar: 8,
    sodium: 65,
  },
]

const nutrientRows = [
  { key: 'energy', label: 'Energy', unit: 'kcal' },
  { key: 'protein', label: 'Protein', unit: 'g' },
  { key: 'fat', label: 'Total Fat', unit: 'g' },
  { key: 'carbohydrates', label: 'Carbohydrates', unit: 'g' },
  { key: 'sugar', label: 'Total Sugar', unit: 'g' },
  { key: 'sodium', label: 'Sodium', unit: 'mg' },
] as const

function ComparePage() {
  const [firstId, setFirstId] = useState('milk-choco')
  const [secondId, setSecondId] = useState('milk-strawberry')

  const firstProduct = sampleProducts.find(
    (product) => product.id === firstId
  )!

  const secondProduct = sampleProducts.find(
    (product) => product.id === secondId
  )!

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-logo">foodnutrition</h2>

        <nav className="dashboard-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/scan">Scan Product</Link>
          <Link to="/compare" className="active">Compare Products</Link>
          <Link to="/history">Scan History</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/">Back to Website</Link>
          <Link to="/login">Log Out</Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="compare-header">
          <div>
            <p className="dashboard-greeting">PRODUCT COMPARISON</p>
            <h1>Compare Products</h1>
            <p>Discover the nutritional differences between two products.</p>
          </div>
        </header>

        <section className="compare-intro">
          <span className="compare-intro-icon">⚖️</span>
          <div>
            <h2>Make informed food choices</h2>
            <p>
              Select two food products to compare their nutritional
              information side by side.
            </p>
          </div>
        </section>

        <section className="compare-selection">
          <div className="compare-product-selector">
            <div className="compare-product-label">
              <span className="product-number">01</span>
              <label htmlFor="firstProduct">First Product</label>
            </div>

            <select
              id="firstProduct"
              value={firstId}
              onChange={(event) => setFirstId(event.target.value)}
            >
              {sampleProducts.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                  disabled={product.id === secondId}
                >
                  {product.name}
                </option>
              ))}
            </select>

            <p>{firstProduct.category}</p>
          </div>

          <div className="compare-versus">VS</div>

          <div className="compare-product-selector">
            <div className="compare-product-label">
              <span className="product-number">02</span>
              <label htmlFor="secondProduct">Second Product</label>
            </div>

            <select
              id="secondProduct"
              value={secondId}
              onChange={(event) => setSecondId(event.target.value)}
            >
              {sampleProducts.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                  disabled={product.id === firstId}
                >
                  {product.name}
                </option>
              ))}
            </select>

            <p>{secondProduct.category}</p>
          </div>
        </section>

        <section className="compare-results">
          <div className="compare-results-heading">
            <div>
              <h2>Nutrition Comparison</h2>
              <p>Compare the nutritional values of both products.</p>
            </div>
            <span className="compare-demo-badge">SAMPLE DATA</span>
          </div>

          <div className="compare-table">
            <div className="compare-table-header">
              <div>NUTRIENT</div>
              <div>{firstProduct.name}</div>
              <div>{secondProduct.name}</div>
            </div>

            {nutrientRows.map((nutrient) => (
              <div className="compare-table-row" key={nutrient.key}>
                <div className="compare-nutrient-name">
                  {nutrient.label}
                </div>
                <div>
                  <strong>
                    {firstProduct[nutrient.key]} {nutrient.unit}
                  </strong>
                </div>
                <div>
                  <strong>
                    {secondProduct[nutrient.key]} {nutrient.unit}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <p className="compare-serving-note">
            Serving sizes: {firstProduct.name} — {firstProduct.serving};
            {' '}{secondProduct.name} — {secondProduct.serving}.
            Values are shown as sample data and serving sizes may differ.
          </p>
        </section>

        <section className="compare-disclaimer">
          <span>💡</span>
          <p>
            Nutritional values alone do not determine which product is
            healthier for everyone. Consider serving size, ingredients,
            and your individual needs when comparing products.
          </p>
        </section>

        <div className="compare-footer-actions">
          <Link to="/scan" className="compare-secondary-button">
            + Scan Another Product
          </Link>
          <Link to="/dashboard" className="compare-primary-button">
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}

export default ComparePage
