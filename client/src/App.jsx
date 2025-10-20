import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage'
import Profilepage from './pages/Profilepage'
import {Toaster} from 'react-hot-toast';
const App = () => {
  return (
    <div className="bg-[url('../chat-app-assets/bgImage.svg')] bg-contain">
      <Toaster />
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/login' element={<Loginpage/>}></Route>
        <Route path='/profile' element={<Profilepage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
