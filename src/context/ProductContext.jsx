import { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react'
import initialProducts from '../data/products'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const skipRef = useRef(0)
  const inFlightRef = useRef(false)
  const limitRef = useRef(20)

  const normalizeProduct = (product) => ({
    ...product,
    images: product.images?.length ? product.images : (product.image ? [product.image] : [])
  })

  const mapApiProduct = (product) => normalizeProduct({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price * 80,
    category: product.category,
    image: product.thumbnail || product.images?.[0] || '',
    images: product.images || [],
    rating: {
      rate: product.rating ?? 4.2,
      count: product.stock ?? 100
    }
  })

  const fetchProducts = useCallback(async (count = limitRef.current) => {
    if (inFlightRef.current || !hasMore) return
    inFlightRef.current = true
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=${count}&skip=${skipRef.current}`)
      if (!res.ok) throw new Error('Failed to load products')
      const data = await res.json()
      const mapped = data.products.map(mapApiProduct)
      setProducts(prev => [...prev, ...mapped])
      skipRef.current += data.products.length
      setHasMore(skipRef.current < data.total)
    } catch (err) {
      console.error(err)
      setError(err)
      if (products.length === 0) {
        setProducts(initialProducts.map(normalizeProduct))
      }
    } finally {
      setLoading(false)
      inFlightRef.current = false
    }
  }, [hasMore, products.length])

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    }
  }, [fetchProducts, products.length])

  const addProduct = (newProduct) => {
    setProducts(prev => [...prev, normalizeProduct({ ...newProduct, id: Date.now() })])
  }

  const getProductById = (id) => {
    return products.find(p => String(p.id) === String(id))
  }

  const categoryAliases = {
    electronics: ['smartphones', 'laptops', 'mobile-accessories'],
    jewelery: ['womens-jewellery'],
    "men's clothing": ['mens-shirts', 'mens-shoes', 'mens-watches'],
    "women's clothing": ['womens-dresses', 'womens-shoes', 'tops', 'womens-bags', 'womens-watches'],
    grocery: ['groceries']
  }

  const normalizeCategory = (value) => value.toLowerCase()

  const getProductsByCategory = (category) => {
    if (!category) return products
    const target = normalizeCategory(category)
    return products.filter((p) => {
      const productCategory = normalizeCategory(p.category)
      if (productCategory === target) return true
      const aliases = categoryAliases[target] || []
      return aliases.includes(productCategory)
    })
  }

  const loadMoreProducts = (count = limitRef.current) => {
    return fetchProducts(count)
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, getProductById, getProductsByCategory, loadMoreProducts, loading, error, hasMore }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider')
  }
  return context
}
