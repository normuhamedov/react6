import { useState, useEffect } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { toast } from 'react-toastify'
import { useLanguage } from '../context/LanguageContext'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { toggleLanguage } = useLanguage();
  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
      toast('Welcome to asaxiy !', { style: { marginTop: '50px' } , autoClose: 2000 });
    }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products')
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data)
      } else {
        setError('Invalid data format received from the server')
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to fetch products: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <button onClick={toggleLanguage}>change</button>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="mb-8 rounded-lg overflow-hidden"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <img src={product.image || "/placeholder.svg?height=400&width=1200"} alt={product.name} className="w-full h-[400px] object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      <h2 className="text-2xl font-bold mb-6">Home</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image || "/placeholder.svg?height=200&width=200"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
