import { BrowserRouter as Router } from 'react-router'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  )
}

export default App