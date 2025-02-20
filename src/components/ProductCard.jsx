import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import { useBasket } from "../context/BasketContext";
import { useLiked } from "../context/LikedContext";
import { Heart, ShoppingCart } from "lucide-react"; 

function ProductCard() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { basketProducts, setBasketProducts } = useBasket(); 
  const { likedProducts, setLikedProducts } = useLiked();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        const productData = response.data.data || response.data;
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Mahsulot ma'lumotlarini yuklashda xatolik yuz berdi");
      }
    };

    fetchProduct();
  }, [id]);

  const isInBasket = basketProducts.some((item) => item.id === product?.id);
  const isLiked = likedProducts.some((item) => item.id === product?.id);

  const toggleBasket = () => {
    setBasketProducts((prevBasket) => {
      const exists = prevBasket.some((item) => item.id === product.id);
      return exists ? prevBasket.filter((item) => item.id !== product.id) : [...prevBasket, { ...product, quantity: 1 }];
    });
  };

  const toggleLike = () => {
    setLikedProducts((prevLiked) => {
      const exists = prevLiked.some((item) => item.id === product.id);
      return exists ? prevLiked.filter((item) => item.id !== product.id) : [...prevLiked, product];
    });
  };

  if (error || !product) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-red-600 mb-4">{error || "Mahsulot topilmadi"}</div>
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          \-back to HOME page
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-6 transition duration-700 mt-10">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          \-back to HOME page
        </Link>
        <div className="bg-slate-300 rounded-2xl shadow-lg overflow-hidden flex items-center gap-10 p-10">
          <div className="w-[30%] h-[300px]">
            <img src={product.image} alt={product.name} className="w-full h-full object-scale-down" />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-xl font-semibold text-blue-600 mb-4">
              {product.price ? `$${product.price}` : "Narx ko'rsatilmagan"}
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-sm text-gray-500 mb-4">Kategoriya: {product.category}</p>
            <p
              className={`text-sm font-medium px-3 py-1 rounded-full w-fit ${
                product.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
            >
              {product.stock > 0 ? "Mavjud" : "Tugagan"}
            </p>
            <div className="flex gap-4 mt-6">
              <button onClick={toggleLike} className="p-2 rounded-full transition duration-700 hover:bg-gray-200">
                <Heart className={`${isLiked ? "text-red-600" : "text-gray-400"}`} fill={isLiked ? "currentColor" : "none"} />
              </button>

              <button
                onClick={toggleBasket}
                className={`py-2 px-4 rounded-lg transition flex items-center gap-2 justify-center  duration-500
                ${isInBasket ? "bg-gray-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                disabled={product.stock <= 0}
              >
                <ShoppingCart />
                {isInBasket ? "Added" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
