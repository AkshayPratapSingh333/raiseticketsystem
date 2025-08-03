import { ObjectId } from 'mongodb';

export interface Ticket {
  _id?: ObjectId;
  userName: string;
  email: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketInput {
  userName: string;
  email: string;
  title: string;
  description: string;
}

export interface TicketUpdate {
  status: 'pending' | 'in-progress' | 'resolved';
}