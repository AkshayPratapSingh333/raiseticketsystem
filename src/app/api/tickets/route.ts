import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/mongodb';
import { Ticket, TicketInput } from '../../../types/ticket';

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection<Ticket>('tickets');
    const tickets = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();
    const collection = db.collection<Ticket>('tickets');
    const ticketData: TicketInput = await request.json();
    
    const newTicket: Omit<Ticket, '_id'> = {
      ...ticketData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newTicket);
    const insertedTicket = await collection.findOne({ _id: result.insertedId });
    
    return NextResponse.json(insertedTicket, { status: 201 });
  } catch (error) {
    console.error('Failed to create ticket:', error);
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}