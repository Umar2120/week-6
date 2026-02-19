import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import '../styles/Checkout.css'

function Checkout() {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const { logout, user, role, isLoading } = useAuth()
  const { addOrder } = useOrders()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: ''
  })

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#333' }}>Loading...</div>
  }

  if (role === 'guest') {
    return (
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="empty-checkout">
          <p>Please log in to proceed with checkout</p>
          <Link to="/login" className="shopping-link">Go to Login</Link>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.zipCode || !formData.cardNumber) {
      alert('Please fill all fields')
      return
    }

    // Calculate totals
    const subtotal = getTotalPrice()
    const tax = subtotal * 0.1
    const total = subtotal + tax

    // Create and save order with username for later filtering
    addOrder({
      username: user?.username,
      formData,
      cartItems,
      subtotal,
      tax,
      total
    })

    // Simulate order placement
    setOrderPlaced(true)
    clearCart()
    
    setTimeout(() => {
      alert('Order placed successfully! Thank you for shopping with ShopZone.')
      navigate('/orders')
    }, 2000)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="empty-checkout">
          <p>Your cart is empty</p>
          <Link to="/shop" className="shopping-link">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. Your order is being processed.</p>
          <p className="order-number">Order will be completed shortly...</p>
        </div>
      </div>
    )
  }

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-details">
                  <p className="item-name">{item.title}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="total-row final">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="checkout-form-section">
          <h2>Shipping & Payment Details</h2>
          
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            {/* Shipping Info */}
            <div className="form-section">
              <h3>Shipping Address</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="123 Main St"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="New York"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="form-section">
              <h3>Payment Method</h3>
              
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  placeholder="4111 1111 1111 1111"
                  maxLength="19"
                />
              </div>

              <p className="payment-info">💳 This is a demo. Use any test card number.</p>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="submit" className="place-order-btn">
                Place Order
              </button>
              <Link to="/cart" className="back-to-cart-link">
                ← Back to Cart
              </Link>
            </div>
          </form>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
