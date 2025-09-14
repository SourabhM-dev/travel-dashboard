import React from 'react'
import { Link } from 'react-router-dom'

export default function TripCard({trip}){
  return (
    <article className='bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-4 flex flex-col'>
      <img src={trip.image} alt={trip.title} className='h-40 w-full object-cover rounded mb-3' />
      <h3 className='font-semibold mb-1'>{trip.title}</h3>
      <p className='text-sm text-gray-600 mb-3'>{trip.short}</p>
      <div className='mt-auto flex items-center justify-between'>
        <span className='font-bold'>₹{trip.price}</span>
        <Link to={'/trips/'+trip.id} className='text-sm text-blue-600 hover:underline'>Details</Link>
      </div>
    </article>
  )
}
