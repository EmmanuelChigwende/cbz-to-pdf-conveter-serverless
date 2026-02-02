import React from 'react'
import { Route,Routes } from 'react-router-dom'

import Home from './Page/Home'

const App = () => {
  return (
    <div className='h-[100vh] w-[100vw] bg-[#F2F3F4]'>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
