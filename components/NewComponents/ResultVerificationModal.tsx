import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Award, 
  Clock, 
  Eye,
  ThumbsUp,
  ThumbsDown 
} from 'lucide-react';
import Counter from '@/components/Counter';

interface ResultVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  verificationData: {
    opponent: string;
    tournament: string;
    submittedScore: string;
    homeTeam: string;
    awayTeam: string;
    deadline: string;
    hasScreenshot: boolean;
    aiConfidence?: number;
  };
}

const ResultVerificationModal = ({ isOpen, onClose, verificationData }: ResultVerificationModalProps) => {
  const [decision, setDecision] = useState<'approve' | 'dispute' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasOwnScreenshot, setHasOwnScreenshot] = useState<boolean | null>(null);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const handleDecision = async (action: 'approve' | 'dispute') => {
    setIsSubmitting(true);
    setDecision(action);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 2000);
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffHours = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      const diffDays = Math.ceil(diffHours / 24);
      return `${diffDays}d`;
    }
  };

  if (hasOwnScreenshot === null) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-sm p-4">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-white text-base">Verify Result</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              {verificationData.opponent} submitted a result
            </DialogDescription>
          </DialogHeader>
          
          {/* Match Info */}
          <div className="bg-gray-800/30 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="h-3 w-3 text-green-400" />
                <span className="text-xs font-medium text-white">{verificationData.tournament}</span>
              </div>
              <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs px-2 py-0.5">
                <Clock className="h-2 w-2 mr-1" />
                {formatDeadline(verificationData.deadline)}
              </Badge>
            </div>
            
            <div className="text-center mb-2">
              <p className="text-sm font-medium text-white mb-1">
                {verificationData.homeTeam} vs {verificationData.awayTeam}
              </p>
              <div className="text-lg font-bold text-green-400">
                {verificationData.submittedScore}
              </div>
            </div>

            {verificationData.hasScreenshot && verificationData.aiConfidence && (
              <div className="flex items-center justify-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-400" />
                <span className="text-xs text-green-400">
                  AI Verified ({verificationData.aiConfidence}%)
                </span>
              </div>
            )}
          </div>

          {/* Screenshot Question */}
          <div className="mb-4">
            <h3 className="text-xs font-medium text-white mb-2">Do you have a screenshot?</h3>
            
            <div className="space-y-2">
              <Button
                onClick={() => setHasOwnScreenshot(true)}
                variant="outline"
                className="w-full justify-start bg-gray-800 border-gray-600 hover:bg-gray-700 text-white text-sm h-8"
              >
                <Eye className="h-3 w-3 mr-2" />
                Yes, I have one
              </Button>
              
              <Button
                onClick={() => setHasOwnScreenshot(false)}
                variant="outline"
                className="w-full justify-start bg-gray-800 border-gray-600 hover:bg-gray-700 text-white text-sm h-8"
              >
                <XCircle className="h-3 w-3 mr-2" />
                No screenshot
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-sm p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-white text-base">
            {hasOwnScreenshot ? 'Upload Screenshot' : 'Verify Result'}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            {hasOwnScreenshot 
              ? 'Upload for automatic verification'
              : 'Confirm if you agree with the result'
            }
          </DialogDescription>
        </DialogHeader>
        
        {/* Match Info */}
        <div className="bg-gray-800/30 rounded-lg p-3 mb-4">
          <div className="text-center">
            <p className="text-sm font-medium text-white mb-1">
              {verificationData.homeTeam} vs {verificationData.awayTeam}
            </p>
            <div className="text-lg font-bold text-green-400 mb-1">
              {verificationData.submittedScore}
            </div>
            <p className="text-xs text-gray-400">
              by {verificationData.opponent}
            </p>
          </div>
        </div>

        {hasOwnScreenshot ? (
          // Screenshot upload flow with counter for manual score entry
          <>
            <div className="mb-4">
              <h3 className="text-xs font-medium text-gray-400 mb-3">Your Result</h3>
              
              <div className="grid grid-cols-3 gap-3 items-center mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{verificationData.homeTeam}</label>
                  <Counter
                    value={homeScore}
                    onChange={setHomeScore}
                    min={0}
                    max={20}
                    className="bg-gray-800/30"
                  />
                </div>
                
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-400">VS</span>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{verificationData.awayTeam}</label>
                  <Counter
                    value={awayScore}
                    onChange={setAwayScore}
                    min={0}
                    max={20}
                    className="bg-gray-800/30"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="border border-dashed border-gray-600 rounded-lg p-4 text-center mb-3">
                <Eye className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400 mb-2">Upload your screenshot</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="verification-upload"
                />
                <label
                  htmlFor="verification-upload"
                  className="inline-block px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>
              
              <div className="flex items-start gap-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                <AlertTriangle className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-400">
                  AI will compare screenshots automatically
                </p>
              </div>
            </div>
          </>
        ) : (
          // Manual approval flow
          <div className="mb-4">
            <div className="flex items-start gap-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded mb-3">
              <AlertTriangle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-400">
                Please verify based on your memory
              </p>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => handleDecision('approve')}
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-500 text-white text-sm h-8"
              >
                <ThumbsUp className="h-3 w-3 mr-2" />
                {isSubmitting && decision === 'approve' ? 'Approving...' : 'Approve'}
              </Button>
              
              <Button
                onClick={() => handleDecision('dispute')}
                disabled={isSubmitting}
                variant="outline"
                className="w-full bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 text-sm h-8"
              >
                <ThumbsDown className="h-3 w-3 mr-2" />
                {isSubmitting && decision === 'dispute' ? 'Disputing...' : 'Dispute'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResultVerificationModal;
