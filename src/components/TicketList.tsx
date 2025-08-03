'use client'
import React from 'react';
import { Ticket } from '@/types/ticket';

interface TicketListProps {
  tickets: Ticket[];
  isAdmin?: boolean;
  onStatusUpdate?: (id: string, status: Ticket['status']) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  loading?: boolean;
}

const TicketList: React.FC<TicketListProps> = ({ 
  tickets, 
  isAdmin = false, 
  onStatusUpdate, 
  onDelete, 
  loading = false 
}) => {
  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading tickets...</div>;
  }

  if (tickets.length === 0) {
    return <div className="text-center py-4 text-gray-500">No tickets found.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        {isAdmin ? 'All Tickets' : 'Your Tickets'}
      </h2>
      
      {tickets.map((ticket) => (
        <div key={ticket._id?.toString()} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{ticket.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          
          <div className="mb-2">
            <p className="text-gray-600"><strong>User:</strong> {ticket.userName}</p>
            <p className="text-gray-600"><strong>Email:</strong> {ticket.email}</p>
          </div>
          
          <p className="text-gray-800 mb-4">{ticket.description}</p>
          
          <div className="text-sm text-gray-500 mb-4">
            <p>Created: {new Date(ticket.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</p>
          </div>

          {isAdmin && (
            <div className="flex space-x-2">
              <select
                value={ticket.status}
                onChange={(e) => onStatusUpdate?.(ticket._id!.toString(), e.target.value as Ticket['status'])}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              
              <button
                onClick={() => onDelete?.(ticket._id!.toString())}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TicketList;