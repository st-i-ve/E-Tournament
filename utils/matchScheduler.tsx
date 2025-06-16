
import { User, Match, Tournament } from '@/data/enhancedMockData';

interface ScheduleOptions {
  maxMatchesPerDay: number;
  preferredDays: string[];
  startDate: Date;
  endDate?: Date;
}

export const generateMatches = (
  tournament: Tournament,
  participants: User[],
  options: ScheduleOptions = {
    maxMatchesPerDay: 3,
    preferredDays: ['Monday', 'Wednesday', 'Friday'],
    startDate: new Date(),
  }
): Match[] => {
  const matches: Match[] = [];
  const teams = participants.map(p => p.teamName);
  
  if (tournament.type === 'league') {
    // Round-robin format: every team plays every other team
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        // Home match
        matches.push({
          id: `${tournament.id}-${i}-${j}`,
          tournamentId: tournament.id,
          homeTeam: teams[i],
          awayTeam: teams[j],
          homeScore: 0,
          awayScore: 0,
          status: 'upcoming',
          scheduledDate: new Date().toISOString().split('T')[0],
          matchday: 1
        });
        
        // Away match (return fixture)
        matches.push({
          id: `${tournament.id}-${j}-${i}`,
          tournamentId: tournament.id,
          homeTeam: teams[j],
          awayTeam: teams[i],
          homeScore: 0,
          awayScore: 0,
          status: 'upcoming',
          scheduledDate: new Date().toISOString().split('T')[0],
          matchday: 2
        });
      }
    }
  } else {
    // Knockout format: single elimination
    let round = 1;
    let roundTeams = [...teams];
    
    while (roundTeams.length > 1) {
      const roundMatches: Match[] = [];
      
      for (let i = 0; i < roundTeams.length; i += 2) {
        if (i + 1 < roundTeams.length) {
          roundMatches.push({
            id: `${tournament.id}-r${round}-${i}`,
            tournamentId: tournament.id,
            homeTeam: roundTeams[i],
            awayTeam: roundTeams[i + 1],
            homeScore: 0,
            awayScore: 0,
            status: 'upcoming',
            scheduledDate: new Date().toISOString().split('T')[0],
            matchday: round
          });
        }
      }
      
      matches.push(...roundMatches);
      
      // For knockout, we'd normally advance winners, but for mock data we'll just halve the teams
      roundTeams = roundTeams.slice(0, Math.ceil(roundTeams.length / 2));
      round++;
    }
  }
  
  return scheduleMatchDates(matches, options);
};

const scheduleMatchDates = (matches: Match[], options: ScheduleOptions): Match[] => {
  const scheduledMatches = [...matches];
  const { maxMatchesPerDay, preferredDays, startDate } = options;
  
  let currentDate = new Date(startDate);
  let dailyMatchCount = 0;
  let matchIndex = 0;
  
  while (matchIndex < scheduledMatches.length) {
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Check if current day is a preferred match day
    if (preferredDays.includes(dayName)) {
      // Schedule matches for this day (up to max per day)
      const matchesToSchedule = Math.min(maxMatchesPerDay, scheduledMatches.length - matchIndex);
      
      for (let i = 0; i < matchesToSchedule; i++) {
        scheduledMatches[matchIndex + i].scheduledDate = currentDate.toISOString().split('T')[0];
      }
      
      matchIndex += matchesToSchedule;
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return scheduledMatches;
};

export const getMatchesForTeam = (matches: Match[], teamName: string): Match[] => {
  return matches.filter(match => 
    match.homeTeam === teamName || match.awayTeam === teamName
  );
};

export const getMatchesForDate = (matches: Match[], date: Date): Match[] => {
  const dateString = date.toISOString().split('T')[0];
  return matches.filter(match => match.scheduledDate === dateString);
};

export const getUpcomingMatches = (matches: Match[], limit?: number): Match[] => {
  const upcoming = matches
    .filter(match => match.status === 'upcoming')
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
  
  return limit ? upcoming.slice(0, limit) : upcoming;
};
