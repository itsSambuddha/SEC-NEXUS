import React from 'react'
import Header from '@/components/shared/Header';
import EventForm from '@/components/shared/EventForm';
import { auth } from '@clerk/nextjs/server';

const CreateEvent = async () => {
    const { sessionClaims } = await auth()

    
  return (
    <>
      <section className='bg-primary-500 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>

        <Header />
        <h3 className='wrapper h3-bold text-center sm:text-left' style={{ backgroundColor: '#E0F2FE', padding: '20px', }}>Create Event</h3>
      </section>

      <div className='wrapper my-10'>
        <EventForm type="Create" />

      </div>
    </>
  )
}

export default CreateEvent
