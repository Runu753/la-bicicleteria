import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navigation from './components/Navigation'
import Cart from './components/Cart'
import AuthModal from './components/AuthModal'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'

function AppInner() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation onOpenAuth={() => setIsAuthOpen(true)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tienda" element={<ShopPage />} />
      </Routes>
      <Cart />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
