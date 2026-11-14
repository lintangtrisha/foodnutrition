
import { Link, useNavigate } from 'react-router-dom'
import {
  UserRound,
  Ruler,
  Scale,
  Leaf,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react'

function CompleteProfilePage() {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Frontend demo: data belum disimpan ke database.
    navigate('/dashboard')
  }

  return (
    <div className="profile-setup-page">
      <div className="profile-setup-container">

        {/* BRAND */}
        <div className="profile-setup-brand">
          <a href="/" className="brand">
            <span className="brand-icon">F</span>
            <span>
              food<span className="brand-highlight">nutrition</span>
            </span>
          </a>
        </div>

        {/* PROGRESS */}
        <div className="profile-progress">
          <div className="profile-progress-info">
            <span>PROFILE SETUP</span>
            <span>Optional</span>
          </div>

          <div className="profile-progress-track">
            <div className="profile-progress-fill" />
          </div>
        </div>

        {/* HEADING */}
        <header className="profile-setup-heading">
          <div className="profile-setup-icon">
            <UserRound size={27} />
          </div>

          <span className="eyebrow">GET TO KNOW YOU</span>
          <h1>Complete Your Profile</h1>
          <p>
            Tell us a little about yourself to help us provide
            a more personalized nutrition experience.
          </p>
        </header>

        {/* FORM */}
        <form className="profile-setup-form" onSubmit={handleSubmit}>

          {/* BASIC INFORMATION */}
          <section className="profile-form-section">
            <div className="profile-form-heading">
              <div className="profile-form-icon">
                <UserRound size={19} />
              </div>

              <div>
                <h2>Basic Information</h2>
                <p>A few details about yourself.</p>
              </div>
            </div>

            <div className="profile-form-grid">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="e.g. 21"
                />
              </div>

              <div className="form-group">
                <label htmlFor="activity-level">Activity Level</label>
                <select
                  id="activity-level"
                  name="activity_level"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select activity level
                  </option>
                  <option value="low">Low - Mostly sitting</option>
                  <option value="moderate">Moderate - Some activity</option>
                  <option value="high">High - Very active</option>
                </select>
              </div>
            </div>
          </section>

          {/* BODY MEASUREMENTS */}
          <section className="profile-form-section">
            <div className="profile-form-heading">
              <div className="profile-form-icon">
                <Scale size={19} />
              </div>

              <div>
                <h2>Body Measurements</h2>
                <p>Optional information about your body.</p>
              </div>
            </div>

            <div className="profile-form-grid">
              <div className="form-group">
                <label htmlFor="height">
                  <Ruler size={14} />
                  Height (cm)
                </label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  min="1"
                  max="300"
                  placeholder="e.g. 165"
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">
                  <Scale size={14} />
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  min="1"
                  max="500"
                  placeholder="e.g. 55"
                />
              </div>
            </div>
          </section>

          {/* FOOD PREFERENCES */}
          <section className="profile-form-section">
            <div className="profile-form-heading">
              <div className="profile-form-icon">
                <Leaf size={19} />
              </div>

              <div>
                <h2>Food Preferences</h2>
                <p>Let us know your dietary preferences.</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dietary-preference">
                Dietary Preferences
              </label>

              <select
                id="dietary-preference"
                name="dietary_preference"
                defaultValue="no-preference"
              >
                <option value="no-preference">No Preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="food-allergies">Food Allergies</label>
              <input
                id="food-allergies"
                name="food_allergies"
                type="text"
                placeholder="e.g. Peanuts, milk, seafood"
              />

              <span className="profile-field-hint">
                Separate multiple allergies with commas.
              </span>
            </div>
          </section>

          {/* PRIVACY NOTE */}
          <div className="profile-privacy-note">
            <ShieldCheck size={19} />
            <p>
              Your profile information is optional. You can skip
              this step and complete it later.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="profile-setup-actions">
            <button type="submit" className="button button-primary">
              Save & Continue
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              className="profile-skip-button"
              onClick={() => navigate('/dashboard')}
            >
              Skip for Now
            </button>
          </div>
        </form>

        <Link to="/" className="back-home">
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <p className="auth-copyright">
          © 2026 FoodNutrition
        </p>
      </div>
    </div>
  )
}

export default CompleteProfilePage
