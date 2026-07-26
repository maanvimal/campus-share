import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import AddListing from './pages/AddListing';
import ItemDetails from './pages/ItemDetails';
import MyListings from './pages/MyListings';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)] text-slate-900 antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            success: {
              style: {
                background: '#eff6ff',
                color: '#1d4ed8',
                border: '1px solid #bfdbfe',
                borderRadius: '9999px',
                boxShadow: '0 10px 25px rgba(37, 99, 235, 0.12)',
              },
            },
            error: {
              style: {
                background: '#fef2f2',
                color: '#b91c1c',
                border: '1px solid #fecaca',
                borderRadius: '9999px',
                boxShadow: '0 10px 25px rgba(185, 28, 28, 0.12)',
              },
            },
          }}
        />
        <div className="mx-auto flex-1 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/item/:id"
              element={
                <ProtectedRoute>
                  <ItemDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-listings"
              element={
                <ProtectedRoute>
                  <MyListings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;