import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Column from './components/Column'
import './_index.scss'
import { TicketStatusEnum } from './ticket.enum'
import { Button, Select } from 'antd'
import { SearchBar } from './components/SearchBar'
import CreateUpdateTicket from './components/CreateUpdateTicket'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getLocalStorage, setLocalStorage } from '../../commons'
import { localStorageKey } from '../../commons/constants'
import { ColumnData, TicketData } from './ticket.interface'
import { actionUpdateStatus } from './reducers/ticket.slice'

const preloadTickets = [
  {
    id: 'ticket-1',
    title: 'Implement user authentication',
    description: 'Set up authentication system for users to sign in and access their accounts.',
    priority: 'High',
    status: 'TO_DO',
  },
  {
    id: 'ticket-2',
    title: 'Design landing page layout',
    description: 'Create wireframes and mockups for the landing page design.',
    priority: 'Medium',
    status: 'IN_PROGRESS',
  },
  {
    id: 'ticket-3',
    title: 'Fix database connection issue',
    description: 'Troubleshoot and resolve issues with connecting to the database.',
    priority: 'High',
    status: 'IN_PROGRESS',
  },
  {
    id: 'ticket-4',
    title: 'Optimize frontend performance',
    description: 'Identify and implement optimizations to improve frontend loading times.',
    priority: 'Medium',
    status: 'IN_PROGRESS',
  },
  {
    id: 'ticket-5',
    title: 'Update documentation',
    description: 'Review and update project documentation to reflect recent changes.',
    priority: 'Low',
    status: 'COMPLETED',
  },
  {
    id: 'ticket-6',
    title: 'Implement search functionality',
    description: 'Add search feature to allow users to search for specific content.',
    priority: 'Medium',
    status: 'TO_DO',
  },
  {
    id: 'ticket-7',
    title: 'Fix styling issues on mobile devices',
    description: 'Address CSS issues to ensure proper display on various mobile devices.',
    priority: 'Low',
    status: 'TO_DO',
  },
  {
    id: 'ticket-8',
    title: 'Add unit tests for backend API',
    description: 'Write unit tests to ensure the reliability of backend API endpoints.',
    priority: 'High',
    status: 'TO_DO',
  },
  {
    id: 'ticket-9',
    title: 'Refactor code for readability',
    description: 'Simplify and reorganize code to improve readability and maintainability.',
    priority: 'Medium',
    status: 'TO_DO',
  },
  {
    id: 'ticket-10',
    title: 'Implement error handling',
    description: 'Add error handling mechanisms to gracefully handle unexpected errors.',
    priority: 'High',
    status: 'TO_DO',
  },
];


function ListTicket() {
  const listTicket = useAppSelector((state) => state.tickets.listTicket)
  const dispatch = useAppDispatch()
  const [columns, setColumns] = useState<ColumnData[]>([])
  const [openCreateUpdate, setOpenCreateUpdate] = useState<Boolean>(false)

  useEffect(() => {
    getTicketData()
  }, [listTicket])

  const getTicketData = () => {
    try {
      let ticketData = getLocalStorage(localStorageKey.listTicket)
      if (!ticketData?.length) {
        ticketData = preloadTickets
      }
      const columnsData: ColumnData[] = [
        {
          id: 'draggable-1',
          title: 'TO DO',
          total: 0,
          tickets: [],
        },
        {
          id: 'draggable-2',
          title: 'IN PROGRESS',
          total: 0,
          tickets: [],
        },
        {
          id: 'draggable-3',
          title: 'COMPLETED',
          total: 0,
          tickets: [],
        },
      ]
      ticketData.map((ticket: TicketData) => {
        let columnIndex = 0
        switch (ticket.status) {
          case TicketStatusEnum.IN_PROGRESS:
            columnIndex = 1
            break
          case TicketStatusEnum.COMPLETED:
            columnIndex = 2
            break
        }
        const existedTicket = columnsData[columnIndex].tickets.findIndex(
          (item) => item.id === ticket.id
        )
        if (existedTicket < 0) {
          columnsData[columnIndex].tickets.push(ticket)
          columnsData[columnIndex].total ++;
        }
      })
      setColumns([...columnsData])
      setLocalStorage(localStorageKey.listTicket, JSON.stringify(ticketData))
    } catch (err) {
      console.log(err)
    }
  }

  const onDragEnd = useCallback(
    (result: DropResult) => {
      try {
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

        if (!sourceColumn || !destinationColumn) {
          return
        }

        // Find the dragged ticket
        const ticket = sourceColumn?.tickets.find(
          (ticket) => ticket.id === draggableId
        )
        if (ticket) {
          // Remove the ticket from the source column
          sourceColumn?.tickets.splice(source.index, 1)
          sourceColumn.total --;

          // Insert the ticket into the destination column
          destinationColumn?.tickets.splice(destination.index, 0, ticket)

          const ticketStatus = updateTicketStatus(
            destinationColumn?.title || ''
          )
          if (ticketStatus) {
            const updatedTicket = { ...ticket, status: ticketStatus };
            dispatch(actionUpdateStatus(updatedTicket))
          }
        }
        // Update the state with the new columns
        setColumns([...columns])
      } catch (err) {
        console.log('err', err)
      }
    },
    [columns]
  )

  const updateTicketStatus = (destinationColumn: string) => {
    switch (destinationColumn) {
      case 'TO DO':
        return TicketStatusEnum.TO_DO
      case 'IN PROGRESS':
        return TicketStatusEnum.IN_PROGRESS
      case 'COMPLETED':
        return TicketStatusEnum.COMPLETED
    }
  }

  const handleCloseModal = () => {
    setOpenCreateUpdate(false)
  }

  return (
    <div className="page-ticket">
      <div className="list-ticket">
        <div className="menu-search-bar">
          <Button
            onClick={() => setOpenCreateUpdate(true)}
            className="btn-create-ticket"
          >
            Create
          </Button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="column-list">
            {columns.map((column, index) => (
              <Column
                key={index}
                id={column.id}
                title={column.title}
                tickets={column.tickets}
                total={column.total}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
      {openCreateUpdate ? (
        <CreateUpdateTicket
          open={true}
          onClose={handleCloseModal}
          title={'Create Ticket'}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default ListTicket
