import React, { useState, useEffect, useContext } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate();
  const handleLogin =  async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError('Please enter a valid email address');
      return;
    }

    if(!password){
      setError('How do you expect to log in without a password?');
      return;
    }

    setError('');

    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email, 
        password,
      });
      const {token, user} = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate('/dashboard')
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong.")
      }
    }
  }
  
  
  return (
    <div>
      <AuthLayout>
        <div className='lg:w-[70dvw] h-3/4 md:h-full flex flex-col justify-center'>
          <h3 className='font-bold text-3xl pt-20'>Welcome Back</h3>
          <p className='italic text-sm py-4'>You already know what to do please don't expect any help from me</p>
        
          <form onSubmit={handleLogin}>
            <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              label='Email Address'
              placeholder='john@example.com'
            />
            <Input 
              value = {password}
              onChange={ (e) => setPassword(e.target.value)}
              type='password'
              label='Password'
              placeholder='Min 8 characters'
            />

            {error && <p className='text-red-700 font-light text-[12px]'>{error}</p>}

            <button type="submit" className='btn-primary'>
              Log In
            </button>
            <p className='text-[13px] text-slate-600 mt-3'>New User? 
              <Link to='/signup' className='text-primary underline'>
                Sign Up
              </Link>
            </p>
          </form>
        
        </div>
      </AuthLayout>
    </div>
  )
}

export default Login
