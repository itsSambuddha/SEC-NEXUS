import { Event } from '@/lib/types'
import React from 'react'
import Card from './Card'

type CollectionProps = {
    data:Event[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages: number,
    urlParamName?: string,
    collectionType: 'Events_Organized' | 'My_Registrations' | 'All_Events',
}

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
}: CollectionProps) => {
  return (
    <div>
      {data.length > 0 ? (
        <div className='flex flex-col items-center gap-10'>

              <ul className='grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {data.map((event) =>{


                  return (
                    <li key={event._id} className='flex justify-center'>
                      <Card event={event} />
                    </li>
                  )
                })}
              </ul>
        </div>

      ) : (
        <div className='flex-center wrapper min-h-[300px] w-full flex-col gap-4 text-center rounded-14px bg-gray-50 py-28'>
            <h3 className='font-bold text-xl md:text-2xl'>{emptyTitle}</h3>
            <p className='p-regular-14'>{emptyStateSubtext}</p>
        </div>
      )}
    </div>
  )
}

export default Collection
