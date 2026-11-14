const API_BASE_URL = '/api/v1'

// Source reference dari Laravel
export interface SourceReference {
  id: string
  institution: string
  title: string
  url: string
  section_page: string | null
  version_date: string | null
}

// Nutrition insight dari Laravel
export interface Insight {
  id: string
  term: string
  content: string
  source_reference: SourceReference
}

// Format pagination Laravel
export interface PaginatedResponse<T> {
  data: T[]
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

// Fungsi umum untuk mengambil data API
async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

// Mengambil Nutrition Insights
export function getInsights(search?: string) {
  const params = new URLSearchParams()

  if (search?.trim()) {
    params.set('search', search.trim())
  }

  const query = params.toString()

  return apiRequest<PaginatedResponse<Insight>>(
    `/insights${query ? `?${query}` : ''}`
  )
}

// Mengambil Source References
export function getSourceReferences() {
  return apiRequest<PaginatedResponse<SourceReference>>(
    '/source-references'
  )
}

export interface NutritionFact {
  name: string
  amount: string | null
}

export interface Ingredient {
  name: string
  category: string | null
  description: string | null
}

export interface ScanUploadResponse {
  status: 'success'
  message: string
  data: {
    product_name: string
    serving_size: string | null
    nutrition_facts: NutritionFact[]
    ingredients: Ingredient[]
    summary: string
    notes: string[]
  }
}

export async function analyzeScan(
  productName: string,
  image: File
): Promise<ScanUploadResponse> {
  const formData = new FormData()

  formData.append('product_name', productName)
  formData.append('image', image)

  const response = await fetch(`${API_BASE_URL}/scans/analyze`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || `Scan request failed: ${response.status}`
    )
  }

  return result as ScanUploadResponse
}