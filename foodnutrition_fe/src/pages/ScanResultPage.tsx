import { useEffect, useState } from 'react'
import { getInsights, type Insight } from '../services/api'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  Lightbulb,
  Scale,
  Salad,
  FlaskConical,
  Leaf,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'

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

  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoadingInsights, setIsLoadingInsights] = useState(true)
  const [insightError, setInsightError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchInsights() {
      try {
        const response = await getInsights()

        if (isMounted) {
          setInsights(response.data)
        }
      } catch (error) {
        if (isMounted) {
          setInsightError(
            error instanceof Error
              ? error.message
              : 'Failed to load nutrition insights.'
          )
        }
      } finally {
        if (isMounted) {
          setIsLoadingInsights(false)
        }
      }
    }

    fetchInsights()

    return () => {
      isMounted = false
    }
  }, [])

  const nutrients = [
    {
      name: 'Energy',
      amount: '150 kcal',
      description:
        'Energy menunjukkan jumlah energi yang diperoleh tubuh dari satu sajian makanan.',
    },
    {
      name: 'Protein',
      amount: '8 g',
      description:
        'Protein membantu pertumbuhan serta membangun dan memperbaiki jaringan tubuh.',
    },
    {
      name: 'Total Fat',
      amount: '5 g',
      description:
        'Lemak merupakan sumber energi dan membantu tubuh menyerap vitamin tertentu.',
    },
    {
      name: 'Carbohydrates',
      amount: '12 g',
      description:
        'Karbohidrat merupakan salah satu sumber energi utama bagi tubuh.',
    },
    {
      name: 'Total Sugar',
      amount: '10 g',
      description:
        'Total gula menunjukkan jumlah gula dalam satu sajian, termasuk gula alami dan gula tambahan.',
    },
    {
      name: 'Sodium',
      amount: '120 mg',
      description:
        'Sodium membantu fungsi saraf dan otot. Jumlah konsumsinya tetap perlu diperhatikan.',
    },
  ]

  const ingredients = [
    {
      name: 'Milk',
      category: 'Main Ingredient',
      description:
        'Bahan dasar yang dapat menyediakan protein dan beberapa mineral.',
    },
    {
      name: 'Sugar',
      category: 'Sweetener',
      description:
        'Digunakan untuk memberikan rasa manis pada produk.',
    },
    {
      name: 'Cocoa Powder',
      category: 'Flavoring Ingredient',
      description:
        'Memberikan rasa dan karakteristik warna cokelat.',
    },
    {
      name: 'Stabilizer',
      category: 'Food Additive',
      description:
        'Membantu menjaga konsistensi dan tekstur produk.',
    },
  ]

  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-main">
        {/* Page Header */}
        <header className="result-header">
          <div>
            <p className="dashboard-greeting">FOOD ANALYSIS</p>
            <h1>Nutrition Analysis Result</h1>
            <p>
              Understand what's inside your food and learn about its
              nutritional composition.
            </p>
          </div>

          <Link to="/scan" className="result-back-link">
            <ArrowLeft size={16} />
            Scan Another Product
          </Link>
        </header>

        {/* Product Overview */}
        <section className="result-product-card">
          <div className="result-product-image">
            {scanData.image ? (
              <img src={scanData.image} alt={productName} />
            ) : (
              <Salad size={42} />
            )}
          </div>

          <div className="result-product-info">
            <span className="result-status">
              <CheckCircle2 size={14} />
              SCAN COMPLETED
            </span>
            <h2>{productName}</h2>
            <p>Nutrition and ingredient overview</p>
          </div>
        </section>

        {/* Demo Notice */}
        <section className="result-notice">
          <Info size={19} />
          <p>
            This is a sample result for frontend demonstration.
            Nutrition values and ingredient explanations are illustrative
            and have not been extracted from the actual product label.
          </p>
        </section>

        {/* Nutrition Facts */}
        <section className="nutrition-result-section">
          <div className="result-section-heading">
            <div>
              <h2>Nutrition Facts</h2>
              <p>Explore the nutritional values of this product.</p>
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

        {/* Nutrition Insights */}
        <section className="result-analysis-section">
          <div className="result-section-heading">
            <div>
              <h2>Understand Your Nutrition</h2>
              <p>
                Discover what each nutrient does and why it matters.
              </p>
            </div>
            <div className="result-heading-icon">
              <Lightbulb size={22} />
            </div>
          </div>

          <div className="nutrient-insights-grid">
            {isLoadingInsights ? (
              <p>Loading nutrition insights...</p>
            ) : insightError ? (
              <p role="alert">
                Unable to load nutrition insights. Please try again later.
              </p>
            ) : insights.length > 0 ? (
              insights.map((insight) => (
                <article
                  className="nutrient-insight-card"
                  key={insight.id}
                >
                  <div className="nutrient-insight-top">
                    <h3>{insight.term}</h3>
                  </div>

                  <p>{insight.content}</p>

                  {insight.source_reference && (
                    <div className="insight-source">
                      <small>
                        Source: {insight.source_reference.institution}
                        {' — '}
                        {insight.source_reference.title}
                      </small>

                      <a
                        href={insight.source_reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View source
                      </a>

                      {insight.source_reference.section_page && (
                        <small>
                          {insight.source_reference.section_page}
                        </small>
                      )}
                    </div>
                  )}
                </article>
              ))
            ) : (
              <p>
                No nutrition insights are available yet.
              </p>
            )}
          </div>

          <div className="result-learning-note">
            <Sparkles size={19} />
            <p>
              <strong>Did you know?</strong> Nutrition values are usually
              presented per serving. Always check the serving size before
              interpreting the numbers.
            </p>
          </div>
        </section>

        {/* Ingredient Analysis */}
        <section className="result-analysis-section">
          <div className="result-section-heading">
            <div>
              <h2>Ingredient Analysis</h2>
              <p>
                Learn about the ingredients used in this product and
                their purposes.
              </p>
            </div>
            <div className="result-heading-icon">
              <FlaskConical size={22} />
            </div>
          </div>

          <div className="ingredient-list">
            {ingredients.map((ingredient, index) => (
              <article
                className="ingredient-card"
                key={ingredient.name}
              >
                <div className="ingredient-number">
                  {index + 1}
                </div>

                <div className="ingredient-content">
                  <div className="ingredient-title-row">
                    <h3>{ingredient.name}</h3>
                    <span className="ingredient-category">
                      {ingredient.category}
                    </span>
                  </div>
                  <p>{ingredient.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="result-learning-note">
            <Leaf size={19} />
            <p>
              <strong>Good to know:</strong> Ingredients are listed here
              as an educational guide. Their presence does not
              automatically mean a product is harmful.
            </p>
          </div>
        </section>

        {/* Overall Summary */}
        <section className="result-summary-card">
          <div className="result-summary-icon">
            <BookOpen size={24} />
          </div>

          <div>
            <h2>Overall Summary</h2>
            <p>
              This sample product contains protein, carbohydrates,
              fat, and sugar. You can use its nutrition facts and
              ingredient list to better understand the product's
              composition and make informed food choices.
            </p>
          </div>
        </section>

        {/* Compare Products */}
        <section className="result-info-card">
          <div className="result-info-card-heading">
            <Scale size={23} />
            <h3>Compare with Other Products</h3>
          </div>
          <p>
            Compare this product with another food product to
            understand their nutritional differences.
          </p>
          <Link to="/compare">
            Compare Products <ArrowRight size={16} />
          </Link>
        </section>

        {/* Bottom Actions */}
        <div className="result-actions">
          <Link to="/scan" className="result-primary-button">
            <Salad size={17} />
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
