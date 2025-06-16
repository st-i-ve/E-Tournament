
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { currentUser, mockMatches, Match } from '@/data/enhancedMockData';
import MatchCard from './MatchCard';
import MatchInfoModal from './MatchInfoModal';

const MinimalCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const userMatches = mockMatches.filter(match => 
    (match.homeTeam === currentUser.teamName || match.awayTeam === currentUser.teamName) &&
    match.status === 'upcoming'
  );

  console.log('Current date:', currentDate);
  console.log('User matches:', userMatches);
  console.log('User team name:', currentUser.teamName);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getMatchesForDate = (date: Date) => {
    const matches = userMatches.filter(match => {
      const matchDate = new Date(match.scheduledDate);
      const dateString = date.toDateString();
      const matchDateString = matchDate.toDateString();
      console.log(`Comparing ${dateString} with ${matchDateString}:`, dateString === matchDateString);
      return dateString === matchDateString;
    });
    console.log(`Matches for ${date.toDateString()}:`, matches);
    return matches;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const formatMonth = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-medium text-white">{formatMonth()}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 h-7 w-7 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 px-2 h-7 text-xs"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 h-7 w-7 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Week day headers - Smaller */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="p-1 text-center text-xs font-medium text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days - Smaller cells and fonts */}
        <div className="grid grid-cols-7 gap-1 flex-1">
          {days.map((day, index) => {
            if (!day) return <div key={index} className="p-1" />;
            
            const matches = getMatchesForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const hasMatches = matches.length > 0;
            
            console.log(`Day ${day.getDate()}: hasMatches=${hasMatches}`);
            
            return (
              <div 
                key={day.toDateString()} 
                className={`p-1 relative flex items-start justify-start cursor-pointer transition-all hover:bg-gray-800/30 rounded-md min-h-[35px] ${
                  isToday ? 'bg-green-500/10' : hasMatches ? 'hover:bg-gray-800/20' : ''
                }`}
                onClick={() => hasMatches && setSelectedDate(day)}
              >
                <span className={`text-base font-medium ${isToday ? 'text-green-400' : 'text-gray-300'}`}>
                  {day.getDate()}
                </span>
                
                {hasMatches && (
                  <div className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-green-500 rounded-full shadow-lg"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Match Details Modal */}
      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="bg-[#1C1C1E] border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-400 text-sm">
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {selectedDate && getMatchesForDate(selectedDate).map((match, index) => (
              <MatchCard
                key={`${match.homeTeam}-${match.awayTeam}-${index}`}
                match={match}
                userTeam={currentUser.teamName}
                onInfoClick={setSelectedMatch}
                compact
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Match Info Modal */}
      <MatchInfoModal
        match={selectedMatch}
        userTeam={currentUser.teamName}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </>
  );
};

export default MinimalCalendar;
