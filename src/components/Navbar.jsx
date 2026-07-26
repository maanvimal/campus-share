import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const displayName = user?.displayName || 'User';
  const photoUrl = user?.photoURL;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
            CS
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">Campus Share</p>
            <p className="text-sm text-slate-500">Borrow smart</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 p-1.5 shadow-sm sm:flex">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.2)]'
                    : 'text-slate-700 hover:bg-white hover:text-slate-900'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.2)]'
                    : 'text-slate-700 hover:bg-white hover:text-slate-900'
                }`
              }
            >
              Add Listing
            </NavLink>
            <NavLink
              to="/my-listings"
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.2)]'
                    : 'text-slate-700 hover:bg-white hover:text-slate-900'
                }`
              }
            >
              My Listings
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="btn-secondary"
          >
            Logout
          </button>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
            {photoUrl ? (
              <img src={photoUrl} alt={displayName} className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700">
                U
              </div>
            )}
            <span className="text-sm font-medium text-slate-700">{displayName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
