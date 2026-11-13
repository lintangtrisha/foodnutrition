import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ScanPage from './pages/ScanPage'
import ScanResultPage from './pages/ScanResultPage'
import ComparePage from './pages/ComparePage'
import HistoryPage from './pages/HistoryPage'
import CompleteProfilePage from './pages/CompleteProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/scan/result" element={<ScanResultPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/complete/profile" element={<CompleteProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App