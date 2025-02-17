import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Admin = () => {
  const { user } = useAuth()
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stock: '',
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  useEffect(() => {
    toast('Welcome to Admin!', { style: { marginTop: '50px' } , autoClose: 3000 });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        toast.error('No access token found. Please log in again.', {style: { marginTop: '50px' } })
        setLoading(false)
        return
      }
      
      const formData = new FormData()
      formData.append('name', product.name)
      formData.append('category', product.category)
      formData.append('price', product.price)
      formData.append('description', product.description)
      formData.append('stock', product.stock)
      if (image) {
        formData.append('image', image)
      }
      
      await axios.post('http://localhost:5000/products', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      
      toast.success('Product added successfully' , {style: { marginTop: '50px' } })
      setProduct({ name: '', category: '', price: '', description: '', stock: '' })
      setImage(null)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product', {style: { marginTop: '50px' } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4">Welcome, {user?.isAuthenticated ? 'Admin' : 'Guest'}!</p>

      <div className="max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Product Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required className="w-full mb-2 px-3 py-2 border rounded-lg" />
          <input type="text" placeholder="Category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} required className="w-full mb-2 px-3 py-2 border rounded-lg" />
          <input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required className="w-full mb-2 px-3 py-2 border rounded-lg" />
          <textarea placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} required className="w-full mb-2 px-3 py-2 border rounded-lg" rows="4"></textarea>
          <input type="number" placeholder="Stock" value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} required className="w-full mb-2 px-3 py-2 border rounded-lg" />
          <input type="file" onChange={handleImageChange} required className="w-full mb-2 px-3 py-2 border rounded-lg" />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Admin
