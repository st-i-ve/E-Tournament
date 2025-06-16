
export interface TeamMatchStats {
  possession_percent: number;
  shots: number;
  shots_on_target: number;
  fouls: number;
  offsides: number;
  corner_kicks: number;
  free_kicks: number;
  passes: number;
  successful_passes: number;
  crosses: number;
  interceptions: number;
  tackles: number;
  saves: number;
}

export interface TeamMatchData {
  name: string;
  score: number;
  stats: TeamMatchStats;
}

export interface DetailedMatch {
  match_id: string;
  team_home: TeamMatchData;
  team_away: TeamMatchData;
  full_time: boolean;
  timestamp: string;
  tournament_name?: string;
  matchday?: number;
}

export const detailedMatches: DetailedMatch[] = [
  {
    match_id: "match_001",
    team_home: {
      name: "FC Barcelona",
      score: 3,
      stats: {
        possession_percent: 65,
        shots: 12,
        shots_on_target: 8,
        fouls: 2,
        offsides: 1,
        corner_kicks: 6,
        free_kicks: 3,
        passes: 425,
        successful_passes: 368,
        crosses: 8,
        interceptions: 15,
        tackles: 12,
        saves: 2
      }
    },
    team_away: {
      name: "Real Madrid",
      score: 1,
      stats: {
        possession_percent: 35,
        shots: 6,
        shots_on_target: 3,
        fouls: 8,
        offsides: 2,
        corner_kicks: 2,
        free_kicks: 5,
        passes: 268,
        successful_passes: 201,
        crosses: 4,
        interceptions: 18,
        tackles: 22,
        saves: 5
      }
    },
    full_time: true,
    timestamp: "2025-05-10T20:00:00Z",
    tournament_name: "Premier League Champions",
    matchday: 5
  },
  {
    match_id: "match_002",
    team_home: {
      name: "Manchester City",
      score: 1,
      stats: {
        possession_percent: 58,
        shots: 8,
        shots_on_target: 4,
        fouls: 3,
        offsides: 0,
        corner_kicks: 4,
        free_kicks: 2,
        passes: 312,
        successful_passes: 265,
        crosses: 6,
        interceptions: 12,
        tackles: 8,
        saves: 3
      }
    },
    team_away: {
      name: "FC Barcelona",
      score: 2,
      stats: {
        possession_percent: 42,
        shots: 7,
        shots_on_target: 5,
        fouls: 5,
        offsides: 1,
        corner_kicks: 3,
        free_kicks: 4,
        passes: 198,
        successful_passes: 156,
        crosses: 3,
        interceptions: 16,
        tackles: 14,
        saves: 1
      }
    },
    full_time: true,
    timestamp: "2025-05-08T18:30:00Z",
    tournament_name: "Weekend Warriors Cup",
    matchday: 3
  },
  {
    match_id: "match_003",
    team_home: {
      name: "Arsenal",
      score: 1,
      stats: {
        possession_percent: 45,
        shots: 5,
        shots_on_target: 2,
        fouls: 6,
        offsides: 3,
        corner_kicks: 1,
        free_kicks: 7,
        passes: 201,
        successful_passes: 145,
        crosses: 2,
        interceptions: 20,
        tackles: 18,
        saves: 6
      }
    },
    team_away: {
      name: "FC Barcelona",
      score: 3,
      stats: {
        possession_percent: 55,
        shots: 11,
        shots_on_target: 7,
        fouls: 1,
        offsides: 0,
        corner_kicks: 5,
        free_kicks: 1,
        passes: 298,
        successful_passes: 251,
        crosses: 7,
        interceptions: 11,
        tackles: 9,
        saves: 1
      }
    },
    full_time: true,
    timestamp: "2025-05-05T16:00:00Z",
    tournament_name: "Friday Night League",
    matchday: 2
  },
  {
    match_id: "match_004",
    team_home: {
      name: "FC Barcelona",
      score: 2,
      stats: {
        possession_percent: 61,
        shots: 9,
        shots_on_target: 6,
        fouls: 4,
        offsides: 1,
        corner_kicks: 3,
        free_kicks: 2,
        passes: 356,
        successful_passes: 289,
        crosses: 5,
        interceptions: 13,
        tackles: 11,
        saves: 3
      }
    },
    team_away: {
      name: "Chelsea",
      score: 1,
      stats: {
        possession_percent: 39,
        shots: 4,
        shots_on_target: 3,
        fouls: 7,
        offsides: 2,
        corner_kicks: 1,
        free_kicks: 6,
        passes: 189,
        successful_passes: 134,
        crosses: 2,
        interceptions: 19,
        tackles: 16,
        saves: 4
      }
    },
    full_time: true,
    timestamp: "2025-05-12T19:45:00Z",
    tournament_name: "Champions Cup",
    matchday: 1
  }
];
