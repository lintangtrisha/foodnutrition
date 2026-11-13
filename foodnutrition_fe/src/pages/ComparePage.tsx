
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GitCompareArrows,
  ArrowLeftRight,
  ScanLine,
  LayoutDashboard,
  Lightbulb,
  Info,
  ArrowRight,
} from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'

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
      <Sidebar />

      <main className="dashboard-main compare-page-main">
        {/* HEADER */}
        <header className="compare-header">
          <div>
            <p className="dashboard-greeting">PRODUCT COMPARISON</p>
            <h1>Compare Products</h1>
            <p>
              Discover the nutritional differences between two products.
            </p>
          </div>
        </header>

        {/* INTRO */}
        <section className="compare-intro">
          <div className="compare-intro-icon">
            <GitCompareArrows size={30} />
          </div>

          <div>
            <p className="compare-intro-label">SMART COMPARISON</p>
            <h2>Make informed food choices</h2>
            <p>
              Select two food products and compare their nutritional
              information side by side.
            </p>
          </div>
        </section>

        {/* PRODUCT SELECTION */}
        <section className="compare-selection-section">
          <div className="compare-section-heading">
            <div>
              <h2>Select Products</h2>
              <p>Choose two products you want to compare.</p>
            </div>
            <span className="compare-demo-badge">SAMPLE DATA</span>
          </div>

          <div className="compare-selection">
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

              <div className="compare-selected-product">
                <span>{firstProduct.category}</span>
                <strong>{firstProduct.name}</strong>
                <small>Serving size: {firstProduct.serving}</small>
              </div>
            </div>

            <div className="compare-versus">
              <span>VS</span>
              <ArrowLeftRight size={20} />
            </div>

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

              <div className="compare-selected-product">
                <span>{secondProduct.category}</span>
                <strong>{secondProduct.name}</strong>
                <small>Serving size: {secondProduct.serving}</small>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="compare-results">
          <div className="compare-results-heading">
            <div>
              <h2>Nutrition Comparison</h2>
              <p>
                Compare the nutritional values of both selected products.
              </p>
            </div>
            <div className="compare-results-icon">
              <GitCompareArrows size={23} />
            </div>
          </div>

          <div className="compare-table-wrapper">
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
          </div>

          <p className="compare-serving-note">
            Serving sizes: {firstProduct.name} — {firstProduct.serving};
            {' '}{secondProduct.name} — {secondProduct.serving}.
            Values are sample data. Serving sizes may differ.
          </p>
        </section>

        {/* DISCLAIMER */}
        <section className="compare-disclaimer">
          <div className="compare-disclaimer-icon">
            <Lightbulb size={22} />
          </div>
          <div>
            <h3>Good to know</h3>
            <p>
              Nutritional values alone do not determine which product is
              healthier for everyone. Consider serving size, ingredients,
              and your individual needs when comparing products.
            </p>
          </div>
        </section>

        {/* FOOTER ACTIONS */}
        <div className="compare-footer-actions">
          <Link to="/scan" className="compare-secondary-button">
            <ScanLine size={17} />
            Scan Another Product
          </Link>

        </div>
      </main>
    </div>
  )
}

export default ComparePage
