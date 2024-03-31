import React from 'react'
import Students from './components/Students'
import { GlobalProvider } from './components/stateManagment'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import RequireAuth from './components/RequireAuth'
import Login from './Login'
import Profile from './components/Profile'
import AuthProvider from './components/AuthProvider'

const App = () => {

  return (
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <Header />

          <Routes>
            <Route path="/" element={
              <RequireAuth>
                <Students />
              </RequireAuth>
            }>

            </Route>
            <Route path="/login" element={
            
            <Login />
            
            } />
            <Route path='/profile' element={
            
            <RequireAuth>

              <Profile />
            </RequireAuth>
            
            
            } />
          </Routes>
        </AuthProvider>
      </GlobalProvider>

    </BrowserRouter>


  )
}

export default App