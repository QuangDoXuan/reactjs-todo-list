import React, { useState } from 'react'
import { TicketData, TicketDataList } from '../ticket.interface'
import { Draggable } from 'react-beautiful-dnd'
import { TicketPriority, TicketStatusEnum } from '../ticket.enum';
import Completed from '../../../assets/completed.png';
import InProgress from '../../../assets/work-in-progress.png';
import ToDo from '../../../assets/to-do-list.png';


const Ticket = ({ id, title, status, index, priority }: TicketDataList) => {

  const getPriorityLabel = (priority: string) => {
    let className = 'ticket-status-label';
    switch(priority) {
      case TicketPriority.HIGH:
        className += ' high-priority';
        break;
      case TicketPriority.MEDIUM:
        className += ' medium-priority';
        break;
      case TicketPriority.LOW:
        className += ' low-priority';
        break; 
    }
    return <span className={className}>{priority || ''}</span>;
  }

  const getIconStatus = (status: string) => {
    switch(status) {
      case TicketStatusEnum.TO_DO:
        return <img className='icon-status' src={ToDo} alt='todo'/>
      case TicketStatusEnum.IN_PROGRESS:
        return <img className='icon-status' src={InProgress} alt='inprogress'/>
      case TicketStatusEnum.COMPLETED:
        return <img className='icon-status' src={Completed} alt='completed'/>
    }
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="ticket-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className='ticket-status'>
            {getIconStatus(status)}
          </div>
          <div className="ticket-content">
            <div className="ticket-title">{title || ''}</div>
            <div className="ticket-status">
              {getPriorityLabel(priority)}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Ticket
