import React from 'react'
import Students from './components/Students'
import { GlobalProvider } from './components/stateManagment'
import AddStudent from './components/AddStudent'
import './App.css'

const App = () => {

  return (
<GlobalProvider>


<Students/>

</GlobalProvider>

 
  )
}

export default App