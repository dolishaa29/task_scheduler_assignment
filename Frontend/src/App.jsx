import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import Changepass from './pages/Changepass'
import Dash from './pages/Dash'

function App() {

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/userprofile' element={<UserProfile/>}/>
      <Route path='/changepassword' element={<Changepass/>}/>
      <Route path='/dash' element={<Dash/>}/>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
