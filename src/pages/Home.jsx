import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../styles/Home.css'
import { useProducts } from '../context/ProductContext'

function Home() {
  const { products, loadMoreProducts, hasMore, loading: productsLoading, getProductsByCategory } = useProducts()
  const [loading, setLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [dragStart, setDragStart] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [filteredCategory, setFilteredCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity })
  const [isHomeFiltersOpen, setIsHomeFiltersOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(20)
  const navigate = useNavigate()
  const location = useLocation()
  const filteredRef = useRef(null)
  const loaderRef = useRef(null)
  const isLoadingMoreRef = useRef(false)

  // derive categories dynamically from product list; ensures adding a product automatically creates its category
  const categories = Array.from(
    new Set(products.map(p => p.category.toLowerCase()))
  ).map(cat => {
    // simple formatting: capitalize first letter of each word
    return cat.replace(/\b\w/g, c => c.toUpperCase())
  })
  
  const banners = [
    {
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-yFfwXBGCYKuVyPKnGoXbamgsqfVze904yA&s',
      title: 'New Arrivals',
      description: 'Check out our latest collection'
    },
    {
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&auto=format&fit=crop&q=80',
      title: 'Flash Deals',
      description: 'Limited time offers available now'
    },
      {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjOcKbmB_iyNAEcB3Ok6ylwdpZFmnxZyCAnA&s',
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcPp9Yzr66X5hp6v4TyJFqeHwF4myGUfZW5Q&s',
      title: 'New Arrivals',
      description: 'Check out our latest collection'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSA_6q5i8HuM_dv8wjco2YZKtQ2T3yRqiyoQ&s',
      title: 'Flash Deals',
      description: 'Limited time offers available now'
    }
  ]

  const priceBuckets = [
    { label: 'All', min: 0, max: Infinity },
    { label: '0 - 5,000', min: 0, max: 5000 },
    { label: '5,001 - 10,000', min: 5001, max: 10000 },
    { label: '10,001 - 15,000', min: 10001, max: 15000 },
    { label: '15,001+', min: 15001, max: Infinity },
  ]

  // products come from context; no network request required
  useEffect(() => {
    // parse category query parameter when landing on home
    const params = new URLSearchParams(location.search)
    const cat = params.get('category')
    if (cat) {
      setFilteredCategory(cat)
    } else {
      setFilteredCategory(null)
    }
  }, [location.search])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [banners.length])

  // no fetch; products come from local data via context

  const getCategoryProducts = (category, limit = null) => {
    const filtered = getProductsByCategory(category)
    return limit ? filtered.slice(0, limit) : filtered
  }

  const getFilteredProducts = () => {
    if (!filteredCategory) return []
    let filtered = getCategoryProducts(filteredCategory)

    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      )
    }

    filtered = filtered.filter(product => {
      const price = product.price
      return price >= priceRange.min && price <= priceRange.max
    })

    return filtered
  }

  const handleCategoryClick = (category) => {
    // determine next state
    const newCat = filteredCategory === category ? null : category
    setFilteredCategory(newCat)
    if (newCat) {
      setSearchTerm('')
      setPriceRange({ min: 0, max: Infinity })
    }
    // update URL so the selection persists and navbar clicks work later
    if (newCat) {
      navigate(`/?category=${encodeURIComponent(newCat)}`)
    } else {
      navigate('/')
    }
  }

  const handleMouseDown = (e) => {
    setDragStart(e.clientX)
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const diff = e.clientX - dragStart
    setDragOffset(diff)
  }

  const handleMouseUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = dragStart - e.clientX
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % banners.length)
      } else {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
      }
    }
    setDragOffset(0)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  // scroll filtered section into view when selection changes
  useEffect(() => {
    if (filteredCategory && filteredRef.current) {
      filteredRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [filteredCategory])

  useEffect(() => {
    if (!loaderRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting) return
        if (isLoadingMoreRef.current || !hasMore) return
        isLoadingMoreRef.current = true
        loadMoreProducts(20)
        setVisibleCount((prev) => prev + 20)
        setTimeout(() => {
          isLoadingMoreRef.current = false
        }, 200)
      },
      { rootMargin: '200px' }
    )
    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [loadMoreProducts, hasMore])

  const filteredProducts = getFilteredProducts().slice(0, visibleCount)

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  return (
    <div className="home-page">
      {/* Banner Carousel Section */}
      <div className="banner-section">
        <div
          className="carousel-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 1.5}rem + ${dragOffset}px))`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className="carousel-slide"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="banner-overlay"></div>
              <div className="banner-content">
                <h2>{banner.title}</h2>
                <p>{banner.description}</p>
                <Link to="/shop" className="banner-btn">
                  Shop Now →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <button className="carousel-btn carousel-prev" onClick={handlePrev} aria-label="Previous slide">
          ❮
        </button>
        <button className="carousel-btn carousel-next" onClick={handleNext} aria-label="Next slide">
          ❯
        </button>

        {/* Dots Navigation */}
        <div className="carousel-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Category Buttons */}
      <div className="category-buttons-section">
        <h3>Browse by Category</h3>
        <div className="category-buttons">
          <button 
            className="category-btn all-btn"
            onClick={() => {
              setFilteredCategory(null)
              setSearchTerm('')
              setPriceRange({ min: 0, max: Infinity })
              navigate('/')
            }}
          >
            View All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${filteredCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          className="home-filter-toggle-btn"
          type="button"
          onClick={() => setIsHomeFiltersOpen(true)}
        >
          Filters
        </button>
      </div>

      <div
        className={`home-filter-overlay ${isHomeFiltersOpen ? 'open' : ''}`}
        onClick={() => setIsHomeFiltersOpen(false)}
      />
      <aside className={`home-filter-sidebar ${isHomeFiltersOpen ? 'open' : ''}`}>
        <div className="home-filter-header">
          <h3>Filters</h3>
          <button
            className="home-close-filters-btn"
            type="button"
            onClick={() => setIsHomeFiltersOpen(false)}
            aria-label="Close filters"
          >
            Close
          </button>
        </div>
        <div className="home-filter-group">
          <label htmlFor="homeCategory">Category</label>
          <select
            id="homeCategory"
            value={filteredCategory || 'all'}
            onChange={(e) => {
              const value = e.target.value
              if (value === 'all') {
                setFilteredCategory(null)
                setSearchTerm('')
                setPriceRange({ min: 0, max: Infinity })
                navigate('/')
              } else {
                setFilteredCategory(value)
                setSearchTerm('')
                setPriceRange({ min: 0, max: Infinity })
                navigate(`/?category=${encodeURIComponent(value)}`)
              }
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="home-filter-group">
          <label htmlFor="homeSearch">Search</label>
          <input
            id="homeSearch"
            type="text"
            value={searchTerm}
            placeholder="Search within category..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="home-filter-group">
          <span>Price Range</span>
          <div className="home-price-buttons">
            {priceBuckets.map((bucket) => (
              <button
                key={bucket.label}
                type="button"
                className={priceRange.min === bucket.min && priceRange.max === bucket.max ? 'active' : ''}
                onClick={() => setPriceRange({ min: bucket.min, max: bucket.max })}
              >
                {bucket.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Filtered Results Section (appears when a category is selected) */}
      {filteredCategory && (
        <section className="product-section filtered" ref={filteredRef}>
          <div className="section-header">
            <h2>{filteredCategory} Products</h2>
            <button className="view-all" onClick={() => setFilteredCategory(null)}>
              Clear Filter
            </button>
          </div>
          <div className="products-display">
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No products match the filters</p>
              </div>
            ) : (
              filteredProducts.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-preview"
                >
                  <div className="product-preview-img">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <h4>{product.title}</h4>
                  <div className="rating-row">
                    <span className="rating-value">⭐ {product.rating?.rate || 'N/A'}</span>
                    <span className="rating-count">({product.rating?.count || 0})</span>
                  </div>
                  <div className="price-row">
                    <p className="price">₹{product.price.toFixed(2)}</p>
                    <Link
                      className="buy-btn"
                      to={`/product/${product.id}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      Buy Now
                    </Link>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="infinite-loader" ref={loaderRef}>
            {productsLoading ? 'Loading more products...' : hasMore ? 'Scroll for more products' : 'You have reached the end'}
          </div>
        </section>
      )}

      {/* Product Sections (only shown when no filter is active) */}
      {!filteredCategory && (
        <div className="products-sections">
          {/* Top Selection - Electronics */}
          <section className="product-section">
            <div className="section-header">
              <h2>Top Selection ⭐</h2>
              <Link to="/shop" className="view-all">
                View All →
              </Link>
            </div>
            <div className="products-display">
              {getCategoryProducts('Electronics', 12).map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-preview"
                >
                  <div className="product-preview-img">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <h4>{product.title}</h4>
                  <div className="rating-row">
                    <span className="rating-value">⭐ {product.rating?.rate || 'N/A'}</span>
                    <span className="rating-count">({product.rating?.count || 0})</span>
                  </div>
                  <div className="price-row">
                    <p className="price">₹{product.price.toFixed(2)}</p>
                    <Link
                      className="buy-btn"
                      to={`/product/${product.id}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      Buy Now
                    </Link>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular Picks - Jewelery */}
          <section className="product-section">
            <div className="section-header">
              <h2>Popular Picks 🔥</h2>
              <Link to="/shop" className="view-all">
                View All →
              </Link>
            </div>
            <div className="products-display">
              {getCategoryProducts('Jewelery', 12).map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-preview"
                >
                  <div className="product-preview-img">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <h4>{product.title}</h4>
                  <div className="rating-row">
                    <span className="rating-value">⭐ {product.rating?.rate || 'N/A'}</span>
                    <span className="rating-count">({product.rating?.count || 0})</span>
                  </div>
                  <div className="price-row">
                    <p className="price">₹{product.price.toFixed(2)}</p>
                    <Link
                      className="buy-btn"
                      to={`/product/${product.id}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      Buy Now
                    </Link>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Suggested for You - Men's Clothing */}
          <section className="product-section">
            <div className="section-header">
              <h2>Suggested for You 💡</h2>
              <Link to="/shop" className="view-all">
                View All →
              </Link>
            </div>
            <div className="products-display">
              {getCategoryProducts("Men's Clothing", 12).map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-preview"
                >
                  <div className="product-preview-img">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <h4>{product.title}</h4>
                  <div className="rating-row">
                    <span className="rating-value">⭐ {product.rating?.rate || 'N/A'}</span>
                    <span className="rating-count">({product.rating?.count || 0})</span>
                  </div>
                  <div className="price-row">
                    <p className="price">₹{product.price.toFixed(2)}</p>
                    <Link
                      className="buy-btn"
                      to={`/product/${product.id}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      Buy Now
                    </Link>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Women's Fashion - Women's Clothing */}
          <section className="product-section">
            <div className="section-header">
              <h2>Women's Fashion 👗</h2>
              <Link to="/shop" className="view-all">
                View All →
              </Link>
            </div>
            <div className="products-display">
              {getCategoryProducts("Women's Clothing", 12).map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-preview"
                >
                  <div className="product-preview-img">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <h4>{product.title}</h4>
                  <div className="rating-row">
                    <span className="rating-value">⭐ {product.rating?.rate || 'N/A'}</span>
                    <span className="rating-count">({product.rating?.count || 0})</span>
                  </div>
                  <div className="price-row">
                    <p className="price">₹{product.price.toFixed(2)}</p>
                    <Link
                      className="buy-btn"
                      to={`/product/${product.id}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      Buy Now
                    </Link>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Home
