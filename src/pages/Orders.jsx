import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'
import '../styles/Orders.css'

function Orders() {
  const { orders } = useOrders()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="orders-container">
        <div className="orders-empty">
          <h1>My Orders</h1>
          <p>Please log in to view your orders</p>
          <Link to="/login" className="login-link">Go to Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>You haven't placed any orders yet</p>
          <Link to="/shop" className="shopping-link">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>{order.id}</h3>
                  <p className="order-date">Order Date: {order.date}</p>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-details">
                <div className="shipping-info">
                  <h4>Shipping Address</h4>
                  <p>{order.formData.fullName}</p>
                  <p>{order.formData.address}</p>
                  <p>{order.formData.city}, {order.formData.zipCode}</p>
                  <p className="email">{order.formData.email}</p>
                </div>

                <div className="order-items">
                  <h4>Items Ordered</h4>
                  <div className="items-list">
                    {order.cartItems.map(item => (
                      <div key={item.id} className="order-item">
                        <div className="item-img">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div className="item-info">
                          <p className="item-title">{item.title}</p>
                          <p className="item-qty">Quantity: {item.quantity}</p>
                          <p className="item-price">₹{item.price.toFixed(2)} each</p>
                        </div>
                        <div className="item-total">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%):</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
