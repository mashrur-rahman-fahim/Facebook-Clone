import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DashboardPage } from './pages/DashboardPage'
import { TestPage } from './pages/TestPage'

export const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/test" element={<TestPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}
