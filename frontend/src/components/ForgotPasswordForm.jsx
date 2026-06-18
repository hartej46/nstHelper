import React, { useState } from 'react';
import { forgot } from "../service/service"; 

const ForgotPasswordForm = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      await forgot({ email });
      setSuccessMessage("Reset otp sent successfully! Redirecting...");
      setTimeout(() => {
        setView('otp');
      }, 3000);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg text-center font-medium border border-red-200">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-3 text-sm text-green-700 bg-green-50 rounded-lg text-center font-medium border border-green-200">
          {successMessage}
        </div>
      )}

      <p className="text-sm text-gray-500">
        Enter your email and we'll send you otp to reset your password.
      </p>

      <div className="flex flex-col space-y-1.5">
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required 
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow-md cursor-pointer transition-colors text-center"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <span 
        onClick={() => !loading && setView('login')} 
        className="block text-center text-sm text-blue-600 hover:underline cursor-pointer mt-2"
      >
        Back to Login
      </span>
    </form>
  );
};

export default ForgotPasswordForm;