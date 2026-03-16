import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './store/store'
import { AuthProvider } from './context/AuthContext'
import { OrderProvider } from './context/OrderContext'
import { ProductProvider } from './context/ProductContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ProductProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </ProductProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
