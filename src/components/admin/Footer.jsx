import { FaHeart } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-500">
        <p>
          &copy; {currentYear} Beauty Flow. All rights reserved.
        </p>
        <p className="flex items-center gap-1">
          Made with <FaHeart className="text-red-500" size={12} /> for cosmetic business
        </p>
        <p>
          Admin Dashboard v1.0
        </p>
      </div>
    </footer>
  )
}