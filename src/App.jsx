import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import { Navbar } from './components/Navbar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();

  const locationHandler = (location) => {
    switch(location.pathname){
      case '/':
      case '/home':
          document.body.classList.remove('shop-banner-bags')
          document.body.classList.add('shop-banner-home')
          break;
      case '/shop':
          document.body.classList.remove('shop-banner-home')
          document.body.classList.add('shop-banner-bags')
          break;
    }
  }
  useEffect(() => {
    locationHandler(location)
  }, [location])

  return (
    <>
      <Navbar />
      {location.pathname == '/' ? <Navigate to="/home"/> : ''}
      <Outlet />
    </>
  )
}

export default App
