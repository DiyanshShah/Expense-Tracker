import React, { useState } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

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


  }
  
  
  return (
    <div>
      <AuthLayout>
        <div className='lg:w-[70dvw] h-3/4 md:h-full flex flex-col justify-center'>
          <h3 className='font-bold text-3xl pt-20'>Welcome Back</h3>
          <p className='italic text-sm py-4'>You already know what to do please don't expect a user Friendly text like "please enter your details below"</p>
        
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
