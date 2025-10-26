"use client";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface DateReserveProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}
export default function DateReserve({ selectedDate, onDateChange }: DateReserveProps) {

  const dayjsValue = selectedDate ? dayjs(selectedDate) : null;

  const handleChange = (value: Dayjs | null) => {
    onDateChange(value ? value.toDate() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white"
          value={dayjsValue}
          onChange={handleChange}
        />
    </LocalizationProvider>
  );
}