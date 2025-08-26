import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm.jsx'
import Home from './components/Home.jsx'
import Jobs from './components/Jobs.jsx'
import JobDetails from './components/JobItemDetails.jsx'
import NotFound from './components/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
      <Route path="/jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App