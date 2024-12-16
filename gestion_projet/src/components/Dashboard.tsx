import React from 'react'
import Navbar from './navbar'
import { motion } from 'framer-motion' 
interface DashboardProps {
  sidebarToggle: boolean
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Dashboard: React.FC<DashboardProps> = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? '' : 'ml-64'} w-full`}>
      <Navbar 
        sidebarToggle={sidebarToggle} 
        setSidebarToggle={setSidebarToggle} 
      />
      <div className="flex items-center justify-center h-screen">
        <motion.h2
          className="text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{
            duration: 1,   
            ease: "easeOut", 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          Welcome to the Dashboard
        </motion.h2>
      </div>
    </div>
  )
}

export default Dashboard
