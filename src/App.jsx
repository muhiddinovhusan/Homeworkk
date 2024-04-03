import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import RequireAuth from './components/RequireAuth'
import Login from './Login'
import Profile from './components/Profile'
import AuthProvider from './components/AuthProvider'
import { GlobalProvider } from './components/Students/stateManagment'
import Students from './components/Students/Students'
import Sidebar from './Sidebar'
import { GlobalProvider2 } from './components/Teachers/teachStateManagment'
import Teachers from './components/Teachers/Teachers'

const App = () => {

  return (
    <BrowserRouter>
        <AuthProvider>
      <GlobalProvider>
          {/* <Sidebar/> */}
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
      </GlobalProvider>
      <GlobalProvider2>
<Routes>

        <Route path='/teachers' element={
          <RequireAuth>

            <Teachers/>
          </RequireAuth>
        
      }/>

      </Routes>
      
      </GlobalProvider2>
        </AuthProvider>

    </BrowserRouter>


  )
}

export default App