import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, HelpCircle, Mail, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type MenuDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MenuDropdown: React.FC<MenuDropdownProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    {
      icon: <User size={18} />,
      label: 'Profile',
      onClick: () => navigate('/profile')
    },
    {
      icon: <Settings size={18} />,
      label: 'Settings',
      onClick: () => navigate('/settings')
    },
    {
      icon: <HelpCircle size={18} />,
      label: 'Help Center',
      onClick: () => window.open('/help', '_blank')
    },
    {
      icon: <Mail size={18} />,
      label: 'Contact Support',
      onClick: () => window.open('mailto:support@mantis.com')
    },
    {
      icon: <Shield size={18} />,
      label: 'Privacy Policy',
      onClick: () => window.open('/privacy', '_blank')
    },
    {
      icon: <LogOut size={18} />,
      label: 'Logout',
      onClick: handleLogout,
      className: 'text-red-400 hover:text-red-300'
    }
  ];

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="absolute top-20 right-4 w-64 glass rounded-xl shadow-lg z-50 py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-400/10 transition-colors ${
              item.className || 'text-gray-200 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default MenuDropdown;