import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home'
import Expense from './pages/Dashboard/Expense'
import Income from './pages/Dashboard/Income'
import UserProvider from './context/userContext';
import ProtectedRoute from './components/ProtectedRoute';
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
        toastOptions={{
          className: "",
          style: {
            fontSize: "15px",
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
