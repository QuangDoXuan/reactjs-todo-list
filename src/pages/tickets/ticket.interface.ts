import { TicketStatusEnum } from "./ticket.enum";

export interface TicketData {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: TicketStatusEnum
}

export interface ColumnData {
  id: string;
  title: string;
  tickets: TicketData[];
  total: number;
}

export interface TicketDataList extends TicketData{
  index: number;
}

export interface DropContext {
  droppableId: string;
  index: number;
}

export interface CreateUpdateTicketProps {
  open: boolean;
  title: string;
  onClose:() => void;
  ticketData?: TicketData
}