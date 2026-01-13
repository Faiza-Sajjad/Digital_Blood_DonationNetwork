import { useState } from 'react';
import { X } from 'lucide-react';

export default function LoginModal({ role, onClose, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      onSubmit({ email, password, fullName, isSignUp: true });
    } else {
      onSubmit({ email, password, rememberMe, isSignUp: false });
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    if (!isSignUp) {
      setFullName('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl transform transition-all duration-300 scale-100">
        
        {/* Close Button with Rotation */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:rotate-90 transition-all duration-300 p-1"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
          {isSignUp ? (
            `Join as ${role === 'donor' ? 'Donor' : role === 'seeker' ? 'Seeker' : 'Admin'}`
          ) : (
            'Welcome Back'
          )}
        </h2>

        <p className="text-gray-500 mb-8">
          {isSignUp 
            ? 'Create your account to start saving lives.' 
            : `Login to your ${role} account.`}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-red-600 transition-colors">Full Name</label>
              <input
                type="text"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none bg-gray-50 focus:bg-white"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-red-600 transition-colors">Email Address</label>
            <input
              type="email"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none bg-gray-50 focus:bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-red-600 transition-colors">Password</label>
            <input
              type="password"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none bg-gray-50 focus:bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {isSignUp && (
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-red-600 transition-colors">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none bg-gray-50 focus:bg-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          )}

          {!isSignUp && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 transition-colors cursor-pointer"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <button
                type="button"
                className="text-red-600 hover:text-red-700 font-semibold hover:underline decoration-2 underline-offset-4 transition-all"
                onClick={() => alert('Feature coming soon!')}
              >
                Forgot?
              </button>
            </div>
          )}

          {/* Main Button with Scale Effect */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-red-200"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          <p className="text-center text-gray-600 text-sm mt-4">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-red-600 hover:text-red-700 font-bold hover:underline decoration-2 underline-offset-4 transition-all"
            >
              {isSignUp ? 'Login here' : 'Sign up now'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}