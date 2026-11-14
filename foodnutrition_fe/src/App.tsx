import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ScanPage from './pages/ScanPage'
import ScanResultPage from './pages/ScanResultPage'
import ComparePage from './pages/ComparePage'
import HistoryPage from './pages/HistoryPage'
import CompleteProfilePage from './pages/CompleteProfilePage'
import GuestRoute from './components/auth/GuestRoute'

import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/scan/result" element={<ScanResultPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/complete/profile" element={<CompleteProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App