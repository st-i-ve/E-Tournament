import React from 'react';
import { LucideIcon } from 'lucide-react-native';
import { Button } from '@/components/ui/button';

interface QuickActionButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const QuickActionButton = ({
  icon: Icon,
  title,
  description,
  onClick,
  variant = 'primary',
}: QuickActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`
        relative h-auto p-3 flex flex-col items-center text-center gap-2 
        transition-all duration-300 hover:scale-105 hover:shadow-lg
        ${
          variant === 'primary'
            ? 'bg-green-600 hover:bg-green-500 text-white'
            : 'bg-black hover:bg-gray-900 text-gray-100 border border-gray-800 hover:border-gray-700'
        }
        rounded-xl group overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
        before:translate-x-[-100%] before:skew-x-12 before:transition-transform before:duration-700
        hover:before:translate-x-[200%]
      `}
      variant="outline"
    >
      <div
        className={`
        p-1.5 rounded-full transition-colors duration-300 z-10
        ${
          variant === 'primary'
            ? 'bg-green-500/20 group-hover:bg-green-400/30'
            : 'bg-gray-700/20 group-hover:bg-gray-600/30'
        }
      `}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="z-10 relative px-0.5">
        <h3 className="font-semibold text-xs leading-tight">{title}</h3>
        <p className="text-xs opacity-80 mt-0.5 leading-tight">{description}</p>
      </div>
    </Button>
  );
};

export default QuickActionButton;
