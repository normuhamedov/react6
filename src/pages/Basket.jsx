import { NavLink } from "react-router";
import { ShoppingCart, XCircle, Plus, Minus } from "lucide-react";
import { useBasket } from "../context/BasketContext";

const Basket = () => {
  const { basketProducts, setBasketProducts } = useBasket();

  const removeFromBasket = (productId) => {
    setBasketProducts((prevBasket) => prevBasket.filter((item) => item.id !== productId));
  };

  const plusQuan = (productId) => {
    setBasketProducts((prevBasket) =>
      prevBasket.map((item) =>
        item.id === productId ? { ...item, leng: (item.leng || 1) + 1 } : item
      )
    );
  };

  const minusQuan = (productId) => {
    setBasketProducts((prevBasket) =>
      prevBasket.map((item) =>
        item.id === productId && item.leng > 1 ? { ...item, leng: item.leng - 1 } : item
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-5">
        <ShoppingCart className="text-blue-600" /> Savatcha
      </h2>

      {basketProducts.length === 0 ? (
        <div className="text-gray-500 text-center">
          <XCircle className="mx-auto mb-2 text-gray-400" size={40} />
          Savatcha bo'sh
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {basketProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden h-[450px] relative p-4">
              <NavLink to={`/card/${product.id}`}>
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
                <div className="py-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  <span className="text-blue-600 font-bold">${(product.price * (product.leng || 1)).toFixed(2)}</span>
                </div>
              </NavLink>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => minusQuan(product.id)}
                  className={`bg-gray-200 p-2 rounded-md ${product.leng === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={product.leng === 1}
                >
                  <Minus />
                </button>
                <span className="text-lg font-semibold">{product.leng || 1}</span>
                <button onClick={() => plusQuan(product.id)} className="bg-gray-200 p-2 rounded-md">
                  <Plus />
                </button>
              </div>
              <button
                onClick={() => removeFromBasket(product.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              >
                <XCircle />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Basket;
