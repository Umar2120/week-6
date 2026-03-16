import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart as addToCartAction } from '../store/cartSlice'
import { useProducts } from '../context/ProductContext'
import '../styles/ProductDetails.css'

function ProductDetails() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { getProductById } = useProducts()
  const [addedToCart, setAddedToCart] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)

  const productImages = useMemo(() => {
    if (!product) return []
    const images = product.images?.length ? product.images : (product.image ? [product.image] : [])
    return images.filter(Boolean)
  }, [product])

  useEffect(() => {
    const p = getProductById(id)
    if (p) setProduct(p)
    else setError('Product not found')
  }, [id, getProductById])

  useEffect(() => {
    setCurrentFrame(0)
  }, [id, productImages.length])

  // no network request; just grab from context-provided list

  const handleAddToCart = () => {
    dispatch(addToCartAction(product))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleDragStart = (clientX) => {
    if (productImages.length <= 1) return
    setIsDragging(true)
    setDragStart(clientX)
  }

  const handleDragMove = (clientX) => {
    if (!isDragging || productImages.length <= 1) return
    const diff = clientX - dragStart
    if (Math.abs(diff) < 20) return
    const direction = diff > 0 ? -1 : 1
    setCurrentFrame((prev) => (prev + direction + productImages.length) % productImages.length)
    setDragStart(clientX)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  if (loading) return <div className="product-details-container"><p>Loading product...</p></div>
  if (error) return <div className="product-details-container"><p>Error: {error}</p></div>
  if (!product) return <div className="product-details-container"><p>Product not found</p></div>

  return (
    <div className="product-details-container">
      <Link to="/shop" className="back-link">← Back to Shop</Link>
      
      <div className="product-details">
        <div className="product-image-section">
          <div
            className={`product-360-view ${productImages.length > 1 ? 'is-rotatable' : ''}`}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0]?.clientX || 0)}
            onTouchMove={(e) => handleDragMove(e.touches[0]?.clientX || 0)}
            onTouchEnd={handleDragEnd}
          >
            <img
              src={productImages[currentFrame] || product.image}
              alt={product.title}
              className="product-detail-image"
              draggable={false}
            />
            {productImages.length > 1 && (
              <div className="rotate-hint">Drag to rotate</div>
            )}
          </div>
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
