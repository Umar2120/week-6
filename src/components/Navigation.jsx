import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductContext'
import '../styles/Navigation.css'

function Navigation() {
  const { getTotalItems } = useCart()
  const { isAuthenticated, role, logout } = useAuth()
  const cartCount = getTotalItems()
  const [searchTerm, setSearchTerm] = useState('')
  const [showCategories, setShowCategories] = useState(false)
  const navigate = useNavigate()

  const { products } = useProducts()

  const categories = [
    'All Products',
    ...Array.from(new Set(products.map(p => p.category.toLowerCase())))
      .map(cat => cat.replace(/\b\w/g, c => c.toUpperCase()))
  ]

  const handleCategoryClick = (category) => {
    setShowCategories(false)
    if (category === 'All Products') {
      navigate('/')
    } else {
      // send user to home with a query param so Home component can scroll and filter
      navigate(`/?category=${encodeURIComponent(category)}`)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">ShopZone</Link>
      
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
