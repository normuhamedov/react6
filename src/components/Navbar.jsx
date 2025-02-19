import { Link, useNavigate } from 'react-router'
import { Search, ShoppingCart, Heart, User, Globe, Library } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useLiked } from '../context/LikedContext'
import { useBasket } from "../context/BasketContext";


const Navbar = () => {
  const { user, logout } = useAuth()
  const { language, toggleLanguage } = useLanguage()
  const { basketProducts } = useBasket();


  const { likedProducts } = useLiked();
  const navigate = useNavigate();
  return (
    <header className="bg-blue-600 text-white fixed w-full z-50">
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

          <div className="flex items-center gap-8 ">
            <Link to="/about" className='flex gap-2'>
              <Library />
              <p>about</p>
            </Link>
            <button onClick={toggleLanguage} className="flex items-center gap-1">
              <Globe className="h-5 w-5" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={() => navigate("/heart")}
              className="flex items-center text-white relative"
            >
              <Heart fill={likedProducts.length > 0 ? "red" : "none"} className={`${likedProducts.length > 0 ? "w-[30px] h-[30px]" : "scale-100"} transition-transform duration-500`}
              />
              <span className=' absolute w-2 h-2 rounded-[50%] flex items-center justify-center text-[15px] top-[9.5px] left-[10.5px]'>{likedProducts.length > 0 ? likedProducts.length : ""}</span>
            </button>

            <button
              onClick={() => navigate("/basket")}
              className="flex items-center text-black relative"
            >
              <ShoppingCart fill={basketProducts.length > 0 ? "yellow" : "none"} className={`${basketProducts.length > 0 ? "w-[30px] h-[30px] " : "scale-100"} transition-transform duration-500 text-white`} />
              <span className=' absolute w-2 h-2 rounded-[50%] flex items-center justify-center text-[15px] top-[9.5px] left-[12px]'>{basketProducts.length > 0 ? basketProducts.length : ""}</span>
            </button>


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