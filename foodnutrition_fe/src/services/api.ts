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