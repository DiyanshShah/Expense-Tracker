import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home'
import Expense from './pages/Dashboard/Expense'
import Income from './pages/Dashboard/Income'
import UserProvider from './context/userContext';
import ProtectedRoute from './components/ProtectedRoute';
import { LuCircleCheck, LuTriangleAlert, LuLoader } from 'react-icons/lu';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route 
              path='/dashboard' 
              element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/income' 
              element={
                <ProtectedRoute>
                  <Income/>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/expense' 
              element={
                <ProtectedRoute>
                  <Expense/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Define default options
          className: '',
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#363636',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '16px',
          },

          // Define specific options for different toast types
          success: {
            duration: 3000,
            icon: <LuCircleCheck size={24} className="text-green-500" />,
            style: {
              background: '#F0FFF4', // A light green background
              color: '#2F855A',      // Dark green text
              border: '1px solid #9AE6B4',
            },
          },

          error: {
            duration: 3000,
            icon: <LuTriangleAlert size={24} className="text-red-500" />,
            style: {
              background: '#FFF5F5', // A light red background
              color: '#C53030',      // Dark red text
              border: '1px solid #FEB2B2',
            },
          },
          
          loading: {
            icon: <LuLoader size={24} className="animate-spin text-blue-500" />,
            style: {
              background: '#EBF8FF', // A light blue background
              color: '#2B6CB0',      // Dark blue text
              border: '1px solid #90CDF4',
            }
          },
        }}
      />
    </UserProvider>
  )
}

export default App


const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Navigate to={'/dashboard'}/>
  ):(
    <Navigate to={'/login'}/>
  )
}
