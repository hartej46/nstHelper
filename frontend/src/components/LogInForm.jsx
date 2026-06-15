import { useState, useEffect } from "react";
import { logIn, resendOtp as resendOtpApi } from "../service/service"; 
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/authSlice";

const LogInForm= ({ onClose,setView }) => {
    const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm();
    const dispatch = useDispatch();
    const [error, setError] = useState('');


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const onSubmit = async (userData) => {
        try {
            setError("");
            const isOtpSent = await logIn(userData);
            if (isOtpSent) {
                dispatch(fetchUser());
                onClose();
            }
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        }
    };

    const handleForgotPassword = async () => {
        setView('forgot-password');
    }


    return (
       <div className="w-full max-w-sm mx-auto">
            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                <div>
                    <input 
                        type="email" 
                        placeholder="Please enter your adypu mail id"
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
                        placeholder="Password"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('password', {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters long" }
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
                    {isSubmitting ? 'Loging In...' : 'Log In'}
                </button>
            </form>

            <button 
                className="w-full py-2 text-blue-600 hover:text-blue-700 transition-colors cursor-pointer text-sm font-medium"
                onClick={handleForgotPassword}
            > 
                ForgotPassword
            </button>
       </div>
    );
};

export default LogInForm;