import './App.css'
import Sidebar from './components/sidebar'
import Dashboard from './components/dashboard'
import { useState } from 'react'

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false)

  return (
    <div className='flex'>
      <Sidebar sidebarToggle={sidebarToggle} />
      <Dashboard 
        sidebarToggle={sidebarToggle} 
        setSidebarToggle={setSidebarToggle} 
      />
    </div>
  )
}

export default App
