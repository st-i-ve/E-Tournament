import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Home,
  Users,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  List,
} from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { currentUser, mockMatches, Match } from '@/data/enhancedMockData';
import MatchCard from './MatchCard';
import MatchInfoModal from './MatchInfoModal';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const userMatches = mockMatches.filter(
    (match) =>
      match.homeTeam === currentUser.teamName ||
      match.awayTeam === currentUser.teamName
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getMatchesForDate = (date: Date) => {
    return userMatches.filter((match) => {
      const matchDate = new Date(match.scheduledDate);
      return matchDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const formatMonth = () => {
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const renderCalendarGrid = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-gray-900/40 rounded-2xl p-12 border border-gray-800/50">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-6 mb-8">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-6 text-center text-xl font-semibold text-gray-300 bg-gray-800/30 rounded-lg"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-6">
          {days.map((day, index) => {
            if (!day) return <div key={index} className="p-6 h-40" />;

            const matches = getMatchesForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected =
              selectedDate &&
              day.toDateString() === selectedDate.toDateString();
            const homeMatches = matches.filter(
              (m) => m.homeTeam === currentUser.teamName
            );
            const awayMatches = matches.filter(
              (m) => m.awayTeam === currentUser.teamName
            );

            return (
              <div
                key={day.toDateString()}
                className={`p-6 h-40 border-2 border-gray-700 rounded-xl cursor-pointer transition-all hover:bg-gray-800/70 hover:border-gray-600 ${
                  isToday
                    ? 'bg-green-500/15 border-green-500/50'
                    : 'bg-gray-800/20'
                } ${isSelected ? 'bg-blue-500/25 border-blue-500/60' : ''}`}
                onClick={() => setSelectedDate(isSelected ? null : day)}
              >
                <div
                  className={`text-2xl font-bold mb-4 ${
                    isToday ? 'text-green-400' : 'text-gray-200'
                  }`}
                >
                  {day.getDate()}
                </div>

                {/* Match indicators */}
                {matches.length > 0 && (
                  <div className="flex items-center justify-center gap-3">
                    {homeMatches.length > 0 && (
                      <div
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        title="Home match"
                      >
                        <span className="text-xs font-bold text-white">
                          {homeMatches.length}
                        </span>
                      </div>
                    )}
                    {awayMatches.length > 0 && (
                      <div
                        className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                        title="Away match"
                      >
                        <span className="text-xs font-bold text-white">
                          {awayMatches.length}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSelectedDateMatches = () => {
    if (!selectedDate) return null;

    const matches = getMatchesForDate(selectedDate);
    if (matches.length === 0) return null;

    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
          <Calendar className="h-5 w-5 text-green-500" />
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </h3>
        <div className="grid gap-4">
          {matches.map((match, index) => (
            <MatchCard
              key={`${match.homeTeam}-${match.awayTeam}-${index}`}
              match={match}
              userTeam={currentUser.teamName}
              onInfoClick={setSelectedMatch}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl font-bold text-white">{formatMonth()}</h2>
          <div className="flex items-center gap-4 text-base text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <span>Home</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full" />
              <span>Away</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={() => navigateMonth('prev')}
            className="bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 px-4 py-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="default"
            onClick={() => setCurrentDate(new Date())}
            className="bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 px-4 py-2"
          >
            Today
          </Button>

          <Button
            variant="outline"
            size="default"
            onClick={() => navigateMonth('next')}
            className="bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 px-4 py-2"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      {renderCalendarGrid()}

      {/* Selected Date Matches */}
      {renderSelectedDateMatches()}

      {/* Legend */}
      <div className="text-center text-base text-gray-500 mt-8">
        Click on a date to view matches for that day
      </div>

      {/* Match Info Modal */}
      <MatchInfoModal
        match={selectedMatch}
        userTeam={currentUser.teamName}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </div>
  );
};

export default CalendarView;
