import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2 className='text-center font-semibold text-2xl'></h2>
      <p className='text-center font-semibold text-xl'>Could not find requested resource</p>
      <p className='text-center text-blue-500'><Link href="/">Return Home</Link></p>
    </div>
  )
}