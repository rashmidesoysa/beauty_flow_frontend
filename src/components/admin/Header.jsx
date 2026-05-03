import { useState, useRef, useEffect } from 'react'
import { FaBars, FaBell, FaUserCircle, FaSignOutAlt, FaUser, FaCog, FaChevronDown } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <header className="bg-gradient-to-r from-pink-600 to-purple-600 shadow-lg px-4 py-3 flex justify-between items-center">
      <button 
        onClick={toggleSidebar}
        className="md:hidden text-white hover:text-pink-200 transition-colors"
      >
        <FaBars size={24} />
      </button>
      
      <div className="hidden md:block">
        <h2 className="text-white font-semibold text-lg">
          Welcome back, {user?.name || 'Admin'}
        </h2>
        <p className="text-pink-100 text-xs">Manage your beauty business</p>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative text-white hover:text-pink-200">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-white hover:text-pink-200 transition-colors"
          >
            <FaUserCircle size={28} />
            <span className="hidden md:inline font-medium">{user?.name || 'Admin'}</span>
            <FaChevronDown size={12} className="hidden md:block" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b">
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <FaUser size={14} />
                  <span>Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <FaCog size={14} />
                  <span>Settings</span>
                </button>
                <div className="border-t my-1"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3"
                >
                  <FaSignOutAlt size={14} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}