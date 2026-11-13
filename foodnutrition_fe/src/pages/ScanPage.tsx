
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function ScanPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [productName, setProductName] = useState('')
  const [error, setError] = useState('')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5 MB.')
      return
    }

    setError('')
    setSelectedImage(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage)
    }

    setSelectedImage(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAnalyze = () => {
    if (!selectedImage) {
      setError('Please upload a nutrition label first.')
      return
    }

    if (!productName.trim()) {
      setError('Please enter the product name.')
      return
    }

    sessionStorage.setItem(
      'foodnutrition_scan',
      JSON.stringify({
        productName,
        image: selectedImage,
      })
    )

    window.location.href = '/scan/result'
  }

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
        <header className="scan-header">
          <div>
            <p className="dashboard-greeting">FOOD ANALYSIS</p>
            <h1>Scan Nutrition Label</h1>
            <p>Upload a product label to understand its nutritional content.</p>
          </div>
        </header>

        <div className="scan-content">
          <section className="scan-instructions">
            <h2>Let's analyze your food!</h2>
            <p>
              Take a clear photo of the nutrition facts panel on your
              food packaging. Make sure all the information is readable.
            </p>
          </section>

          <section className="scan-form">
            <div className="scan-form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                type="text"
                placeholder="e.g. Chocolate Milk"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
              />
            </div>

            <div className="scan-form-group">
              <label>Upload Nutrition Label</label>

               
                {!selectedImage ? (
                <div className="scan-upload-options">
                    <button
                    type="button"
                    className="scan-option-card"
                    onClick={() => {
                        if (fileInputRef.current) {
                        fileInputRef.current.setAttribute('capture', 'environment')
                        fileInputRef.current.click()
                        }
                    }}
                    >
                    <span className="scan-option-icon">📸</span>
                    <h3>Take a Photo</h3>
                    <p>Use your camera to capture a nutrition label.</p>
                    <span className="scan-option-link">Open Camera →</span>
                    </button>

                    <button
                    type="button"
                    className="scan-option-card"
                    onClick={() => {
                        if (fileInputRef.current) {
                        fileInputRef.current.removeAttribute('capture')
                        fileInputRef.current.click()
                        }
                    }}
                    >
                    <span className="scan-option-icon">🖼️</span>
                    <h3>Upload from Gallery</h3>
                    <p>Choose an existing image from your device.</p>
                    <span className="scan-option-link">Choose Image →</span>
                    </button>
                </div>
                ) : (
                <div className="image-preview">
                    <img src={selectedImage} alt="Nutrition label preview" />

                    <button
                    type="button"
                    className="remove-image-button"
                    onClick={handleRemoveImage}
                    >
                    Remove Image
                    </button>
                </div>
                )}  

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                hidden
                onChange={handleImageUpload}
              />

              {error && <p className="scan-error">{error}</p>}
            </div>

            <div className="scan-tips">
              <h3>📌 Tips for a better scan</h3>
              <ul>
                <li>Make sure the nutrition label is clearly visible.</li>
                <li>Avoid blurry or dark images.</li>
                <li>Capture the entire nutrition facts panel.</li>
              </ul>
            </div>

            <button
              type="button"
              className="analyze-button"
              onClick={handleAnalyze}
            >
              Analyze Nutrition Label →
            </button>
          </section>
        </div>
      </main>
    </div>
  )
}

export default ScanPage
