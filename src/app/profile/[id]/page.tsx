"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function profilepage({ params }: any) {
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      toast.success("Logged out Successfully");
    } catch (err: any) {
      toast.error(err.message);
      console.log(err.message);
    }
  }
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h1>Profile Page</h1>
      <p>You're on profile page <span className='bg-orange-600 text-black font-semibold p-2 ml-2'>{params.id}</span></p>
      <div>
        <button className='bg-orange-400 px-2 rounded-md' onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}
