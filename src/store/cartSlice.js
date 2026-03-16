import { createSlice } from '@reduxjs/toolkit'

const CART_STORAGE_KEY = 'shopzone_cart'

const loadCartFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Failed to load cart from localStorage', error)
    return []
  }
}

const saveCartToLocalStorage = (items) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Failed to save cart to localStorage', error)
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existing = state.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
      saveCartToLocalStorage(state.items)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      saveCartToLocalStorage(state.items)
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== productId)
      } else {
        const existing = state.items.find(item => item.id === productId)
        if (existing) existing.quantity = quantity
      }
      saveCartToLocalStorage(state.items)
    },
    clearCart: (state) => {
      state.items = []
      saveCartToLocalStorage(state.items)
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items

export const selectCartTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

export default cartSlice.reducer
