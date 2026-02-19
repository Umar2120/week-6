import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/Cart.css'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [showClearedMessage, setShowClearedMessage] = useState(false)
  const navigate = useNavigate()

  const handleClearCart = () => {
    clearCart()
    setShowClearedMessage(true)
    setTimeout(() => setShowClearedMessage(false), 3000)
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/shop" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      {showClearedMessage && <p className="success-message">Cart cleared!</p>}

      <div className="cart-content">
        <div className="cart-items-section">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} className="cart-item">
                  <td className="product-info">
                    <div className="product-cell">
                      <img src={item.image} alt={item.title} className="cart-item-image" />
                      <div>
                        <Link to={`/product/${item.id}`} className="item-title">{item.title}</Link>
                        <p className="item-category">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="price">₹{item.price.toFixed(2)}</td>
                  <td className="quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td className="total">₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td className="action">
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            
            <div className="summary-row">
              <span>Tax:</span>
              <span>₹{(getTotalPrice() * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="summary-row total-row">
              <span>Total:</span>
              <span>₹{(getTotalPrice() * 1.1).toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            
            <button 
              className="clear-cart-btn"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <Link to="/shop" className="continue-shopping-link">← Continue Shopping</Link>
    </div>
  )
}

export default Cart
