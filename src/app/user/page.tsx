'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TicketForm from '../../components/TicketForm';
import TicketList from '@/components/TicketList';
import { Ticket, TicketInput } from '@/types/ticket';

const UserPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (ticketData: TicketInput) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        await fetchTickets();
        alert('Ticket created successfully!');
      } else {
        alert('Failed to create ticket');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Error creating ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">User Portal</h1>
          <Link 
            href="/" 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <TicketForm onSubmit={handleSubmit} loading={submitting} />
          </div>
          
          <div>
            <TicketList tickets={tickets} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;