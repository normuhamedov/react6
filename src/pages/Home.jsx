import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { useLiked } from "../context/LikedContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useBasket } from "../context/BasketContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { likedProducts, setLikedProducts } = useLiked(); 
  const { basketProducts, setBasketProducts } = useBasket();


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        setError("Invalid data format received from the server");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleHeart = (product) => {
    setLikedProducts((prevLiked) => {
      const isLiked = prevLiked.some((item) => item.id === product.id);
      return isLiked ? prevLiked.filter((item) => item.id !== product.id) : [...prevLiked, product];
    });
  };

  const toggleBasket = (product) => {
    setBasketProducts((prevBasket) => {
      const isInBasket = prevBasket.some((item) => item.id === product.id);
      return isInBasket ? prevBasket.filter((item) => item.id !== product.id) : [...prevBasket, product];
    });
  };


  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-[50px]">
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Home</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative h-[400px]">
            <NavLink to={`/card/${product.id}`}>
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
              </div>
            </NavLink>
            <div className="px-5 w-full absolute flex items-center justify-between bottom-[10px]">
              <button onClick={() => toggleHeart(product)}>
                {likedProducts.some((item) => item.id === product.id) ? (
                  <Heart className="text-red-600" fill="currentColor" />
                ) : (
                  <Heart />
                )}
              </button>
              <button onClick={() => toggleBasket(product)} className="bg-yellow-500 px-5 py-2.5 rounded-md flex items-center">
                <ShoppingCart className={`mr-2 ${basketProducts.some((item) => item.id === product.id) ? "text-green-600" : ""}`} />
                {basketProducts.some((item) => item.id === product.id) ? "Added" : "Buy Now"}
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
