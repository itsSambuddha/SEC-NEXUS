import { IEvent } from '@/lib/database/models/event.model'
import { Event } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import { DeleteConfirmation } from './DeleteConfirmation'


type CardProps = {
  event: Event
}

const Card = async ({ event }: CardProps) => {
  const { userId } = await auth();

  // Debug logs to check userId and organizer._id
  console.log('Logged in userId:', userId);
  console.log('Event organizer._id:', event.organizer?._id);
  console.log('Event organizer.clerkId:', event.organizer?.clerkId);

  // Temporary logic: show edit icon if userId exists (simulate event creator)
  // Replace this with proper logic when identity mapping is fixed
  const isEventCreator = userId === event.organizer?.clerkId; // Line where edit icon visibility is controlled

  return (
    <div className="group relative flex min-h-[00px] w-full max-w-[500px] flex-col overflow-hidden rounded-xl bg-gray-200 shadow-md transition-all hover:shadow-lg md:min-h-[480px]">


      {/* Banner image */}
      <Link
        href={`/events/${event._id}`}
        className="flex flex-grow h-48 bg-gray-50 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        aria-label={`Event banner for ${event.category?.name}`}
      >
      </Link>

      {isEventCreator && (
        <div className="absolute top-4 right-4 z-10 bg-white p-3 shadow-sm transition-all rounded-2xl flex flex-col gap-2">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation  eventId={event._id}/>
        </div>
      )}

      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[240px] flex-col gap-5 p-7 md:gap-8 text-gray-900 relative"
      >

        <h3 className="text-lg font-semibold">{event.title}</h3>

        {/* Status Badge */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-2">
            {event.status === 'approved' && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs rounded">Approved</span>
            )}
            {event.status === 'rejected' && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs rounded">Rejected</span>
            )}
            {event.status === 'pending' && (
              <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded">Pending</span>
            )}
          </div>
        </div>

        <div className="flex gap-10">
          <span className="p-semibold-14 text-sm w-min rounded-xl bg-blue-300 px-15 py-1 text-gray-800 shadow-sm">
            Organized by {event.department?.name} Department
          </span>
          <span className="p-semibold-14 text-sm flex w-min rounded-full bg-gray-400 px-3 py-0.5 items-center justify-center text-gray-800 shadow-sm">
            {event.category?.name}
          </span>
        </div>
        <p className='p-medium-16 p-medium-18 text-gray-500'>
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <p className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black'>
          {event.description}
        </p>

        <div className='flex justify-between w-full'>
          <p className='p-medium-14 md:p-medium-16 text-black'>
              {event.organizer?.firstName ?? ''} {event.organizer?.lastName ?? ''}
          </p>

        </div>
      </Link>

    </div>
  )
}

export default Card
