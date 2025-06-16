
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import CalendarView from '@/components/CalendarView';

const CalendarPage = () => {
  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-green-500" />
          Tournament Calendar
        </h1>
        <p className="text-sm text-gray-400">View your upcoming matches and tournament schedule</p>
      </div>

      {/* Calendar Component */}
      <CalendarView />
    </div>
  );
};

export default CalendarPage;
