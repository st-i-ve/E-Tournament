import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Bell,
} from 'lucide-react-native-native';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ResultSubmissionModal from '@/components/ResultSubmissionModal';
import ResultVerificationModal from '@/components/ResultVerificationModal';

// Mock pending actions data
const mockPendingActions = [
  {
    id: 'action-1',
    type: 'submit_result',
    matchId: 'match-123',
    opponent: 'Phoenix Rising',
    tournament: 'Champions Elite League',
    deadline: '2025-06-16T23:59:59Z',
    priority: 'high',
  },
  {
    id: 'action-2',
    type: 'verify_result',
    matchId: 'match-124',
    opponent: 'Lightning Strikes',
    tournament: 'Weekend Warriors Cup',
    submittedScore: '2-1',
    deadline: '2025-06-17T23:59:59Z',
    priority: 'medium',
  },
  {
    id: 'action-3',
    type: 'awaiting_verification',
    matchId: 'match-125',
    opponent: 'Desert Eagles',
    tournament: 'Champions Elite League',
    submittedAt: '2025-06-15T14:30:00Z',
    priority: 'low',
  },
];

const PendingActionsPage = () => {
  const navigate = useNavigate();
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'submit_result':
        return <Upload className="h-4 w-4 text-red-400" />;
      case 'verify_result':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'awaiting_verification':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityDot = (priority: string) => {
    const color =
      priority === 'high'
        ? 'bg-red-400'
        : priority === 'medium'
        ? 'bg-yellow-400'
        : 'bg-gray-400';
    return <div className={`w-2 h-2 rounded-full ${color}`} />;
  };

  const getActionText = (action: any) => {
    switch (action.type) {
      case 'submit_result':
        return `Submit result vs ${action.opponent}`;
      case 'verify_result':
        return `Verify result vs ${action.opponent}`;
      case 'awaiting_verification':
        return `Awaiting verification from ${action.opponent}`;
      default:
        return 'Unknown action';
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffHours = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60)
    );

    if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      const diffDays = Math.ceil(diffHours / 24);
      return `${diffDays}d`;
    }
  };

  const handleActionClick = (action: any) => {
    setSelectedAction(action);
    if (action.type === 'submit_result') {
      setIsSubmissionModalOpen(true);
    } else if (action.type === 'verify_result') {
      setIsVerificationModalOpen(true);
    }
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

      {/* Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-green-500/20 z-10">
        <div className="flex items-center gap-3 p-4">
          <Button
            onClick={() => navigate('/profile')}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-800/50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium">Pending Actions</h1>
          <Badge className="bg-red-500/10 text-red-400 border-red-500/30 text-xs">
            {mockPendingActions.length}
          </Badge>
        </div>
      </div>

      <div className="p-4 relative z-10">
        {mockPendingActions.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="h-8 w-8 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">All caught up!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {mockPendingActions.map((action, index) => (
              <div key={action.id}>
                <div
                  onClick={() => handleActionClick(action)}
                  className="flex items-center gap-3 py-4 px-2 hover:bg-gray-800/30 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getActionIcon(action.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        {getActionText(action)}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {action.tournament}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {action.deadline && (
                      <span className="text-xs text-gray-400">
                        {formatDeadline(action.deadline)}
                      </span>
                    )}
                    {getPriorityDot(action.priority)}
                  </div>
                </div>

                {/* Line separator */}
                {index < mockPendingActions.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent mx-4"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedAction && (
        <>
          <ResultSubmissionModal
            isOpen={isSubmissionModalOpen}
            onClose={() => {
              setIsSubmissionModalOpen(false);
              setSelectedAction(null);
            }}
            matchData={{
              opponent: selectedAction.opponent,
              tournament: selectedAction.tournament,
              homeTeam: 'Your Team',
              awayTeam: selectedAction.opponent,
              deadline: selectedAction.deadline,
            }}
          />

          <ResultVerificationModal
            isOpen={isVerificationModalOpen}
            onClose={() => {
              setIsVerificationModalOpen(false);
              setSelectedAction(null);
            }}
            verificationData={{
              opponent: selectedAction.opponent,
              tournament: selectedAction.tournament,
              submittedScore: selectedAction.submittedScore || '0-0',
              homeTeam: 'Your Team',
              awayTeam: selectedAction.opponent,
              deadline: selectedAction.deadline,
              hasScreenshot: true,
              aiConfidence: 95,
            }}
          />
        </>
      )}

      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default PendingActionsPage;
