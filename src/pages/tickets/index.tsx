import React, { useCallback, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Column from './components/Column'
import './_index.scss'
import { TicketStatusEnum } from './ticket.enum'

const columnsData = [
  {
    id: 'draggable-1',
    title: 'TO DO',
    tickets: [
      {
        id: 'ticket-1',
        title: 'Where are you now?',
        status: 'TO_DO',
        priority: 'Medium',
        index: 0,
      },
      {
        id: 'ticket-2',
        title: 'Where are you now?',
        status: 'TO_DO',
        priority: 'Medium',
        index: 1,
      },
    ],
  },
  {
    id: 'draggable-2',
    title: 'IN PROGRESS',
    tickets: [
      {
        id: 'ticket-3',
        title: 'Co don tren so pha',
        status: 'IN_PROGRESS',
        priority: 'High',
        index: 0,
      },
    ],
  },
  {
    id: 'draggable-3',
    title: 'COMPLETED',
    tickets: [
      {
        id: 'ticket-4',
        title: 'Co don tren so pha',
        status: 'COMPLETED',
        priority: 'High',
        index: 0,
      },
    ],
  }
]

function ListTicket() {
  const [columns, setColumns] = useState(columnsData)
  const onDragEnd = useCallback((result: DropResult) => {
    console.log('result', result);
    const { source, destination, draggableId } = result
    if (!destination) {
      return
    }

    // Find the source and destination columns
    const sourceColumn = columns.find(
      (column) => column.id === source.droppableId
    )
    const destinationColumn = columns.find(
      (column) => column.id === destination.droppableId
    )

    // Find the dragged ticket
    const ticket = sourceColumn?.tickets.find(
      (ticket) => ticket.id === draggableId
    )
    if (ticket) {
      // Remove the ticket from the source column
      sourceColumn?.tickets.splice(source.index, 1)
      sourceColumn?.tickets.forEach((ticket, index) => {
        ticket.index = index
      })

      // Insert the ticket into the destination column
      destinationColumn?.tickets.splice(destination.index, 0, ticket)
      destinationColumn?.tickets.forEach((ticket, index) => {
        ticket.index = index
      })

      const ticketStatus = updateTicketStatus(destinationColumn?.title || '')
      if (ticketStatus) {
        ticket.status = ticketStatus
      }
    }

    // Update the state with the new columns
    setColumns([...columns])
  }, [])

  const updateTicketStatus = (destinationColumn: string) => {
    switch (destinationColumn) {
      case 'TO DO':
        return TicketStatusEnum.TO_DO
      case 'IN PROGRESS':
        return TicketStatusEnum.IN_PROGRESS
      case 'DONE':
        return TicketStatusEnum.COMPLETED
    }
  }

  return (
    <>
      <div className='search-bar'>
        Search
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="column-list">
          {columns.map((column, index) => (
            <Column
              key={index}
              id={column.id}
              title={column.title}
              tickets={column.tickets}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  )
}

export default ListTicket
