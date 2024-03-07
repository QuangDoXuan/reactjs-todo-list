import React, { useState } from 'react'
import { TicketData, TicketDataList } from '../ticket.interface'
import { Draggable } from 'react-beautiful-dnd'
import { TicketPriority, TicketStatusEnum } from '../ticket.enum'
import Completed from '../../../assets/completed.png'
import InProgress from '../../../assets/work-in-progress.png'
import ToDo from '../../../assets/to-do-list.png'
import Delete from '../../../assets/delete.png'
import { ModalConfirmDelete } from '../../../components/ModalConfirmDelete/ModalConfirmDelete'
import { useAppDispatch } from '../../../hooks/redux'
import { actionDeleteTicket } from '../reducers/ticket.slice'
import CreateUpdateTicket from './CreateUpdateTicket'

const Ticket = ({ id, title, description, status, index, priority }: TicketDataList) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [openCreateUpdate, setOpenCreateUpdate] = useState<boolean>(false);

  const dispatch = useAppDispatch()

  const getPriorityLabel = (priority: string) => {
    let className = 'ticket-status-label'
    switch (priority) {
      case TicketPriority.HIGH:
        className += ' high-priority'
        break
      case TicketPriority.MEDIUM:
        className += ' medium-priority'
        break
      case TicketPriority.LOW:
        className += ' low-priority'
        break
    }
    return <span className={className}>{priority || ''}</span>
  }

  const deleteTicket = (id: string) => {
    dispatch(actionDeleteTicket({ id }))
    setOpenConfirmDelete(false)
  }

  const openUpdateModal = () => {
    setOpenCreateUpdate(true)
  }

  return (
    <>
      <Draggable draggableId={id} key={id} index={index}>
        {(provided) => (
          <div
            className="ticket-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="ticket-content" onClick={openUpdateModal}>
              <div className="ticket-title">{title || ''}</div>
              <div className="ticket-title">{description || ''}</div>
              <div className="ticket-priority">
                {getPriorityLabel(priority)}
              </div>
            </div>
            <div
              className="delete-ticket"
              onClick={() => setOpenConfirmDelete(true)}
            >
              <img src={Delete} alt={''} />
            </div>
          </div>
        )}
      </Draggable>
      {openConfirmDelete ? (
        <ModalConfirmDelete
          open={openConfirmDelete}
          onConfirmDelete={() => deleteTicket(id)}
          onCancel={() => setOpenConfirmDelete(false)}
        />
      ) : (
        ''
      )}
      {openCreateUpdate ? (
        <CreateUpdateTicket
          open={true}
          onClose={() => setOpenCreateUpdate(false)} 
          title={'Update Ticket'}
          ticketData={{ id, title, description, status, priority }}
          />
      ) : (
        ''
      )}
    </>
  )
}

export default Ticket
