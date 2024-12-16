import React from 'react'
import { FaHome, FaTasks, FaProjectDiagram } from 'react-icons/fa'

interface SidebarProps {
  sidebarToggle: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarToggle }) => {
  return (
    <div
      className={`
        ${sidebarToggle ? 'hidden' : 'block'}
        w-64 bg-gray-800 fixed h-full px-4 py-2 transition-transform duration-300 ease-in-out
      `}
    >
      <div className='py-4 text-center'>
        <h1 className='text-2xl text-white font-bold'>Admin Dashboard</h1>
      </div>
      <hr className='border-gray-600' />
      <ul className='mt-4 text-white font-semibold'>
        <li className='mb-4 rounded hover:bg-blue-500 py-2 px-3 cursor-pointer'>
          <a href='#' className='flex items-center'>
            <FaHome className='w-6 h-6 mr-3' />
            HOME
          </a>
        </li>
        <li className='mb-4 rounded hover:bg-blue-500 py-2 px-3 cursor-pointer'>
          <a href='#' className='flex items-center'>
            <FaTasks className='w-6 h-6 mr-3' />
            CATEGORIES
          </a>
        </li>
        <li className='mb-4 rounded hover:bg-blue-500 py-2 px-3 cursor-pointer'>
          <a href='#' className='flex items-center'>
            <FaProjectDiagram className='w-6 h-6 mr-3' />
            PROJECTS
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
