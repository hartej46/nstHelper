import './App.css'
import MainLayout from './Pages/MainLayout';
import Home from './Pages/Home';
import {  Routes, Route,BrowserRouter,Navigate } from 'react-router-dom';
import Playground from './Pages/Playground';
import  ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/authSlice';
import QuestionPage from './Pages/QuestionPage';

function App() {
  const dispatch = useDispatch();
  const { loading, isLoggedin  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  },[dispatch])

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-white font-medium animate-pulse">
        Verifying secure session...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedin && <Route path="/" element={<Home />} />}

        <Route element={<ProtectedRoute />}>
          
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path='/question' element={<QuestionPage />}/>
          <Route path="/playground/code/:id" element={<Playground />} />
            

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
