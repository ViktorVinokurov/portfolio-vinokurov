import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ProjectsState {
  // null — показываем репозитории на всех языках
  language: string | null
}

const initialState: ProjectsState = { language: null }

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string | null>) {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = projectsSlice.actions
export default projectsSlice.reducer
