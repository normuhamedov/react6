import { Link } from 'react-router'
import { Search, ShoppingCart, Heart, User, Globe, Library } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { language, toggleLanguage } = useLanguage()

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">asaxiy</Link>
          
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 rounded-md text-gray-900"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-blue-700 rounded-r-md">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/about" className='flex gap-2'>
            <Library />
            <p>about</p>
            </Link>
            <button onClick={toggleLanguage} className="flex items-center gap-1">
              <Globe className="h-5 w-5" />
              <span>{language.toUpperCase()}</span>
            </button>
            
            <Link to="/favorites" className="flex items-center gap-1">
              <Heart className="h-5 w-5" />
            </Link>

            <Link to="/cart" className="flex items-center gap-1">
              <ShoppingCart className="h-5 w-5" />
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/admin" className="flex items-center gap-1">
                  <User className="h-5 w-5" />
                  <span>Admin</span>
                </Link>
                <button onClick={logout} className="text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1">
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar