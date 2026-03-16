import { Link, useNavigate } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductContext'
import { selectCartTotalItems } from '../store/cartSlice'
import { selectThemeMode, toggleTheme } from '../store/themeSlice'
import { selectFilters, setCategory, setSearchTerm } from '../store/filterSlice'
import '../styles/Navigation.css'

function Navigation() {
  const cartCount = useSelector(selectCartTotalItems)
  const themeMode = useSelector(selectThemeMode)
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)
  const { isAuthenticated, role, logout } = useAuth()
  const [showCategories, setShowCategories] = useState(false)
  const navigate = useNavigate()

  const { products } = useProducts()

  const categories = [
    'All Products',
    ...Array.from(new Set(products.map(p => p.category.toLowerCase())))
      .map(cat => cat.replace(/\b\w/g, c => c.toUpperCase()))
  ]

  const handleCategoryClick = useCallback((category) => {
    setShowCategories(false)
    if (category === 'All Products') {
      dispatch(setCategory('all'))
      navigate('/')
    } else {
      const normalized = category.toLowerCase()
      dispatch(setCategory(normalized))
      // keep Home category section behavior with query param
      navigate(`/?category=${encodeURIComponent(category)}`)
    }
  }, [dispatch, navigate])

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    if (filters.searchTerm.trim()) {
      // stay on shop so results update live
      if (window.location.pathname !== '/shop') {
        navigate('/shop')
      }
    }
  }, [filters.searchTerm, navigate])

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">ShopZone</Link>
      
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.searchTerm}
          onChange={(e) => {
            dispatch(setSearchTerm(e.target.value))
            if (window.location.pathname !== '/shop') {
              navigate('/shop')
            }
          }}
          className="search-input"
        />
        <button type="submit" className="search-btn">🔍</button>
      </form>

      <ul className="nav-links">
        <li className="categories-dropdown">
          <button 
            className="categories-btn"
            onClick={() => setShowCategories(!showCategories)}
          >
             Categories
          </button>
          {showCategories && (
            <div className="categories-menu">
              {categories.map(cat => (
                <button
                  key={cat}
                  className="category-option"
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {role === 'admin' && <li><Link to="/add-product">✏️ Add Product</Link></li>}
        {isAuthenticated && <li><Link to="/profile">👤 Profile</Link></li>}
        {isAuthenticated && <li><Link to="/orders">📦 Orders</Link></li>}
        <li>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={() => dispatch(toggleTheme())}
          >
            {themeMode === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </li>
        <li>
          <Link to="/cart" className="cart-link">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>
        {!isAuthenticated && (
          <li><Link to="/login">Login</Link></li>
        )}
        {isAuthenticated && (
          <li><button className="logout-link" onClick={() => {
              logout();
              navigate('/');
            }}>
            Logout
          </button></li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
