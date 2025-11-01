import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import Chatcontainer from '../components/Chatcontainer';
import RightSidebar from '../components/RightSidebar';
const Homepage = () => {
  const [suser,setsuser] = useState(false);
  return (
    <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
      <div className={`backdrop-blur-xl border-2 border-gray-600 
      rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${suser?
      'md:grid-cols-[1fr_1.5fr_1fr] xl: grid-cols-[1fr_2fr_1fr]'
      :'md:grid-cols-2'}`}>
        <Sidebar /> 
        <Chatcontainer suser={suser} setsuser={setsuser}/>
        <RightSidebar suser={suser} setsuser={setsuser}/>
      </div>
    </div>
  )
}

export default Homepage
