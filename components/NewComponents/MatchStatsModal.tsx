
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DetailedMatch } from '@/data/matchStats';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface MatchStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: DetailedMatch | null;
  userTeam: string;
}

const MatchStatsModal = ({ isOpen, onClose, match, userTeam }: MatchStatsModalProps) => {
  if (!match) return null;

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

  const chartConfig = {
    [userTeamData.name]: { color: '#10b981' },
    [opponentData.name]: { color: '#6b7280' }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full mx-auto bg-gray-900 border-gray-800 p-3 max-h-[95vh] overflow-y-auto">
        <DialogTitle className="sr-only">
          Match Statistics
        </DialogTitle>
        <DialogDescription className="sr-only">
          Detailed match statistics including possession, shots, saves, and passing data
        </DialogDescription>
        
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-400 hover:text-white z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-4 mt-4">
          {/* Possession Chart */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-3">Possession</h4>
            <div className="flex justify-center">
              <ChartContainer config={chartConfig} className="h-40 w-40">
                <PieChart>
                  <Pie
                    data={possessionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
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

          {/* Shots & Saves */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-3">Shots & Saves</h4>
            <ChartContainer config={chartConfig} className="h-36">
              <BarChart data={shotsData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                <XAxis dataKey="category" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey={userTeamData.name} fill="#10b981" />
                <Bar dataKey={opponentData.name} fill="#6b7280" />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Passing Statistics */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-3">Passing Statistics</h4>
            <ChartContainer config={chartConfig} className="h-36">
              <BarChart data={passData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                <XAxis dataKey="category" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey={userTeamData.name} fill="#10b981" />
                <Bar dataKey={opponentData.name} fill="#6b7280" />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchStatsModal;
