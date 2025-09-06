import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Header from '@/components/shared/Header'
import Collection from '@/components/shared/Collection'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { SearchParamProps } from '@/lib/types'
import { auth } from '@clerk/nextjs/server'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const session = await auth();

  const userId = session.userId;

  if (!userId) {
    return <div>Please log in to view your profile.</div>;
  }

  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

  return (
    <>
    <Header/>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages ?? 0}
        />
      </section>
    </>
  )
}

export default ProfilePage



