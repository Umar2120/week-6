import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import { Link, useNavigate } from 'react-router-dom'
import { selectCartItems, selectCartTotalPrice, removeFromCart, updateQuantity } from '../store/cartSlice'
import '../styles/Profile.css'

function Profile() {
  const dispatch = useDispatch()
  const { user, logout, isLoading } = useAuth()
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotalPrice)
  const { getOrdersForUser } = useOrders()
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState(null)

  // Load profile image after user is available
  useEffect(() => {
    if (user?.username) {
      const savedImage = localStorage.getItem(`profile_${user.username}`)
      if (savedImage) {
        setProfileImage(savedImage)
      }
    }
  }, [user?.username])

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center', color: '#333' }}>Loading...</div>
  if (!user) return null

  const orders = getOrdersForUser(user.username)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target.result
        setProfileImage(imageData)
        localStorage.setItem(`profile_${user.username}`, imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="profile-page">
      {/* Header with Logout */}
      <div className="profile-header">
        <h1>My Profile</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-avatar">
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
              <label className="upload-btn">
                +
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="profile-details">
              <h2>{user.username}</h2>
              <p className="role-badge">{user.role === 'user' ? '👤 User' : '🔑 Admin'}</p>
              <p className="member">Member since {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="profile-grid">
          {/* Cart Section */}
          <div className="cart-section">
            <h3>🛒 My Cart</h3>
            {cartItems.length === 0 ? (
              <div className="empty-state">
                <p>Your cart is empty</p>
                <Link to="/shop" className="shop-btn">Continue Shopping</Link>
              </div>
            ) : (
              <div className="cart-items-container">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td className="product-name">{item.title}</td>
                        <td className="price">₹{item.price.toFixed(2)}</td>
                        <td className="quantity">
                          <button onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity - 1 }))} disabled={item.quantity <= 1}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity + 1 }))}>+</button>
                        </td>
                        <td className="total">₹{(item.price * item.quantity).toFixed(2)}</td>
                        <td className="action">
                          <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="cart-footer">
                  <div className="cart-total">
                    <strong>Cart Total:</strong>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <Link to="/checkout" className="checkout-link">Proceed to Checkout →</Link>
                </div>
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div className="orders-section">
            <h3>📦 My Orders</h3>
            {orders.length === 0 ? (
              <div className="empty-state">
                <p>No orders yet</p>
              </div>
            ) : (
              <div className="orders-compact">
                {orders.map(order => (
                  <div key={order.id} className="order-compact-card">
                    <div className="order-compact-header">
                      <div>
                        <p className="order-id">{order.id}</p>
                        <p className="order-date">{order.date}</p>
                      </div>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-compact-items">
                      {order.cartItems?.map(item => (
                        <div key={item.id} className="compact-item">
                          <span>{item.title}</span>
                          <span>x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-compact-total">
                      Total: <strong>₹{order.total?.toFixed(2) || '0.00'}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
