import React, { useState } from 'react';
import Ticket from './Ticket';
import { connect } from 'react-redux';
import { StrictModeDroppable } from '../../../components/Droppable/Droppable';
import './_index.scss';
import { TicketDataList } from '../ticket.interface';

interface ColumnProps {
  id: string;
  title: string;
  tickets: TicketDataList[]
}
const Column = ({ id, title, tickets }: ColumnProps) => {
  return (
    <div className='column-tickets'>
      <div className='column-title'>{title}</div>
      <StrictModeDroppable droppableId={id}>
        {(provided, snapshot) => 
            <div className='ticket-data'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tickets?.map((item, index) => (
                <Ticket key={index} id={item.id} title={item.title} status={item.status} index={index} priority={item.priority} />
              ))}
              {provided.placeholder}
            </div>
          }
      </StrictModeDroppable>
    </div>
  );
};

export default connect()(Column); 
