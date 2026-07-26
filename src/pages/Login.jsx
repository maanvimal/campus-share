import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { auth, googleProvider } from '../firebase/firebase';

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="text-center">
          <img
            src={logo}
            alt="Campus Share logo"
            className="mx-auto mb-6 h-20 w-20 object-contain sm:h-24 sm:w-24"
          />
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Campus Share
          </p>
          <h1 className="text-4xl font-bold text-slate-900">Share. Borrow. Save.</h1>
          <p className="mt-3 text-sm text-slate-600">
            Sign in to join your campus marketplace.
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mt-8 flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
        >
          <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M21.6 12.23c0-.78-.07-1.53-.2-2.25H12v4.26h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.74 2.98-4.31 2.98-7.53Z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z"
            />
            <path
              fill="#FBBC05"
              d="M6.41 13.91A6.02 6.02 0 0 1 6.41 10.1V7.52H3.07a10 10 0 0 0 0 12.78l3.34-2.59Z"
            />
            <path
              fill="#EA4335"
              d="M12 6.08c1.47 0 2.8.5 3.84 1.49l2.88-2.88A9.96 9.96 0 0 0 12 2a10 10 0 0 0-8.93 5.52l3.34 2.59C7.2 7.84 9.4 6.08 12 6.08Z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
