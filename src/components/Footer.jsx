import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-1 shadow-sm">
              <img src={logo} alt="Campus Share logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight text-slate-900">Campus Share</p>
              <p className="text-sm text-slate-500">Borrow Smart</p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
              Quick Links
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <NavLink to="/home" className="transition hover:text-blue-600">
                Home
              </NavLink>
              <NavLink to="/add" className="transition hover:text-blue-600">
                Add Listing
              </NavLink>
              <NavLink to="/my-listings" className="transition hover:text-blue-600">
                My Listings
              </NavLink>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
              Built with
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-slate-600">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                React
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                Firebase
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                Cloudinary
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                Tailwind CSS
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t border-slate-200/80 pt-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Campus Share</p>
          <p>Built by Maan Vimal</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
