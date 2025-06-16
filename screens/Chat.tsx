
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock chat data
const mockMessages = [
  {
    id: '1',
    text: 'Hey everyone! Ready for tonight\'s match?',
    sender: 'Phoenix_Rising',
    timestamp: '2:30 PM',
    isUser: false
  },
  {
    id: '2',
    text: 'Absolutely! Let\'s dominate the field 🔥',
    sender: 'You',
    timestamp: '2:32 PM',
    isUser: true
  },
  {
    id: '3',
    text: 'What formation are we running today?',
    sender: 'Lightning_Striker',
    timestamp: '2:35 PM',
    isUser: false
  },
  {
    id: '4',
    text: 'Coach mentioned 4-3-3, aggressive attacking',
    sender: 'You',
    timestamp: '2:36 PM',
    isUser: true
  },
  {
    id: '5',
    text: 'Perfect! I\'ve been practicing my headers all week',
    sender: 'Desert_Eagle',
    timestamp: '2:38 PM',
    isUser: false
  }
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
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
            onClick={() => navigate('/')}
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-800/50 text-green-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 flex-shrink-0 relative">
            {/* Single circle with glow */}
            <div className="absolute top-0 left-0 w-8 h-8 border-2 border-green-400 rounded-full shadow-lg shadow-green-400/20"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent leading-tight">
              Tournament Chat
            </h1>
            <p className="text-xs text-gray-500 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2s_ease-in-out_infinite]">
              Champions Elite League
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto relative z-10">
        {mockMessages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.isUser ? 'bg-green-600/20 border-green-500/30' : 'bg-gray-800/40 border-gray-700/30'} rounded-2xl px-4 py-3 border backdrop-blur-sm`}>
              {!message.isUser && (
                <div className="text-xs text-green-400 mb-1 font-medium">
                  {message.sender}
                </div>
              )}
              <div className="text-white text-sm mb-1">
                {message.text}
              </div>
              <div className="text-xs text-gray-500">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input wrapper with semicircle design */}
      <div className="p-4 relative z-10">
        <div className="bg-gray-800/20 border border-gray-700/30 rounded-full p-1 backdrop-blur-sm flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800/40 border border-gray-700/30 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 text-sm"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full h-12 w-12 flex items-center justify-center transition-colors"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default ChatPage;
