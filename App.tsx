
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// Fix: Import Transition type from framer-motion
import { motion, AnimatePresence, Transition } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllPlants from './pages/AllPlants';
import AddPlant from './pages/AddPlant';
import MyPlants from './pages/MyPlants';
import ViewDetails from './pages/ViewDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

// Fix: Explicitly type pageTransition with the Transition type from framer-motion.
const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-green-50/50 font-sans">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<motion.div key="home" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Home /></motion.div>} />
                <Route path="/all-plants" element={<motion.div key="all-plants" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><AllPlants /></motion.div>} />
                <Route path="/plant/:id" element={<motion.div key="view-details" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><ViewDetails /></motion.div>} />
                <Route path="/login" element={<motion.div key="login" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Login /></motion.div>} />
                <Route path="/register" element={<motion.div key="register" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Register /></motion.div>} />
                
                {/* Private Routes */}
                <Route path="/add-plant" element={<PrivateRoute><motion.div key="add-plant" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><AddPlant /></motion.div></PrivateRoute>} />
                <Route path="/my-plants" element={<PrivateRoute><motion.div key="my-plants" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><MyPlants /></motion.div></PrivateRoute>} />
                
                <Route path="*" element={<motion.div key="not-found" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><NotFound /></motion.div>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;