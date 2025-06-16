import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  Camera,
  Award,
  Clock,
  AlertCircle,
  Check,
} from 'lucide-react-native';
import Counter from '@/components/Counter';

interface ResultSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchData: {
    opponent: string;
    tournament: string;
    deadline: string;
    homeTeam: string;
    awayTeam: string;
  };
}

const ResultSubmissionModal = ({
  isOpen,
  onClose,
  matchData,
}: ResultSubmissionModalProps) => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<
    'input' | 'uploading' | 'success'
  >('input');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setScreenshot(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionStep('uploading');

    // Simulate API call and Gemini processing
    setTimeout(() => {
      setSubmissionStep('success');
      setIsSubmitting(false);
    }, 3000);
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

  const renderContent = () => {
    switch (submissionStep) {
      case 'uploading':
        return (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-base font-medium text-white mb-2">
              Processing...
            </h3>
            <p className="text-sm text-gray-400 mb-3">Analyzing screenshot</p>
            <div className="w-full bg-gray-800 rounded-full h-1">
              <div
                className="bg-green-600 h-1 rounded-full animate-pulse"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-base font-medium text-white mb-2">Submitted</h3>
            <p className="text-sm text-gray-400 mb-4">
              Waiting for verification
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-500"
            >
              Close
            </Button>
          </div>
        );

      default:
        return (
          <>
            {/* Match Info */}
            <div className="bg-gray-800/30 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="h-3 w-3 text-green-400" />
                  <span className="text-xs font-medium text-white">
                    {matchData.tournament}
                  </span>
                </div>
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs px-2 py-0.5">
                  <Clock className="h-2 w-2 mr-1" />
                  {formatDeadline(matchData.deadline)}
                </Badge>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium text-white">
                  {matchData.homeTeam} vs {matchData.awayTeam}
                </p>
              </div>
            </div>

            {/* Score Input */}
            <div className="mb-4">
              <h3 className="text-xs font-medium text-gray-400 mb-3">
                Match Result
              </h3>

              <div className="grid grid-cols-3 gap-3 items-center">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {matchData.homeTeam}
                  </label>
                  <Counter
                    value={homeScore}
                    onChange={setHomeScore}
                    min={0}
                    max={20}
                  />
                </div>

                <div className="text-center">
                  <span className="text-sm font-medium text-gray-400">VS</span>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    {matchData.awayTeam}
                  </label>
                  <Counter
                    value={awayScore}
                    onChange={setAwayScore}
                    min={0}
                    max={20}
                  />
                </div>
              </div>
            </div>

            {/* Screenshot Upload */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="h-3 w-3 text-green-400" />
                <h3 className="text-xs font-medium text-white">Screenshot</h3>
                <Badge
                  variant="outline"
                  className="text-xs bg-green-500/10 text-green-400 border-green-500/30 px-1.5 py-0"
                >
                  Optional
                </Badge>
              </div>

              <div className="border border-dashed border-gray-600 rounded-lg p-4 text-center">
                {screenshot ? (
                  <div className="space-y-1">
                    <Check className="h-5 w-5 text-green-400 mx-auto" />
                    <p className="text-xs text-white font-medium">
                      {screenshot.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload className="h-5 w-5 text-gray-400 mx-auto" />
                    <p className="text-xs text-gray-400">Upload screenshot</p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="screenshot-upload"
                />
                <label
                  htmlFor="screenshot-upload"
                  className="inline-block mt-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded cursor-pointer transition-colors"
                >
                  {screenshot ? 'Change' : 'Choose File'}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Result'}
            </Button>
          </>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-sm p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-white text-base">
            Submit Result
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Enter your match result
          </DialogDescription>
        </DialogHeader>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default ResultSubmissionModal;
