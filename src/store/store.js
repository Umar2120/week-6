import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import filterReducer from './filterSlice'
import themeReducer from './themeSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filterReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
})

export default store
