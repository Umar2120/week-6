import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'dark',
  },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions

export const selectThemeMode = (state) => state.theme.mode

export default themeSlice.reducer
