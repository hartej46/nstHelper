import './App.css'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './store/authSlice'
import Login from './components/Login'
import AdminLayout from './components/AdminLayout/AdminLayout'
import HomePage from './components/HomePage/HomePage'
import InputCodingQuestion from './components/InputCodingQuestion'

function App() {
  const dispatch = useDispatch()
  const { isLoggedin, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isLoggedin ? <Navigate to="/" replace /> : <Login />}
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route path="/exam" element={<Navigate to="/exam/add" replace />} />
            <Route path="/exam/add" element={<div className="section-placeholder"><h2>Add Exam</h2></div>} />
            <Route path="/exam/delete" element={<div className="section-placeholder"><h2>Delete Exam</h2></div>} />
            <Route path="/exam/update" element={<div className="section-placeholder"><h2>Update Exam</h2></div>} />

            <Route path="/mcq" element={<Navigate to="/mcq/add" replace />} />
            <Route path="/mcq/add" element={<div className="section-placeholder"><h2>Add MCQ</h2></div>} />
            <Route path="/mcq/delete" element={<div className="section-placeholder"><h2>Delete MCQ</h2></div>} />
            <Route path="/mcq/update" element={<div className="section-placeholder"><h2>Update MCQ</h2></div>} />

            <Route path="/coding-question" element={<Navigate to="/coding-question/add" replace />} />
            <Route path="/coding-question/add" element={<InputCodingQuestion />} />
            <Route path="/coding-question/delete" element={<div className="section-placeholder"><h2>Delete Coding Question</h2></div>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={isLoggedin ? '/' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App