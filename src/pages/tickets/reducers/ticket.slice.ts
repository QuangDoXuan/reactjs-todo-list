import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TicketData } from '../ticket.interface'
import { TicketStatusEnum } from '../ticket.enum'
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, setLocalStorage } from '../../../commons';
import { localStorageKey } from '../../../commons/constants';

interface TicketState {
  listTicket: TicketData[]
}

const initialState: TicketState = {
  listTicket: [],
}

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    actionUpdateStatus: (state, action: PayloadAction<{id: string, status: TicketStatusEnum}>) => {
      const tickets = getLocalStorage(localStorageKey.listTicket);
      const ticketIndex = tickets.findIndex((item: TicketData) => item.id === action.payload.id);
      if (ticketIndex !== -1) {
        tickets[ticketIndex].status = action.payload.status;
      }
      state.listTicket = tickets;
      setLocalStorage(localStorageKey.listTicket, JSON.stringify(tickets))
    },
    actionCreateTicket: (state, action: PayloadAction<{ title: string, description: string, priority: string}>) => {
      const tickets = getLocalStorage(localStorageKey.listTicket);
      const ticket = {
        id: uuidv4(),
        status: TicketStatusEnum.TO_DO,
        ...action.payload
      }
      tickets.push(ticket)
      state.listTicket.push(ticket)
      setLocalStorage(localStorageKey.listTicket, JSON.stringify(tickets))
    },
    actionDeleteTicket: (state, action: PayloadAction<{id: string}>) => {
      const tickets = getLocalStorage(localStorageKey.listTicket);
      const ticketIndex = tickets.findIndex((item: TicketData) => item.id === action.payload.id);
      if (ticketIndex !== -1) {
        tickets.splice(ticketIndex, 1)
      }
      state.listTicket = tickets
      setLocalStorage(localStorageKey.listTicket, JSON.stringify(tickets))
    },
    actionUpdateTicket: (state, action: PayloadAction<{id: string, title: string, description: string, priority: string, status: TicketStatusEnum}>) => {
      const tickets = getLocalStorage(localStorageKey.listTicket);
      
      const ticketIndex = tickets.findIndex((item: { id: string; }) => item.id === action.payload.id);
      if (ticketIndex !== -1) {
        tickets[ticketIndex] = {...action.payload}
        state.listTicket[ticketIndex] = {...action.payload };
      }
      setLocalStorage(localStorageKey.listTicket, JSON.stringify(tickets))
    }
  },
})

export const { actionUpdateStatus, actionCreateTicket, actionUpdateTicket, actionDeleteTicket } = ticketSlice.actions

export default ticketSlice.reducer;