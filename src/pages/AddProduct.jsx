import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import '../styles/Shop.css' // reuse some styles

function AddProduct() {
  const navigate = useNavigate()
  const { addProduct } = useProducts()

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    ratingRate: '',
    ratingCount: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduct = {
      title: form.title,
      description: form.description,
      price: parseFloat(form.price) || 0,
      category: form.category,
      image: form.image || 'https://via.placeholder.com/300',
      rating: {
        rate: parseFloat(form.ratingRate) || 0,
        count: parseInt(form.ratingCount, 10) || 0
      }
    }
    addProduct(newProduct)
    navigate('/shop')
  }

  return (
    <div className="shop-container">
      <h1>Add New Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Price
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
        </label>
        <label>
          Category
          <input name="category" value={form.category} onChange={handleChange} required />
        </label>
        <label>
          Image URL
          <input name="image" value={form.image} onChange={handleChange} />
        </label>
        <label>
          Rating (rate)
          <input name="ratingRate" type="number" step="0.1" value={form.ratingRate} onChange={handleChange} />
        </label>
        <label>
          Rating (count)
          <input name="ratingCount" type="number" value={form.ratingCount} onChange={handleChange} />
        </label>
        <button type="submit" className="add-to-cart-btn">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
