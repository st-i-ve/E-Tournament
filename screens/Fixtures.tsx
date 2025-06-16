
import React from 'react';
import { Calendar } from 'lucide-react-native';
import { Button } from '@/components/NewComponents/ui/button';
import MinimalCalendar from '@/components/NewComponents/MinimalCalendar';
import { useNavigate } from 'react-router-dom';

const FixturesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 pb-24 h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Subtle geometric background shapes */}
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

      {/* Header */}
      <div className="mb-6 relative z-10">
        <div className="flex items-start gap-4 mb-1 ml-2">
          <div className="w-6 h-6 mt-1 flex-shrink-0 relative">
            <div className="w-6 h-6 border-2 border-green-400 rounded-full relative">
              <div className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-green-400 transform -translate-x-1/2 -translate-y-0.5 rotate-45"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent leading-tight">
              Fixtures
            </h1>
            <p className="text-xs text-gray-500 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2s_ease-in-out_infinite]">
              Your upcoming matches and tournament schedule
            </p>
          </div>
        </div>
      </div>

      {/* Calendar View - Reduced height and added margins */}
      <div className="flex-1 max-h-[45vh] mx-[2%] relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-500" />
            Calendar View
          </h2>
          <Button
            onClick={() => navigate('/schedule')}
            className="relative overflow-hidden bg-green-600 text-white border border-green-500 hover:border-green-400 hover:bg-green-500 px-4 py-2 text-sm group transition-all duration-300"
          >
            <span className="relative z-10">View All Games</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </Button>
        </div>
        <div className="h-full">
          <MinimalCalendar />
        </div>
      </div>
    </div>
  );
};

export default FixturesPage;
