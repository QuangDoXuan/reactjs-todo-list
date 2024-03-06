import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../redux/store'
import { TicketData } from './ticket.interface'
import { TicketStatusEnum } from './ticket.enum'

interface TicketState {
  listTicket: TicketData[]
}

const initialState: TicketState = {
  listTicket: [],
}

export const counterSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    updateTicketStatus: (state, action: PayloadAction<{id: number, status: TicketStatusEnum}>) => {
      const ticketIndex = state.listTicket.findIndex(item => item.id === action.payload.id);
      if (ticketIndex) {
        state.listTicket[ticketIndex].status = action.payload.status;
      }
    }
  },
})

export const { updateTicketStatus } = counterSlice.actions