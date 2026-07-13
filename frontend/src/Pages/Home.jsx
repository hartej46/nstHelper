import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthModal from '../components/AuthModel';
import { Logo } from '../components/index';

function Home() {
  const { isLoggedin } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [modalView, setModalView] = useState('login');

  const openAuthModal = (viewType) => {
    setModalView(viewType);
    setIsOpen(true);
  };

  if (isLoggedin) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-sky-100 shadow-sm text-center">
          <h1 className="text-xl font-bold text-slate-800 leading-relaxed">
            Agyaa ladleeeee, assignment karne , aur kabhi meri yaad nahi aati tuze
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-sky-400">
      <div className="flex-1 flex items-center justify-center p-8 text-white">
        <div className="max-w-lg">
          <div className="mb-8">
            <Logo size="96px" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Hartej school of technology
          </h1>
          <p className="text-2xl md:text-3xl font-bold mt-8 text-sky-50">
            Join the coding community today.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-sm flex flex-col space-y-4">
          <h2 className="text-3xl font-black text-slate-900 mb-6">
            Master Your Craft
          </h2>
          
          <button 
            onClick={() => openAuthModal('login')}  
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-colors cursor-pointer text-center"
          >
            LogIn now
          </button>
          
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button 
            onClick={() => openAuthModal('signup')} 
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-colors cursor-pointer text-center"
          >
            Sign In now
          </button>
        </div>
      </div>

      <AuthModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        initialView={modalView} 
      />
    </div>
  );
}

export default Home;