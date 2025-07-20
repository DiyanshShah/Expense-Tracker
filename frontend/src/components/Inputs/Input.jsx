import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Input = ({value, onChange, type, label, placeholder}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return (
    <div>
        <label className='text-{13px}'>{label}</label>
        <div className='input-box'>
            <input type={type === 'password'? showPassword? 'text': 'password' : type}
            placeholder={placeholder}
            className='w-full bg-transparent outline-none'
            value={value}
            onChange={(e) => {onChange(e)}} 
            />

            {type === 'password' && (
                <>
                    {showPassword ?(
                        <FaRegEye
                            size={20}
                            className='text-primary cursor-pointer'
                            onClick={() => toggleShowPassword()}
                        />
                    ):(
                        <FaRegEyeSlash
                            size={20}
                            className='text-slate-400 cursor-pointer'
                            onClick={() => toggleShowPassword()}
                        />
                    )}
                </>
            )}
        </div>
    </div>
  )
}

export default Input
