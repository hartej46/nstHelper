import React, { useState, useEffect } from 'react';
import LogInForm from './LogInForm';
import SignUp from './SignUp';
import OtpForm from './OtpForm';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState(initialView);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    setView(initialView);
  }, [initialView, isOpen]);

  if (!isOpen) return null;

  const titles = {
    login: 'Welcome Back',
    signup: 'Create Account',
    otp: 'Verify Email',
  };

  const renderForm = () => {
    switch (view) {
      case 'login':
        return <LogInForm onClose={onClose} setView={setView}/>;
      case 'signup':
        return <SignUp setView={setView} setUserEmail={setUserEmail}/>;
      case 'otp':
        return <OtpForm setView={setView} onClose={onClose} userEmail={userEmail}/>;
      default:
        return <LogInForm onClose={onClose} setView={setView} />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {titles[view]}
        </h2>
        <div>
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;