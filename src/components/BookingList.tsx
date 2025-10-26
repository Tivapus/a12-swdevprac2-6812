"use client";

import { useSelector, useDispatch } from 'react-redux';
import { removeBooking } from '@/redux/features/bookSlice';
import { RootState } from '@/redux/store';
import { BookingItem } from '../../interface';

export default function BookingList() {
    const bookings = useSelector((state: RootState) => state.bookSlice.bookItems);
    const dispatch = useDispatch();

    const handleCancelBooking = (booking: BookingItem) => {
        dispatch(removeBooking(booking));
    };

    if (bookings.length === 0) {
        return (
            <div className="text-center p-4 text-gray-600">
                No Venue Booking
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-4 p-8 rounded-lg h-full gap-4">
            <h2 className="text-xl font-semibold mb-4 text-black">Your Bookings</h2>
            {bookings.map((booking: BookingItem, index: number) => (
                <div key={index} className="bg-gray-100 shadow rounded-lg p-4 flex flex-col space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Name</p>
                            <p className="text-gray-900">{booking.nameLastname}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Contact Number</p>
                            <p className="text-gray-900">{booking.tel}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Venue</p>
                            <p className="text-gray-900">{booking.venue}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Booking Date</p>
                            <p className="text-gray-900">{booking.bookDate}</p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => handleCancelBooking(booking)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            data-testid={`cancel-booking-${index}`}
                        >
                            Cancel Booking
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}