import React, { useState } from 'react'
import assets from '../../chat-app-assets/assets'

const Loginpage = () => {
  const [currstate,setcurrstate] = useState('sign up');
  const [name,setname] = useState("");
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const [bio,setbio] = useState("")
  const [isdatasubmitted,setisdatasubmitted] = useState(false)
  const onSubmitHandler = (event) =>{
    event.preventDefault();
    if(currstate==='sign up' && !isdatasubmitted)
    {
      setisdatasubmitted(true);
      return;
    }
  }
  
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/*-----------left--------------- */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />
      {/*--------right---------- */}
      <form 
      onSubmit={onSubmitHandler}
      className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' action="
      ">
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currstate}
          {isdatasubmitted && <img onClick={()=>setisdatasubmitted(false)}   src={assets.arrow_icon} 
          className='cursor-pointer w-5'
          alt="" />  }
          <img src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
        </h2>
        {
          currstate=== "sign up" && !isdatasubmitted && (
               <input
                  onChange={(e)=>setname(e.target.value)} value={name}
               type="text" className='p-2 border border-gray-500 rounded-md
        focus:outline-none' placeholder='Full Name' required />
          )
        }
        {
          !isdatasubmitted && (
            <>
            <input onChange={(e)=>setemail(e.target.value)} value={email}
            type="email" placeholder='give email' 
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
            focus:ring-indigo-500
            '
            required />
             <input onChange={(e)=>setpassword(e.target.value)} value={password}
            type="password" placeholder='password' 
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
            focus:ring-indigo-500
            '
            required />
            </>
          )
        }
        {
            currstate === 'sign up' && isdatasubmitted && 
        (
             <textarea 
              onChange={(e)=>
                setbio(e.target.value)} value={bio}
             rows={4} className='p-2 border border-gray-500 rounded-md 
             focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio...'  required></textarea>
        )
        }
        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600
        text-white rounded-md cursor-pointer'>
          {
            currstate === "sign up" ? "Create Account" : "Login Now"
          }
        </button>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox"  />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className='flex flex-col gap-2'>
         {
              currstate === "sign up" ? (<p className='text-sm text-gray-600'>
                Already have an account? <span
                className='font-medium text-violet-500 cursor-pointer'
                onClick={()=>{setcurrstate("Login"); setisdatasubmitted(false)}}
                >Login here</span>
              </p>
              ) : (<p className='text-sm text-gray-600'>
                    Create an account
                    <span onClick={()=>setcurrstate("sign up")}
                     className='font-medium text-violet-500 cursor-pointer'>Click here</span>
              </p>)
         }
        </div>
      </form>
    </div>
   )
  } 
export default Loginpage
