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
    <div 
      className="min-h-screen w-full flex flex-col md:flex-row bg-[#fafafa] text-slate-900 antialiased font-sans"
      style={{
        backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`,
        backgroundSize: '24px 24px'
      }}
    >
      
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-md w-full space-y-6">
          <div className="inline-block">
            <Logo size="56px" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black border-b-2 border-black pb-4 inline-block">
              Hartej school of technology
            </h1>
            <p className="text-base text-slate-500 tracking-wide uppercase font-semibold">
              Join the coding community today.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-sm bg-white p-8 border border-slate-200 shadow-sm flex flex-col space-y-6">
          <div>
            <h2 className="text-xl font-bold text-black uppercase tracking-wider">
              Master Your Craft
            </h2>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => openAuthModal('login')}  
              className="w-full py-3 bg-black hover:bg-slate-800 text-white font-medium tracking-wide transition-colors cursor-pointer text-center text-sm uppercase"
            >
              Log In now
            </button>
            
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <button 
              onClick={() => openAuthModal('signup')} 
              className="w-full py-3 bg-white hover:bg-slate-50 text-black font-medium tracking-wide transition-colors border border-black cursor-pointer text-center text-sm uppercase"
            >
              Sign Up now
            </button>
          </div>
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