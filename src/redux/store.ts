import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from '../pages/tickets/reducers/ticket.slice'

export const store = configureStore({
  reducer: {
    tickets: ticketReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch