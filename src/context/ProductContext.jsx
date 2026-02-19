import { createContext, useState, useContext } from 'react'
import initialProducts from '../data/products'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)

  const addProduct = (newProduct) => {
    setProducts(prev => [...prev, { ...newProduct, id: Date.now() }])
  }

  const getProductById = (id) => {
    return products.find(p => String(p.id) === String(id))
  }

  const getProductsByCategory = (category) => {
    if (!category) return products
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, getProductById, getProductsByCategory }}>
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
