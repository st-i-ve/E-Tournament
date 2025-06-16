
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login attempt`);
    
    const userData = {
      id: '1',
      username: `${provider.toLowerCase()}_user`,
      email: `user@${provider.toLowerCase()}.com`,
      teamName: '',
      teamColor: ''
    };
    
    login(userData);
    navigate('/team-selection');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <style>
        {`
          @keyframes move1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          
          @keyframes move2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-25px, -25px) scale(1.2); }
          }
          
          @keyframes move3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(25px, 25px) scale(0.8); }
            75% { transform: translate(-30px, 10px) scale(1.1); }
          }
        `}
      </style>

      {/* Shape Blur Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/40 to-purple-600/40 rounded-full blur-3xl"
          style={{ animation: 'move1 15s ease-in-out infinite' }}
        ></div>
        <div 
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          style={{ animation: 'move2 20s ease-in-out infinite' }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/35 to-blue-500/35 rounded-full blur-3xl"
          style={{ animation: 'move3 18s ease-in-out infinite' }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm space-y-8 text-center">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="text-gray-400">Sign in to continue</p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => handleSocialLogin('Google')}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 flex items-center gap-3 h-14 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent font-semibold bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]">
              Continue with Google
            </span>
          </Button>
          
          <Button
            onClick={() => handleSocialLogin('Facebook')}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 flex items-center gap-3 h-14 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent font-semibold bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]">
              Continue with Facebook
            </span>
          </Button>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/signup')}
            className="text-white/70 hover:text-white font-medium transition-colors"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
