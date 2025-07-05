import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signuppage'
import Loginpage from './pages/Loginpage'
import Homepage from './pages/Homepage'
import CreatePost from './pages/CreatePost'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/login' element={<Loginpage/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/createpost' element={<CreatePost/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App