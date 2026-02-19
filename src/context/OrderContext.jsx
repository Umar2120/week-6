import { createContext, useContext, useState, useEffect } from 'react'

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
  const savedOrders = localStorage.getItem('shopzone_orders')
  return savedOrders ? JSON.parse(savedOrders) : []
})

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('shopzone_orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shopzone_orders', JSON.stringify(orders))
  }, [orders])

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      status: 'Processing',
      username: orderData.username || 'guest', // associate to user
      ...orderData
    }
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }

  const getAllOrders = () => orders

  const getOrdersForUser = (username) => {
    return orders.filter(o => o.username === username)
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, getAllOrders, getOrdersForUser }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider')
  }
  return context
}
