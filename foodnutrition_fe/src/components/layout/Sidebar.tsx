
import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import {
  LayoutDashboard,
  ScanLine,
  GitCompareArrows,
  History,
  LogOut,
  Leaf,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

const navigate = useNavigate()

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout failed:', error.message)
    return
  }

  closeMenu()
  navigate('/login', { replace: true })
}

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Scan Product',
      path: '/scan',
      icon: ScanLine,
    },
    {
      name: 'Compare Products',
      path: '/compare',
      icon: GitCompareArrows,
    },
    {
      name: 'Scan History',
      path: '/history',
      icon: History,
    },
  ]

  const closeMenu = () => setIsOpen(false)

  return (
    <aside className="app-sidebar">
      <div className="sidebar-top">
        <Link to="/dashboard" className="sidebar-brand" onClick={closeMenu}>
          <span className="sidebar-brand-icon">
            <Leaf size={22} />
          </span>
          <span>foodnutrition</span>
        </Link>

        <button
          type="button"
          className="sidebar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      <div className={`sidebar-content ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-menu-label">MENU</div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <Link to="/" className="sidebar-bottom-link" onClick={closeMenu}>
            <ArrowLeft size={18} />
            <span>Back to Website</span>
          </Link>

          <button
  type="button"
  className="sidebar-bottom-link logout-link"
  onClick={handleLogout}
>
  <LogOut size={18} />
  <span>Log Out</span>
</button>

          <div className="sidebar-version">
            <span>FoodNutrition</span>
            <span>Smart Food Choices</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
