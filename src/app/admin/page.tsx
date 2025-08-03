'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TicketList from '@/components/TicketList';
import { Ticket } from '@/types/ticket';

const AdminPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tickets');
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: Ticket['status']) => {
    try {
      const response = await fetch(`/api/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await fetchTickets();
        alert('Ticket status updated successfully!');
      } else {
        alert('Failed to update ticket status');
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Error updating ticket');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        const response = await fetch(`/api/tickets/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchTickets();
          alert('Ticket deleted successfully!');
        } else {
          alert('Failed to delete ticket');
        }
      } catch (error) {
        console.error('Error deleting ticket:', error);
        alert('Error deleting ticket');
      }
    }
  };

  const getStats = () => {
    const pending = tickets.filter(t => t.status === 'pending').length;
    const inProgress = tickets.filter(t => t.status === 'in-progress').length;
    const resolved = tickets.filter(t => t.status === 'resolved').length;
    return { pending, inProgress, resolved, total: tickets.length };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <Link 
            href="/" 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </Link>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Tickets</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Resolved</h3>
            <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
          </div>
        </div>

        {/* Tickets List */}
        <TicketList 
          tickets={tickets} 
          isAdmin={true}
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AdminPage;