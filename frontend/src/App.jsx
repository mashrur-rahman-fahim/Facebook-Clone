import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { TestPage } from './pages/TestPage';
import { FindAccPage } from './pages/FindAccPage';
import { RecoverCodePage } from './pages/RecoverCodePage';
import { ResetPassPage } from './pages/ResetPassPage';
import { NavbarPage } from './pages/NavbarPage';
import { FriendsPage } from './pages/FriendsPage';
import { LogInPage2 } from './pages/LogInPage';


const AppWrapper = () => {
  const location = useLocation();

  // Define routes where the navbar should NOT appear
  const noNavbarRoutes = ['/login/identity', '/recover/code/:email', '/reset-password/:email/:code','/','/testlog1'];

  // Check if the current route is in the noNavbarRoutes array
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <NavbarPage />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/testlog1' element={<LogInPage2 />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/login/identity" element={<FindAccPage />} />
        <Route path="/recover/code/:email" element={<RecoverCodePage />} />
        <Route path="/reset-password/:email/:code" element={<ResetPassPage />} />
        <Route path='/friends' element={<FriendsPage />} />
        
      </Routes>
    </>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
};