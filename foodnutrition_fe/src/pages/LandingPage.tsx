
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="navbar">
        <Link to="/" className="brand">
          <span className="brand-icon">F</span>
          <span>food<span className="brand-highlight">nutrition</span></span>
        </Link>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About Us</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="nav-login">Log In</Link>
          <Link to="/register" className="button button-primary nav-button">
            Get Started
          </Link>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR FOOD, YOUR KNOWLEDGE
            </span>

            <h1>
              Know What You Eat.
              <span> Choose What’s Best.</span>
            </h1>

            <p className="hero-description">
              Understand what's inside your food. Scan nutrition labels,
              discover what the numbers mean, and make smarter food choices
              every day.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="button button-primary">
                Start Exploring <span>→</span>
              </Link>
              <a href="#how-it-works" className="button button-outline">
                Learn More
              </a>
            </div>

            <div className="hero-note">
              <span className="note-check">✓</span>
              Simple nutrition information for everyone
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-decoration decoration-one" />
            <div className="visual-decoration decoration-two" />

            <div className="nutrition-card">
              <div className="nutrition-card-header">
                <div>
                  <span className="card-label">NUTRITION OVERVIEW</span>
                  <h3>Product Analysis</h3>
                </div>
                <span className="card-icon">✳</span>
              </div>

              <div className="product-preview">
                <div className="product-placeholder">🥛</div>
                <div>
                  <strong>Milk Product</strong>
                  <span>Nutrition facts per serving</span>
                </div>
              </div>

              <div className="calorie-section">
                <span>Energy</span>
                <strong>150 <small>kcal</small></strong>
              </div>

              <div className="nutrition-divider" />

              <div className="nutrient-row">
                <span>Protein</span>
                <strong>8 g</strong>
              </div>
              <div className="nutrient-row">
                <span>Total Fat</span>
                <strong>5 g</strong>
              </div>
              <div className="nutrient-row">
                <span>Carbohydrates</span>
                <strong>12 g</strong>
              </div>
              <div className="nutrient-row">
                <span>Sugar</span>
                <strong>10 g</strong>
              </div>

              <div className="card-footer">
                <span className="footer-dot" />
                Example nutrition data
              </div>
            </div>

            <div className="floating-badge">
              <span>✦</span>
              Understand your food better
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <span className="eyebrow">WHAT YOU CAN DO</span>
            <h2>Nutrition knowledge, made simple.</h2>
            <p>
              Everything you need to understand food labels and make
              informed choices.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">⌗</div>
              <h3>Scan Nutrition Labels</h3>
              <p>
                Scan packaged food labels and get nutrition information
                in a more readable format.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">✧</div>
              <h3>Understand Nutrients</h3>
              <p>
                Learn what calories, protein, sugar, fat, and other
                nutrients mean in everyday language.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">⇄</div>
              <h3>Compare Products</h3>
              <p>
                Compare nutrition facts between products to help you
                make more informed decisions.
              </p>
            </article>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-content">
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>A smarter way to read food labels.</h2>
            <p>
              No need to guess what the numbers mean. FoodNutrition
              helps you understand the information already printed
              on your food packaging.
            </p>
          </div>

          <div className="steps-list">
            <div className="step-item">
              <span>01</span>
              <div>
                <h3>Scan the label</h3>
                <p>Capture the nutrition facts on your food packaging.</p>
              </div>
            </div>
            <div className="step-item">
              <span>02</span>
              <div>
                <h3>Explore the information</h3>
                <p>Review the extracted nutrients and their explanations.</p>
              </div>
            </div>
            <div className="step-item">
              <span>03</span>
              <div>
                <h3>Make informed choices</h3>
                <p>Use what you learn to compare products and understand your food.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section" id="about">
          <span className="eyebrow">START YOUR JOURNEY</span>
          <h2>Make every food choice more meaningful.</h2>
          <p>
            Get to know your food beyond what's written on the package.
          </p>
          <Link to="/register" className="button button-white">
            Get Started for Free <span>→</span>
          </Link>
        </section>
      </main>

      <footer className="footer">
        <Link to="/" className="brand">
          <span className="brand-icon">F</span>
          <span>food<span className="brand-highlight">nutrition</span></span>
        </Link>
        <p>Understand your food. Make informed choices.</p>
        <span className="copyright">© 2026 FoodNutrition. All rights reserved.</span>
      </footer>
    </div>
  )
}

export default LandingPage
