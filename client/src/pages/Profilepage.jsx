import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom' 
import assets from '../../chat-app-assets/assets';
import { AuthContext } from '../../context/Authcontext';
const Profilepage = () => {
 
 const {authUser, updateProfile} = useContext(AuthContext);
  const [image,setimage] = useState(null);
  const navigate = useNavigate();
  const [name,setname] = useState(authUser.fullName);
  const [bio,setbio] = useState(authUser.bio)
  const handleSubmit = async (e)=>{
     e.preventDefault();
     if(!image)
     {
          await updateProfile({fullName: name,bio})
          navigate('/');
          return;
     }
     const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () =>{
        const base64Image = reader.result;
        await updateProfile({profilePic: base64Image,fullName:name,bio});
        navigate('/');
      }

  }
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
       <div className='
       w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg 
       '>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'  action="">
          <h3 className='text-lg '>Profile Details</h3>
          <label htmlFor="avtar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="avtar" accept=".png, .jpg, .jpeg" hidden />
            <img src={image ? URL.createObjectURL(image): assets.avatar_icon} className={
              `w-12 h-12 ${image && 'rounded-full'}`
            } alt="" />
            upload profile image
          </label>
          <input onChange={(e)=>setname(e.target.value)} value={name}
          type="text" required placeholder='your name' className='
          p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
          focus:ring-violet-500
          '/>
          <textarea onChange={(e)=>setbio(e.target.value)} value={bio} placeholder='Write profile bio' required className='
          p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
          focus:ring-violet-500
          ' rows={4}></textarea>
          
          <button tupe="submit" 
          className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'
          >Save</button>
        </form>
        <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10  ${image && 'rounded-full'}`} src={authUser?.profilePic || assets.logo_icon} alt="" />
       </div>
      
    </div>
  )
}

export default Profilepage
