import { useNavigate } from 'react-router-dom'
import { analyzeScan } from '../services/api'
import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import {
  Camera,
  ImagePlus,
  ScanLine,
  X,
  Lightbulb,
  ArrowRight,
  Upload,
} from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'

function ScanPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [productName, setProductName] = useState('')
  const [error, setError] = useState('')

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Please upload a valid image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5 MB.')
      return
    }

    if (selectedImage) {
      URL.revokeObjectURL(selectedImage)
    }

    setError('')
    setSelectedImage(URL.createObjectURL(file))
    setSelectedFile(file)
  }

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage)
    }

    setSelectedImage(null)
    setSelectedFile(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment')
      fileInputRef.current.click()
    }
  }

  const openGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture')
      fileInputRef.current.click()
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please upload a nutrition label first.')
      return
    }

    if (!productName.trim()) {
      setError('Please enter the product name.')
      return
    }

  try {
    setError('')
    setIsUploading(true)

  const result = await analyzeScan(productName.trim(), selectedFile)

     navigate('/scan/result', {
       state: {
         productName: productName.trim(),
         image: selectedImage,
         upload: result,
       },
     })
   } catch (error) {
      setError(
       error instanceof Error
         ? error.message
         : 'Failed to upload nutrition label.'
     )
    } finally {
      setIsUploading(false)
    }
  }


  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-main scan-page-main">
        {/* HEADER */}
        <header className="scan-header">
          <div>
            <p className="dashboard-greeting">FOOD ANALYSIS</p>
            <h1>Scan Nutrition Label</h1>
            <p>
              Upload a product label to understand its nutritional content.
            </p>
          </div>
        </header>

        {/* SCAN CONTENT */}
        <div className="scan-content">
          {/* LEFT: INSTRUCTIONS */}
          <section className="scan-instructions">
            <div className="scan-instruction-icon">
              <ScanLine size={30} />
            </div>

            <p className="scan-instruction-label">SMART FOOD ANALYSIS</p>
            <h2>Let's analyze your food!</h2>

            <p className="scan-instruction-description">
              Take a clear photo of the nutrition facts panel on your
              food packaging. Our application will help you understand
              what's inside your favorite products.
            </p>

            <div className="scan-instruction-steps">
              <div className="scan-step">
                <span>01</span>
                <div>
                  <strong>Enter product name</strong>
                  <p>Tell us which product you want to analyze.</p>
                </div>
              </div>

              <div className="scan-step">
                <span>02</span>
                <div>
                  <strong>Upload nutrition label</strong>
                  <p>Take a photo or choose an image from your device.</p>
                </div>
              </div>

              <div className="scan-step">
                <span>03</span>
                <div>
                  <strong>Analyze your product</strong>
                  <p>Review the nutritional information.</p>
                </div>
              </div>
            </div>

            <div className="scan-tips">
              <div className="scan-tips-heading">
                <Lightbulb size={19} />
                <h3>Tips for a better scan</h3>
              </div>

              <ul>
                <li>Make sure the nutrition label is clearly visible.</li>
                <li>Avoid blurry or dark images.</li>
                <li>Capture the entire nutrition facts panel.</li>
              </ul>
            </div>
          </section>

          {/* RIGHT: SCAN FORM */}
          <section className="scan-form">
            <div className="scan-form-heading">
              <h2>Upload Your Product</h2>
              <p>Fill in the details below to get started.</p>
            </div>

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
              <label>Nutrition Label Image</label>

              {!selectedImage ? (
                <div className="scan-upload-options">
                  <button
                    type="button"
                    className="scan-option-card"
                    onClick={openCamera}
                  >
                    <span className="scan-option-icon">
                      <Camera size={28} />
                    </span>
                    <h3>Take a Photo</h3>
                    <p>Use your camera to capture a nutrition label.</p>
                    <span className="scan-option-link">
                      Open Camera <ArrowRight size={15} />
                    </span>
                  </button>

                  <button
                    type="button"
                    className="scan-option-card"
                    onClick={openGallery}
                  >
                    <span className="scan-option-icon">
                      <ImagePlus size={28} />
                    </span>
                    <h3>Upload from Gallery</h3>
                    <p>Choose an existing image from your device.</p>
                    <span className="scan-option-link">
                      Choose Image <ArrowRight size={15} />
                    </span>
                  </button>
                </div>
              ) : (
                <div className="image-preview">
                  <img
                    src={selectedImage}
                    alt="Nutrition label preview"
                  />

                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={handleRemoveImage}
                  >
                    <X size={16} />
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

              <p className="scan-upload-note">
                <Upload size={15} />
                Supported formats: JPG, JPEG, PNG. Maximum size: 5 MB.
              </p>

              {error && <p className="scan-error">{error}</p>}
            </div>

          <button
            type="button"
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={isUploading}
          >
            {isUploading ? 'Analyzing...' : 'Analyze Nutrition Label'}
            {!isUploading && <ArrowRight size={18} />}
          </button>
          </section>
        </div>
      </main>
    </div>
  )
}

export default ScanPage