import React from 'react';
import { Moon, Sun, Volume2, VolumeX, Bell, BellOff } from 'lucide-react';

type SettingsDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({ isOpen, onClose }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = React.useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="absolute top-20 right-4 w-64 glass rounded-xl shadow-lg z-50 py-2">
        <div className="px-4 py-2 text-sm text-gray-400">Quick Settings</div>
        
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-400/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
            <span>Dark Mode</span>
          </div>
          <div className={`w-10 h-6 rounded-full relative ${isDarkMode ? 'bg-blue-400' : 'bg-gray-600'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
              isDarkMode ? 'left-5' : 'left-1'
            }`} />
          </div>
        </button>

        <button
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-400/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            {isSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span>Sound Effects</span>
          </div>
          <div className={`w-10 h-6 rounded-full relative ${isSoundEnabled ? 'bg-blue-400' : 'bg-gray-600'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
              isSoundEnabled ? 'left-5' : 'left-1'
            }`} />
          </div>
        </button>

        <button
          onClick={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-400/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            {isNotificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
            <span>Notifications</span>
          </div>
          <div className={`w-10 h-6 rounded-full relative ${isNotificationsEnabled ? 'bg-blue-400' : 'bg-gray-600'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
              isNotificationsEnabled ? 'left-5' : 'left-1'
            }`} />
          </div>
        </button>
      </div>
    </>
  );
};

export default SettingsDropdown;