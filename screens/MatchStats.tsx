
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react-native';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/NewComponents/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { detailedMatches } from '@/data/matchStats';
import { currentUser } from '@/data/enhancedMockData';
import { useIsMobile } from '@/hooks/use-mobile';

const MatchStatsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const matchId = searchParams.get('matchId');
  const userTeam = currentUser.teamName;
  const isMobile = useIsMobile();

  const match = detailedMatches.find(m => m.match_id === matchId);

  if (!match) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Geometric background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Triangles */}
          <div className="absolute top-20 left-10 w-8 h-8 border border-green-500/10 transform rotate-45"></div>
          <div className="absolute top-1/3 right-20 w-6 h-6 border border-green-500/10 transform rotate-12"></div>
          <div className="absolute bottom-1/4 left-1/4 w-10 h-10 border border-green-500/10 transform rotate-45"></div>
          
          {/* Circles */}
          <div className="absolute top-1/4 left-1/3 w-12 h-12 border border-green-500/10 rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/4 w-8 h-8 border border-green-500/10 rounded-full"></div>
          <div className="absolute top-2/3 left-20 w-6 h-6 border border-green-500/10 rounded-full"></div>
          
          {/* Rectangles */}
          <div className="absolute top-1/2 right-10 w-12 h-8 border border-green-500/10"></div>
          <div className="absolute bottom-20 left-1/2 w-8 h-12 border border-green-500/10"></div>
          
          {/* Crossing lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/5 to-transparent"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/5 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent mb-4">Match Not Found</h1>
            <button
              onClick={() => navigate('/fulltime')}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Back to Matches
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isHomeTeam = match.team_home.name === userTeam;
  const userTeamData = isHomeTeam ? match.team_home : match.team_away;
  const opponentData = isHomeTeam ? match.team_away : match.team_home;

  const possessionData = [
    { name: userTeamData.name, value: userTeamData.stats.possession_percent, fill: '#10b981' },
    { name: opponentData.name, value: opponentData.stats.possession_percent, fill: '#6b7280' }
  ];

  const shotsData = [
    { 
      category: 'Shots', 
      [userTeamData.name]: userTeamData.stats.shots,
      [opponentData.name]: opponentData.stats.shots
    },
    { 
      category: 'On Target', 
      [userTeamData.name]: userTeamData.stats.shots_on_target,
      [opponentData.name]: opponentData.stats.shots_on_target
    },
    { 
      category: 'Saves', 
      [userTeamData.name]: userTeamData.stats.saves,
      [opponentData.name]: opponentData.stats.saves
    }
  ];

  const passData = [
    { 
      category: 'Total Passes', 
      [userTeamData.name]: userTeamData.stats.passes,
      [opponentData.name]: opponentData.stats.passes
    },
    { 
      category: 'Successful', 
      [userTeamData.name]: userTeamData.stats.successful_passes,
      [opponentData.name]: opponentData.stats.successful_passes
    }
  ];

  // Web/Radar chart data for overall performance
  const radarData = [
    {
      subject: 'Possession',
      [userTeamData.name]: userTeamData.stats.possession_percent,
      [opponentData.name]: opponentData.stats.possession_percent,
      fullMark: 100
    },
    {
      subject: 'Shots',
      [userTeamData.name]: (userTeamData.stats.shots / 15) * 100,
      [opponentData.name]: (opponentData.stats.shots / 15) * 100,
      fullMark: 100
    },
    {
      subject: 'Accuracy',
      [userTeamData.name]: (userTeamData.stats.shots_on_target / userTeamData.stats.shots) * 100,
      [opponentData.name]: (opponentData.stats.shots_on_target / opponentData.stats.shots) * 100,
      fullMark: 100
    },
    {
      subject: 'Pass Success',
      [userTeamData.name]: (userTeamData.stats.successful_passes / userTeamData.stats.passes) * 100,
      [opponentData.name]: (opponentData.stats.successful_passes / opponentData.stats.passes) * 100,
      fullMark: 100
    },
    {
      subject: 'Tackles',
      [userTeamData.name]: (userTeamData.stats.tackles / 25) * 100,
      [opponentData.name]: (opponentData.stats.tackles / 25) * 100,
      fullMark: 100
    }
  ];

  const chartConfig = {
    [userTeamData.name]: { color: '#10b981' },
    [opponentData.name]: { color: '#6b7280' }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Geometric background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Triangles */}
        <div className="absolute top-20 left-10 w-8 h-8 border border-green-500/10 transform rotate-45"></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 border border-green-500/10 transform rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/4 w-10 h-10 border border-green-500/10 transform rotate-45"></div>
        
        {/* Circles */}
        <div className="absolute top-1/4 left-1/3 w-12 h-12 border border-green-500/10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-8 h-8 border border-green-500/10 rounded-full"></div>
        <div className="absolute top-2/3 left-20 w-6 h-6 border border-green-500/10 rounded-full"></div>
        
        {/* Rectangles */}
        <div className="absolute top-1/2 right-10 w-12 h-8 border border-green-500/10"></div>
        <div className="absolute bottom-20 left-1/2 w-8 h-12 border border-green-500/10"></div>
        
        {/* Crossing lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/5 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-6 pb-24 relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start gap-4 mb-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/fulltime')}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-300 border border-gray-700/30"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 flex-shrink-0 relative">
                {/* Circle intersecting with rectangle */}
                <div className="absolute top-0 left-0 w-8 h-8 border-2 border-green-400 rounded-full"></div>
                <div className="absolute top-1 left-1 w-6 h-6 border-2 border-green-400"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent leading-tight">
                Match Statistics
              </h1>
              <p className="text-xs text-gray-500 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2s_ease-in-out_infinite]">
                {userTeamData.name} {userTeamData.score} - {opponentData.score} {opponentData.name}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Possession Chart */}
          <div className="py-6">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">Possession</h3>
            <div className="flex justify-center">
              <ChartContainer config={chartConfig} className="h-64 w-64">
                <PieChart>
                  <Pie
                    data={possessionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {possessionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </div>

          {/* Line separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

          {/* Overall Performance Radar */}
          <div className="py-6">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">Overall Performance</h3>
            <div className="flex justify-center">
              <ChartContainer config={chartConfig} className="h-64 w-64">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <PolarRadiusAxis tick={{ fill: '#9ca3af', fontSize: 8 }} />
                  <Radar
                    name={userTeamData.name}
                    dataKey={userTeamData.name}
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name={opponentData.name}
                    dataKey={opponentData.name}
                    stroke="#6b7280"
                    fill="#6b7280"
                    fillOpacity={0.3}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ChartContainer>
            </div>
          </div>

          {/* Line separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

          {/* Shots & Saves */}
          <div className="py-6">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">Shots & Saves</h3>
            <div className="flex justify-center">
              <ChartContainer config={chartConfig} className="h-48 w-full max-w-md">
                <BarChart 
                  data={shotsData} 
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }} 
                  maxBarSize={40}
                  barCategoryGap="10%"
                >
                  <XAxis dataKey="category" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey={userTeamData.name} fill="#10b981" />
                  <Bar dataKey={opponentData.name} fill="#6b7280" />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          {/* Line separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

          {/* Passing Statistics */}
          <div className="py-6">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">Passing Statistics</h3>
            <div className="flex justify-center">
              <ChartContainer config={chartConfig} className="h-48 w-full max-w-md">
                <BarChart 
                  data={passData} 
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }} 
                  maxBarSize={40}
                  barCategoryGap="10%"
                >
                  <XAxis dataKey="category" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey={userTeamData.name} fill="#10b981" />
                  <Bar dataKey={opponentData.name} fill="#6b7280" />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchStatsPage;
