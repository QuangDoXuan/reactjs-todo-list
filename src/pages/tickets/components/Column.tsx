import React, { useState } from 'react'
import Ticket from './Ticket'
import { StrictModeDroppable } from '../../../components/Droppable/Droppable'
import './_index.scss'
import { TicketData } from '../ticket.interface'

interface ColumnProps {
  id: string
  title: string
  tickets: TicketData[];
  total: number;
}
const Column = ({ id, title, tickets, total }: ColumnProps) => {
  return (
    <div className="column-tickets">
      <div className="column-title">
        {title}
        <span className='total-tickets'>{total}</span>
      </div>
      <StrictModeDroppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="ticket-data"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tickets?.map((item, index) => (
              <Ticket
                key={index}
                id={item.id}
                title={item.title}
                status={item.status}
                index={index}
                priority={item.priority}
                description={item.description}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  )
}

export default Column
