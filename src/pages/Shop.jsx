import { useMemo, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/Shop.css'
import { useProducts } from '../context/ProductContext'
import {
  selectFilters,
  setCategory,
  setPriceRange,
  setSearchTerm,
  resetFilters,
} from '../store/filterSlice'

function Shop() {
  const { products, loadMoreProducts, hasMore, loading } = useProducts()
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const loaderRef = useRef(null)
  const isLoadingMoreRef = useRef(false)

  const categories = useMemo(() => {
    const setCategories = new Set(products.map(product => product.category))
    return ['all', ...Array.from(setCategories).sort()]
  }, [products])

  const priceBuckets = [
    { label: 'All', min: 0, max: Infinity },
    { label: '0 - 5,000', min: 0, max: 5000 },
    { label: '5,001 - 10,000', min: 5001, max: 10000 },
    { label: '10,001 - 15,000', min: 10001, max: 15000 },
    { label: '15,001+', min: 15001, max: Infinity },
  ]

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    if (filters.searchTerm.trim() !== '') {
      const searchLower = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower)
      )
    }

    filtered = filtered.filter(product => {
      const price = product.price
      return price >= filters.minPrice && price <= filters.maxPrice
    })

    return filtered
  }, [products, filters])

  const [visibleCount, setVisibleCount] = useState(20)
  const displayProducts = filteredProducts.slice(0, visibleCount)

  useEffect(() => {
    if (filters.category !== 'all' || filters.searchTerm.trim() !== '' || filters.minPrice !== 0 || filters.maxPrice !== Infinity) {
      setVisibleCount(20)
    }
  }, [filters])

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

  // with local data we don't need loading/error states.  keep fallback if filtered list empty
  // if you still want a loading indicator you can set `loading` in context and pass it through

  return (
    <div className="shop-container">
      <h1>Shop</h1>
      <button
        className="filter-toggle-btn"
        type="button"
        onClick={() => setIsFiltersOpen(true)}
      >
        Filters
      </button>
      <div className={`filter-overlay ${isFiltersOpen ? 'open' : ''}`} onClick={() => setIsFiltersOpen(false)} />
      <div className="shop-layout">
        <aside className={`filter-sidebar ${isFiltersOpen ? 'open' : ''}`}>
          <div className="filter-header">
            <h2>Filters</h2>
            <button
              className="close-filters-btn"
              type="button"
              onClick={() => setIsFiltersOpen(false)}
              aria-label="Close filters"
            >
              Close
            </button>
          </div>

          <div className="filter-group">
            <label htmlFor="searchTerm">Search</label>
            <input
              id="searchTerm"
              type="text"
              value={filters.searchTerm}
              placeholder="Search products..."
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <p>Price Range</p>
            {priceBuckets.map((bucket) => (
              <button
                key={bucket.label}
                type="button"
                className={filters.minPrice === bucket.min && filters.maxPrice === bucket.max ? 'active' : ''}
                onClick={() => dispatch(setPriceRange({ minPrice: bucket.min, maxPrice: bucket.max }))}
              >
                {bucket.label}
              </button>
            ))}
          </div>

          <button className="reset-filters-btn" type="button" onClick={() => dispatch(resetFilters())}>
            Reset Filters
          </button>
        </aside>

        <main className="shop-main">
          <div className="filter-summary">
            <p><strong>Active filters:</strong> {filters.category === 'all' ? 'All categories' : filters.category}</p>
            <p><strong>Price:</strong> {filters.minPrice === 0 && filters.maxPrice === Infinity ? 'All' : `₹${filters.minPrice} - ₹${filters.maxPrice === Infinity ? '∞' : filters.maxPrice}`}</p>
            <p><strong>Search:</strong> {filters.searchTerm || 'Any'}</p>
            <p><strong>Items:</strong> {filteredProducts.length}</p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found</p>
              <button className="back-link" type="button" onClick={() => dispatch(resetFilters())}>
                Clear and view all products
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {displayProducts.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="product-card-link">
                  <div className="product-card">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <h3>{product.title}</h3>
                    <div className="rating-row">
                      <span className="rating-value">⭐ {product.rating?.rate || 'N/A'}</span>
                      <span className="rating-count">({product.rating?.count || 0} reviews)</span>
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
                    <p className="category">{product.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="infinite-loader" ref={loaderRef}>
            {loading ? 'Loading more products...' : hasMore ? 'Scroll for more products' : 'You have reached the end'}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Shop
