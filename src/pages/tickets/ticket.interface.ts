import { TicketStatusEnum } from "./ticket.enum";

export interface TicketData {
  id: number;
  title: string;
  description: string;
  status: TicketStatusEnum
}

export interface TicketDataList {
  id: string;
  index: number;
  title: string;
  status: string;
  priority: string;
}

export interface DropContext {
  droppableId: string;
  index: number;
}