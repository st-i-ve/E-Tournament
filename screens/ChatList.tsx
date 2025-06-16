import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Users, Clock } from 'lucide-react-native-native';

// Mock chat list data
const mockChats = [
  {
    id: '1',
    name: 'Champions Elite League',
    lastMessage: "Perfect! I've been practicing my headers all week",
    lastMessageTime: '2:38 PM',
    unreadCount: 3,
    participants: 8,
    type: 'tournament',
  },
  {
    id: '2',
    name: 'Phoenix Strikers Team',
    lastMessage: 'Great match today everyone!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    participants: 12,
    type: 'team',
  },
  {
    id: '3',
    name: 'Summer League 2024',
    lastMessage: 'When is the next fixture?',
    lastMessageTime: '2 days ago',
    unreadCount: 1,
    participants: 16,
    type: 'tournament',
  },
];

const ChatListPage = () => {
  const navigate = useNavigate();

  const handleChatClick = (chatId: string) => {
    navigate('/chat');
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
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex-shrink-0 relative">
            <div className="absolute top-0 left-0 w-10 h-10 border-2 border-green-400 rounded-full shadow-lg shadow-green-400/20"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
              Team Chats
            </h1>
            <p className="text-sm text-gray-400">
              Stay connected with your teams
            </p>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="relative z-10 px-6 space-y-1">
        {mockChats.map((chat) => (
          <div key={chat.id}>
            <button
              onClick={() => handleChatClick(chat.id)}
              className="w-full p-4 text-left hover:bg-gray-800/30 transition-colors rounded-xl group"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 border-2 border-green-400/50 rounded-full flex items-center justify-center bg-gray-900/50">
                    <MessageCircle className="h-5 w-5 text-green-400" />
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {chat.unreadCount}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-white truncate group-hover:text-green-400 transition-colors">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {chat.lastMessageTime}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 truncate mb-1">
                    {chat.lastMessage}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    <span>{chat.participants} members</span>
                    <span className="px-2 py-0.5 bg-gray-800/50 rounded-full text-xs">
                      {chat.type}
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent my-2"></div>
          </div>
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default ChatListPage;
