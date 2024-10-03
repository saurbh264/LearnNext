"use client";
import React from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function page() {
  const [user, changeUser] = React.useState("No User");

  const getUser = async () => {
    try {
      const userdata = await axios.get("/api/users/me");
      changeUser(userdata.data.data.username);
      console.log(userdata.data);
    }
    catch (err: any) {
      console.log(err.message);
    }
  }

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
      <p>You're on profile page.</p>
      <div className='my-2 rounded-md '>{user == "No User" ? <span className='bg-orange-500 p-2 text-white'>No Info</span> : <span className='bg-orange-500 p-2 text-white'><Link href={`/profile/${user}`}>{user}</Link></span>}</div>
      <hr />
      <div>
        <button className='bg-orange-400 px-2 rounded-md my-2' onClick={onLogout}>Logout</button>
      </div>
      <div>
        <button className='bg-orange-400 px-2 rounded-md my-2' onClick={getUser}>Get User Details</button>
      </div>
    </div>
  )
}
