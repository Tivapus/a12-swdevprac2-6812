import BookingList from '@/components/BookingList';

export default function MyBookingPage() {
  return (
    <div className='flex flex-col p-8'>
      <h1 className="text-2xl font-semibold mb-4 text-black">My Bookings</h1>
      <BookingList />
    </div>
  );
}
