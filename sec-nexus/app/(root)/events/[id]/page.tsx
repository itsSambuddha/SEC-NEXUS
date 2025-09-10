import React from 'react'
import Header from '@/components/shared/Header'
import { getEventById, getRelatedEventsByCategory, getRelatedEventsByDepartment, getRelatedEventsByClub } from '@/lib/actions/event.actions';
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils';
import Collection from '@/components/shared/Collection';
import { SearchParamProps } from '@/lib/types';

const EventDetails = async ({params, searchParams}: SearchParamProps) => {
  const { id } = await params;
  const event = await getEventById(id);

  console.log('Event imageUrl:', event.imageUrl);

  const relatedEventsByCategoryPromise = getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  const relatedEventsByDepartmentPromise = event.department
    ? getRelatedEventsByDepartment({
        departmentId: event.department._id,
        eventId: event._id,
        page: searchParams.page as string,
      })
    : Promise.resolve(null);

  const relatedEventsByClubPromise = event.club
    ? getRelatedEventsByClub({
        clubId: event.club._id,
        eventId: event._id,
        page: searchParams.page as string,
      })
    : Promise.resolve(null);

  const [
    relatedEventsByCategory,
    relatedEventsByDepartment,
    relatedEventsByClub,
  ] = await Promise.all([
    relatedEventsByCategoryPromise,
    relatedEventsByDepartmentPromise,
    relatedEventsByClubPromise,
  ]);

  // Combine and deduplicate related events
  const allRelatedEvents = [
    ...(relatedEventsByCategory?.data || []),
    ...(relatedEventsByDepartment?.data || []),
    ...(relatedEventsByClub?.data || []),
  ];

  // Remove duplicates based on event ID
  const uniqueRelatedEvents = allRelatedEvents.filter((event, index, self) =>
    index === self.findIndex(e => e._id === event._id)
  )


  console.log(event);


  return (
    <>
    <div>
        <Header />
        <section className='flex justify-center bg-primary-50 bg-dotted-pattern'>
          <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl '>
            <div className="relative w-full h-60 md:h-80 lg:h-96">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className='object-cover object-center rounded-t-xl'
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
              <div className='flex flex-col gap-8'>
                <h2 className='text-2xl font-bold'>{event.title}</h2>
                {/* <p className='text-gray-600'>{event.description}</p> */}
              </div>

              <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
              <div className='flex gap-3'>
                <p className='p-bold-20 rounded-full bg-gray-500/10 px-6 py-3 text-blue-700'>
                  {event.club
                    ? `This event is created by ${event.clubRole} of ${event.club.name}`
                    : (event.isCR 
                        ? `This event is organized by the CR of ${event.department?.name}` 
                        : 'This event is not organized by any CR')
                  }
                </p>
                <p className='p-medium-16 rounded-full bg-gray-500/10 px-4 py-5 text-gray-600'>
                {event.category.name}

                </p>

              </div>

              <p className='p-medium-16 ml-2 mt-2 sm:mt-0'>
                by{' '}
                <span className='font-semibold text-gray-800'>
                  {event.organizer?.firstName} {event.organizer?.lastName}
                </span>
              </p>
              </div>

            </div>

            {/* REISTRATION */} 

            <div className='flex flex-col gap-8 p-5 md:p-10'>
              <div className='flex gap-2 md:gap-3'>
                <Image
                  src='/assets/icons/calendar.svg'
                  alt='Calendar Icon'
                  width={32}
                  height={32}
                />
                <div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center'>
                  <p>{formatDateTime(event.startDateTime).dateOnly}</p>
                  <p className='ml-2'>{formatDateTime(event.startDateTime).timeOnly} {'\u00A0\u00A0\u00A0'}- {'\u00A0\u00A0\u00A0'}</p>
                  <p>{formatDateTime(event.endDateTime).dateOnly}</p>
                  <p className='ml-2'>{formatDateTime(event.endDateTime).timeOnly}</p>
                </div>

              </div>

              <div className='p-regular-20 flex items-center gap-3'>
                <Image
                  src='/assets/icons/location.svg'
                  alt='Location Icon'
                  width={32}
                  height={32}
                />
                <p className='p-medium-16 text-gray-800'>{event.venue}</p>
              </div>

            </div>

            <div className='flex flex-col gap-2'>
              <p className='p-bold-20 text-gray-700 text-2xl'>
                About the Event
              </p>
              <p className='p-medium-16 text-gray-600'>
                {event.description}
              </p>
              Click the Link below to be redirected to the Google Form of {event.title}
              <a href={event.url} target="_blank" rel="noopener noreferrer" className='p-medium-16 lg:p-regular-18 truncate text-blue-600 underline'>
                {event.url}
              </a>
            </div>
          </div>

        </section>
{/* EVENTS FROM THE SAME CATEGORY AND DEPARTMENTS */}
        <section className='wrapper my-8 flex flex-col gap-8 mdd:gap-12'>
        <h2 className='h2-bold text-3xl font-bold'> Related Events</h2> 
          <Collection
            data={uniqueRelatedEvents}
            emptyTitle="No Events Found"
            emptyStateSubtext="Try adjusting your filters or check back later."
            collectionType="All_Events"
            limit={6}
            page={1}
            totalPages={2}
            />
        </section>
    </div>
    </>
  )
}

export default EventDetails
