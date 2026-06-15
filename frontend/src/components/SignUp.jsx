import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '../service/service';

const SignUpForm = ({ setView,setUserEmail }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (userData) => {
    try {
      setError("");
      
      const isOtpSent = await signUp(userData);
      if (isOtpSent) {
        setUserEmail(userData.email);
        setView('otp'); 
      }
      
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
        <div>
          <input
            type="text" 
            placeholder="beingSalmanKhan"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('username', { required: "Username is required" })}
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>
        <div>
          <input
            type="email" 
            placeholder="beingbhaijaan@adypu.edu.in"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('email', {
              required: "Email is required",
              validate: (value) => 
                /^[a-zA-Z0-9._%+-]+@adypu\.edu\.in$/.test(value) || 
                "Email address must strictly end with @adypu.edu.in"
            })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password" 
            placeholder="Password (Min. 8 characters)"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              }
            })}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full py-2 text-white font-semibold rounded-lg transition-colors ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
          }`}
        >
          {isSubmitting ? 'Sending OTP...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;