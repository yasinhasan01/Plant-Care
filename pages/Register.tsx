import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { FaLeaf } from 'react-icons/fa';
import { User } from '../types';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const validatePassword = (pass: string) => {
    if (pass.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    }
    if (!/[A-Z]/.test(pass)) {
      setPasswordError('Password must contain an uppercase letter.');
      return false;
    }
    if (!/[a-z]/.test(pass)) {
      setPasswordError('Password must contain a lowercase letter.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error('Please fix the errors in the form.');
      return;
    }
    
    // Simulate user registration
    let registeredUsers: User[] = [];
    try {
      registeredUsers = JSON.parse(localStorage.getItem('plant-tracker-registered-users') || '[]');
    } catch (error) {
      console.error("Failed to parse registered users from localStorage", error);
      localStorage.removeItem('plant-tracker-registered-users');
    }
    
    const userExists = registeredUsers.some((u: User) => u.email === email);

    if (userExists) {
        toast.error('An account with this email already exists.');
        return;
    }

    const newUser: User = {
      id: String(Date.now()),
      name,
      email,
      photoURL,
    };
    
    registeredUsers.push(newUser);
    localStorage.setItem('plant-tracker-registered-users', JSON.stringify(registeredUsers));

    register(newUser);
    toast.success('Account created successfully!');
    navigate('/my-plants');
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
        <div>
          <FaLeaf className="mx-auto h-12 w-auto text-[#2e7d32]" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already a member?{' '}
            <Link to="/login" className="font-medium text-[#2e7d32] hover:text-[#25632b]">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input id="name" name="name" type="text" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#81c784] focus:border-[#81c784] sm:text-sm" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#81c784] focus:border-[#81c784] sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
             <div>
              <label htmlFor="photo-url" className="sr-only">Photo URL (optional)</label>
              <input id="photo-url" name="photoURL" type="text" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#81c784] focus:border-[#81c784] sm:text-sm" placeholder="Photo URL (optional)" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#81c784] focus:border-[#81c784] sm:text-sm`} placeholder="Password" value={password} onChange={handlePasswordChange}/>
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2e7d32] hover:bg-[#25632b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#81c784]">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;