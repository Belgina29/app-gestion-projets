import React from 'react'
import { FaBars, FaUserCircle, FaSearch } from 'react-icons/fa'

interface NavbarProps {
  sidebarToggle: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <nav className='bg-gray-800 px-4 py-3 flex justify-between items-center'>
      <div className='flex items-center text-xl'>
        <FaBars 
          className='text-white cursor-pointer me-4' 
          onClick={() => setSidebarToggle(!sidebarToggle)} 
        />
        <span className='text-white font-semibold'>Management-project</span>
      </div>
      <div className='flex items-center gap-x-5'>
        {/* Barre de recherche */}
        <div className='relative md:w-64 hidden md:block'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <FaSearch className='text-gray-400' />
          </span>
          <input 
            type='text' 
            className='w-full px-4 py-2 pl-10 rounded-md shadow outline-none' 
            placeholder='Search...'
          />
        </div>
        <div className='relative group'>
          <button className='text-white focus:outline-none'>
            <FaUserCircle className='w-6 h-6' />
          </button>
          <div className='absolute hidden group-focus:block bg-white rounded-lg shadow-md w-32 top-full right-0'>
            <ul className='py-2 text-sm text-gray-700'>
              <li>
                <a href='#' className='block px-4 py-2 hover:bg-gray-100'>Profile</a>
              </li>
              <li>
                <a href='#' className='block px-4 py-2 hover:bg-gray-100'>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
