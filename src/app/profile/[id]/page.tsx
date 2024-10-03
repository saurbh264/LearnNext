import React from 'react'

export default function profilepage({params}:any) {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h1>Profile Page</h1>
      <p>You're on profile page <span className='bg-orange-600 text-black font-semibold p-2 ml-2'>{params.id}</span></p>
    </div>
  )
}
