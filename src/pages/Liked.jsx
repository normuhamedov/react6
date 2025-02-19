import { useLiked } from "../context/LikedContext";
import { NavLink } from "react-router";
import { Heart, HeartOff } from "lucide-react";

const Liked = () => {
  const { likedProducts } = useLiked(); // ✅ Contextdan olib ishlatyapmiz

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-5">
        <Heart fill="red" className="text-red-600" /> Yoqtirilgan Mahsulotlar
      </h2>

      {likedProducts.length === 0 ? (
        <div className="text-gray-500 text-center">
          <HeartOff className="mx-auto mb-2 text-gray-400" size={40} />
          Hech narsa yoqdirilmagan
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden h-[400px]">
              <NavLink to={`/card/${product.id}`}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  <span className="text-blue-600 font-bold">${product.price?.toFixed(2)}</span>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Liked;
