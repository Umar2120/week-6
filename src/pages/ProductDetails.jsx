import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductContext'
import '../styles/ProductDetails.css'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { getProductById } = useProducts()
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const p = getProductById(id)
    if (p) setProduct(p)
    else setError('Product not found')
  }, [id, getProductById])

  // no network request; just grab from context-provided list

  const handleAddToCart = () => {
    addToCart(product)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (loading) return <div className="product-details-container"><p>Loading product...</p></div>
  if (error) return <div className="product-details-container"><p>Error: {error}</p></div>
  if (!product) return <div className="product-details-container"><p>Product not found</p></div>

  return (
    <div className="product-details-container">
      <Link to="/shop" className="back-link">← Back to Shop</Link>
      
      <div className="product-details">
        <div className="product-image-section">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
        
        <div className="product-info-section">
          <h1>{product.title}</h1>
          
          <p className="category-badge">{product.category}</p>
          
          <div className="price-section">
            <p className="price">₹{product.price.toFixed(2)}</p>
            <p className="rating">
              Rating: {product.rating?.rate} / 5 ({product.rating?.count} reviews)
            </p>
          </div>

          <div className="description-section">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="cart-actions">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            {addedToCart && <Link to="/cart" className="view-cart-link">View Cart →</Link>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
