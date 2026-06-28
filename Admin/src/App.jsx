import React from 'react'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
    <Toaster />
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>
    </>
  )
}

export default App