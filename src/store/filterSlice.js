import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    category: 'all',
    minPrice: 0,
    maxPrice: Infinity,
    searchTerm: '',
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setPriceRange: (state, action) => {
      const { minPrice, maxPrice } = action.payload
      state.minPrice = minPrice
      state.maxPrice = maxPrice
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    resetFilters: (state) => {
      state.category = 'all'
      state.minPrice = 0
      state.maxPrice = Infinity
      state.searchTerm = ''
    },
  },
})

export const { setCategory, setPriceRange, setSearchTerm, resetFilters } = filterSlice.actions

export const selectFilters = (state) => state.filters
export const selectFilterCategory = (state) => state.filters.category
export const selectFilterMinPrice = (state) => state.filters.minPrice
export const selectFilterMaxPrice = (state) => state.filters.maxPrice
export const selectFilterSearchTerm = (state) => state.filters.searchTerm

export default filterSlice.reducer
