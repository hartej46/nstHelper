import { useState } from "react";
import { logIn } from '../service/service';
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    try {
      await logIn({
        email: email,
        password: password
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="">
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            name='email'
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />

          <input 
            type="password" 
            name='password'
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
    
  );
}

export default Login;