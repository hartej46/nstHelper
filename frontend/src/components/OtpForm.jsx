import React, { useState, useEffect } from 'react';
import { verify, resendOtp as resendOtpApi } from "../service/service"; 
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store/authSlice';

const OtpForm = ({ setView, onClose, userEmail}) => {

  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);


  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      dispatch(fetchUser());
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const verificationPayload = { email: userEmail, otpCode: otp };
      await verify(verificationPayload);

      onClose();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    
    setError('');
    setSuccessMessage('');
    try {
      await resendOtpApi({ email: userEmail });
      setSuccessMessage("A fresh code has been sent to your email!");
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      setError(err);
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

      <p className="text-sm text-gray-500 text-center leading-relaxed">
        We've sent a 6-digit verification code to your college email address.
      </p>

      <div className="flex flex-col space-y-1.5">
        <label className="text-sm font-medium text-gray-700 text-center">
          Enter OTP
        </label>
        <input 
          type="text" 
          maxLength="6" 
          placeholder="000000"
          value={otp} 
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-center tracking-widest font-bold text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300 transition-all" 
          required 
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-lg shadow-md transition-colors cursor-pointer text-center"
      >
        {loading ? "Verifying..." : "Verify Account"}
      </button>

      <div className="text-center text-sm pt-2">
        <span className="text-gray-500">Didn't receive the email? </span>
        {canResend ? (
          <button 
            type="button"
            onClick={handleResendOtp}
            className="text-blue-600 font-semibold hover:underline cursor-pointer bg-none border-none outline-none"
          >
            Resend Code
          </button>
        ) : (
          <span className="text-gray-400 font-medium">
            Resend in {timer}s
          </span>
        )}
      </div>
    </form>
  );
};

export default OtpForm;