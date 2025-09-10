"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getAllEvents } from '@/lib/actions/event.actions';
import { updateEvent } from '@/lib/actions/event.actions';
import { deleteEvent } from '@/lib/actions/event.actions';
import { Event } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import { Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await getAllEvents({
          query: '',
          category: '',
          limit: 100,
          page: 1
        });
        if (result) {
          setEvents(result.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleStatusUpdate = async (eventId: string, newStatus: 'approved' | 'rejected') => {
    try {
      console.log('Updating event:', eventId, 'to status:', newStatus);
      const eventToUpdate = events.find(e => e._id === eventId);
      if (!eventToUpdate) {
        console.error('Event not found:', eventId);
        return;
      }

      console.log('Event to update:', eventToUpdate);

      const updateData = {
        userId: user?.id || '',
        event: {
          _id: eventId,
          title: eventToUpdate.title,
          imageUrl: eventToUpdate.imageUrl,
          description: eventToUpdate.description,
          venue: eventToUpdate.venue,
          startDateTime: eventToUpdate.startDateTime,
          endDateTime: eventToUpdate.endDateTime,
          url: eventToUpdate.url || '',
          categoryId: eventToUpdate.category._id,
          departmentId: eventToUpdate.department?._id || undefined,
          clubId: eventToUpdate.club?._id || undefined,
          clubRole: eventToUpdate.clubRole || '',
          status: newStatus
        },
        path: '/admin/dashboard'
      };

      console.log('Update data:', updateData);

      const result = await updateEvent(updateData);
      console.log('Update result:', result);

      if (!result) {
        console.error('Update failed: No result returned');
        return;
      }

      // Update local state
      setEvents(events.map(event =>
        event._id === eventId
          ? { ...event, status: newStatus }
          : event
      ));
    } catch (error) {
      console.error('Error updating event status:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      console.log('Deleting event:', eventId);

      const result = await deleteEvent({
        eventId,
        path: '/admin/dashboard'
      });

      if (!result) {
        console.error('Delete failed: No result returned');
        return;
      }

      // Update local state to remove the deleted event
      setEvents(events.filter(event => event._id !== eventId));
      console.log('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-green-500 text-white text-xs rounded">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-500 text-white text-xs rounded">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded">Pending</span>;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header/>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <div className="flex items-center gap-2">
                {getStatusBadge(event.status)}
                <Button
                  onClick={() => handleDeleteEvent(event._id)}
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex gap-2">
              <Button
                onClick={() => handleStatusUpdate(event._id, 'approved')}
                disabled={event.status === 'approved'}
                className="bg-green-500 hover:bg-green-600"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleStatusUpdate(event._id, 'rejected')}
                disabled={event.status === 'rejected'}
                variant="destructive"
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
