import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import '../styles/Shop.css'
import { useProducts } from '../context/ProductContext'

function Shop() {
  const { products } = useProducts()
  const [filteredProducts, setFilteredProducts] = useState([])
  // no loading/error for local data
  const [searchParams] = useSearchParams()

  const category = searchParams.get('category')
  const search = searchParams.get('search')

  // products already available from context; nothing to load on mount

  useEffect(() => {
    filterProducts()
  }, [products, category, search])

  // no fetch function; products come from context

  const filterProducts = () => {
    let filtered = [...products]

    if (category) {
      filtered = filtered.filter(product => product.category === category)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      )
    }

    setFilteredProducts(filtered)
  }

  // with local data we don't need loading/error states.  keep fallback if filtered list empty
  // if you still want a loading indicator you can set `loading` in context and pass it through

  return (
    <div className="shop-container">
      <h1>Shop</h1>
      {search && <p className="filter-info">Search results for: <strong>"{search}"</strong></p>}
      {category && <p className="filter-info">Category: <strong>{category}</strong></p>}
      {(search || category) && (
        <Link to="/shop" className="clear-filter">Clear filters</Link>
      )}
      
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found</p>
          <Link to="/shop" className="back-link">View all products</Link>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-card-link">
              <div className="product-card">
                <img src={product.image} alt={product.title} className="product-image" />
                <h3>{product.title}</h3>
                <p className="price">₹{product.price.toFixed(2)}</p>
                <p className="category">{product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop
