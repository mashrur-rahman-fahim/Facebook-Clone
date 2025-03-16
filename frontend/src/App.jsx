import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DashboardPage } from './pages/DashboardPage'
import { TestPage } from './pages/TestPage'
import { FindAccPage } from './pages/FindAccPage'
import { RecoverCodePage } from './pages/RecoverCodePage'
import { ResetPassPage } from './pages/ResetPassPage'

export const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/test" element={<TestPage/>}/>
      <Route path="/login/identity" element={<FindAccPage/>}/>
      <Route path="/recover/code/:email" element={<RecoverCodePage/>}/>
      <Route path="/reset-password/:email/:code" element={<ResetPassPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}
