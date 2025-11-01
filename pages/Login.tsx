import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { FaLeaf, FaGoogle, FaGithub } from 'react-icons/fa';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a simulation. In a real app, you'd fetch the user from a database.
    // For this app, we'll check if a user with this email was registered in localStorage.
    let registeredUsers = [];
    try {
        registeredUsers = JSON.parse(localStorage.getItem('plant-tracker-registered-users') || '[]');
    } catch (error) {
        console.error("Failed to parse registered users from localStorage", error);
        localStorage.removeItem('plant-tracker-registered-users');
    }

    const user = registeredUsers.find((u: any) => u.email === email);

    if (user) {
      // In a real app, you'd verify the password (hashed). Here, we just log in.
      login(user);
      toast.success('Welcome back!');
      navigate('/my-plants');
    } else {
      toast.error('No account found with that email. Please register.');
    }
  };
  
  const handleSocialLogin = (provider: string) => {
    toast.info(`Login with ${provider} is not implemented yet.`);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
        <div>
          <FaLeaf className="mx-auto h-12 w-auto text-[#2e7d32]" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-[#2e7d32] hover:text-[#25632b]">
              start your 14-day free trial
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#81c784] focus:border-[#81c784] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#81c784] focus:border-[#81c784] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2e7d32] hover:bg-[#25632b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#81c784]"
            >
              Sign in
            </button>
          </div>
        </form>
         <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button onClick={() => handleSocialLogin('Google')} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <FaGoogle className="w-5 h-5" />
              </button>
            </div>
            <div>
              <button onClick={() => handleSocialLogin('GitHub')} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <FaGithub className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;