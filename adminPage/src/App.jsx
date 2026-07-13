import './App.css'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/authSlice';
import Login from './components/Login';
import Input from './components/Input';

function App() {
  const dispatch = useDispatch();
  const { isLoggedin, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={isLoggedin ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Input />} />
        </Route>
        <Route path="*" element={<Navigate to={isLoggedin ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;