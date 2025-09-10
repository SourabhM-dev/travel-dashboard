import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Trips from './pages/Trips'
import TripDetail from './pages/TripDetail'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Auth from './pages/Auth'

export default function App(){
  return (
    <div className='min-h-screen'>
      <Navbar />
      <main className='p-6 max-w-7xl mx-auto'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/trips' element={<Trips/>} />
          <Route path='/trips/:id' element={<TripDetail/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/auth' element={<Auth/>} />
        </Routes>
      </main>
    </div>
  )
}
