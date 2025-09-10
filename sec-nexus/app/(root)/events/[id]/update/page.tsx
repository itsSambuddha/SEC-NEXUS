import React from 'react'
import Header from '@/components/shared/Header';
import EventForm from '@/components/shared/EventForm';
import { auth } from '@clerk/nextjs/server';
import { getEventById } from '@/lib/actions/event.actions';

type UpdateEventProps ={
  params:{
    id:string
  }
}

const UpdateEvent=async ({params: {id}}: UpdateEventProps) =>{

  const { sessionClaims } = await auth()

      

    const event =await getEventById(id)


  return (
    <>
      <section className='bg-primary-500 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <Header />
        <h3 className='wrapper h3-bold text-center sm:text-left'>Update Event</h3>
      </section>

      <div className='wrapper my-10'>
        <EventForm type="Update"
        event={event}
        eventId={event._id} />

      </div>
    </>
  )
}

export default UpdateEvent;
