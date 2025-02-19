import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import axios from "axios"

function ProductCard() {
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const { id } = useParams()
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`)
        const productData = response.data.data || response.data
        setProduct(productData)
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Mahsulot ma'lumotlarini yuklashda xatolik yuz berdi")
      }
    }

    fetchProduct()
  }, [])



  if (error || !product) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-red-600 mb-4">{error || "Mahsulot topilmadi"}</div>
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        \-back to HOME page
      </Link>
      </div>
    )
  }

  return (
    <>
    <div className='bg-slate-600 p-5'><h2 className="text-2xl font-bold mb-6 text-center text-blue-300">ABOUT page</h2></div>
    <div className="container mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        \-back to HOME page
      </Link>
      <div className="bg-slate-300 rounded-2xl shadow-lg overflow-hidden flex items-center gap-10 p-10">
        <div className="w-[30%] h-[300px] ">
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
          <button
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg transition hover:bg-blue-700 flex items-center gap-2 justify-center"
            disabled={product.stock <= 0}
          >
            Add to card
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductCard

