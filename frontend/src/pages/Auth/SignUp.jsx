import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext)

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageURL="";

    if(!fullName){
      setError("You're....Nameless?");
      return
    }

    if(!validateEmail(email)){
      setError("No Email? in this era? BOOMER");
      return
    }

    if(!password){
      setError("Oh so 0 security? Got it your account is now the most vulenrable");
      return
    }

    setError("");

    //backend calls

    try{
        //upload Image if present
        if(profilePic){
          const imageUploadRes = await uploadImage(profilePic);
          profileImageURL = imageUploadRes.imageUrl || "";
        }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName, 
        email,
        password,
        profileImageURL 
      });

      const { token, user} = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate('/dashboard');
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        console.log(error)
        setError('Something went wrong. Please try again later');
      }
    }
  }
  return (
    <AuthLayout>
      <div className='lg:w-[70dvw] h-auto md:h-full flex flex-col justify-center'>
        <h3 className='font-bold text-3xl pt-20'>Create An account</h3>
        <p className='italic text-sm py-4'>Enter your details below and sell yourself to yet another corporate</p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label='Full Name'
              placeholder={"John Doe"}
              type={'text'}
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email'
              placeholder={"John@example.com"}
              type={'text'}
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label='Password'
                placeholder={"Min 8 characters"}
                type={'password'}
              />
            </div>

            
          </div>
          {error && <p className='text-red-700 font-light text-[12px]'>{error}</p>}

            <button type="submit" className='btn-primary col-span-2'>
              Create Account
            </button>
            <p className='text-[13px] text-slate-600 mt-3'>Old User?
              <Link to='/login' className='text-primary underline'>
                Log In
              </Link>
            </p>
        </form>



      </div>
    </AuthLayout>
  )
}

export default SignUp
