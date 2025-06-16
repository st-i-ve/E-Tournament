import React, { useState } from 'react';
import {
  X,
  Trophy,
  Users,
  Calendar,
  Settings,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react-native';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Stepper, Step } from '@/components/ui/stepper';

interface CreateTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTournament: (tournament: any) => void;
}

const CreateTournamentModal = ({
  isOpen,
  onClose,
  onCreateTournament,
}: CreateTournamentModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tournamentData, setTournamentData] = useState({
    name: '',
    type: '',
    maxParticipants: 8,
    matchDays: [] as string[],
    description: '',
  });

  const steps: Step[] = [
    { id: 'type', title: 'Type' },
    { id: 'settings', title: 'Settings' },
    { id: 'schedule', title: 'Schedule' },
    { id: 'review', title: 'Review' },
  ];

  const tournamentTypes = [
    { id: 'league', name: 'League', description: 'Round-robin format' },
    { id: 'knockout', name: 'Knockout', description: 'Single elimination' },
  ];

  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const participantOptions = [4, 6, 8, 10, 12, 16, 20];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTypeSelect = (type: string) => {
    setTournamentData({ ...tournamentData, type });
  };

  const handleMatchDayToggle = (day: string) => {
    const updatedDays = tournamentData.matchDays.includes(day)
      ? tournamentData.matchDays.filter((d) => d !== day)
      : [...tournamentData.matchDays, day];
    setTournamentData({ ...tournamentData, matchDays: updatedDays });
  };

  const handleCreate = () => {
    onCreateTournament(tournamentData);
    onClose();
    setCurrentStep(1);
    setTournamentData({
      name: '',
      type: '',
      maxParticipants: 8,
      matchDays: [],
      description: '',
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return tournamentData.type !== '';
      case 2:
        return tournamentData.name.trim() !== '';
      case 3:
        return tournamentData.matchDays.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1C1C1E] border-gray-700 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-green-500" />
            Create Tournament
          </DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <Stepper steps={steps} currentStep={currentStep} className="mb-8" />

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Tournament Type
              </h3>
              <div className="space-y-3">
                {tournamentTypes.map((type) => (
                  <Button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    variant="outline"
                    className={`w-full p-4 h-auto justify-start ${
                      tournamentData.type === type.id
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-left">
                      <h4 className="font-semibold">{type.name}</h4>
                      <p className="text-sm opacity-80">{type.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Tournament Settings
              </h3>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Tournament Name
                  </Label>
                  <Input
                    id="name"
                    value={tournamentData.name}
                    onChange={(e) =>
                      setTournamentData({
                        ...tournamentData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter tournament name"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Maximum Participants</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {participantOptions.map((option) => (
                      <Button
                        key={option}
                        onClick={() =>
                          setTournamentData({
                            ...tournamentData,
                            maxParticipants: option,
                          })
                        }
                        variant="outline"
                        size="sm"
                        className={`${
                          tournamentData.maxParticipants === option
                            ? 'bg-green-500 text-white border-green-500'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Match Schedule
              </h3>
              <p className="text-gray-400 text-sm">
                Select the days when matches can be played
              </p>

              <div className="grid grid-cols-2 gap-2">
                {weekDays.map((day) => (
                  <Button
                    key={day}
                    onClick={() => handleMatchDayToggle(day)}
                    variant="outline"
                    size="sm"
                    className={`${
                      tournamentData.matchDays.includes(day)
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {day}
                  </Button>
                ))}
              </div>

              {tournamentData.matchDays.length > 0 && (
                <div className="mt-4">
                  <p className="text-gray-400 text-sm mb-2">Selected days:</p>
                  <div className="flex flex-wrap gap-2">
                    {tournamentData.matchDays.map((day) => (
                      <Badge
                        key={day}
                        variant="outline"
                        className="bg-green-500/20 text-green-400 border-green-500/30"
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Review & Create
              </h3>

              <div className="bg-gray-800/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white font-medium">
                    {tournamentData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white font-medium capitalize">
                    {tournamentData.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Players:</span>
                  <span className="text-white font-medium">
                    {tournamentData.maxParticipants}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Match Days:</span>
                  <span className="text-white font-medium">
                    {tournamentData.matchDays.length} days
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-green-600 hover:bg-green-500 text-white"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-500 text-white"
            >
              Create Tournament
              <Trophy className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTournamentModal;
