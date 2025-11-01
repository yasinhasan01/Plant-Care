
import React from 'react';
import BannerSlider from '../components/BannerSlider';
import { mockPlants } from '../utils/mockData';
import PlantCard from '../components/PlantCard';
import { FaExclamationTriangle, FaCheckCircle, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      <BannerSlider />

      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-3">
          <FaLeaf className="text-[#81c784]" /> New Arrivals
        </h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mockPlants.slice(0, 6).map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </motion.div>
      </section>

      <section className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-3">
            <FaExclamationTriangle className="text-yellow-500"/> Top Plant Care Mistakes
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
                <div className="bg-red-100 text-red-600 rounded-full p-4 mb-4">
                    <FaExclamationTriangle size={24}/>
                </div>
                <h3 className="font-semibold text-lg text-gray-700">Overwatering</h3>
                <p className="text-gray-600 mt-2">The #1 killer of houseplants. Always check soil moisture first.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
                     <FaExclamationTriangle size={24}/>
                </div>
                <h3 className="font-semibold text-lg text-gray-700">Improper Light</h3>
                <p className="text-gray-600 mt-2">Too much or too little light can stress your plant. Research its needs.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-purple-100 text-purple-600 rounded-full p-4 mb-4">
                     <FaExclamationTriangle size={24}/>
                </div>
                <h3 className="font-semibold text-lg text-gray-700">Ignoring Pests</h3>
                <p className="text-gray-600 mt-2">Check leaves regularly for pests like spider mites and treat them early.</p>
            </div>
        </div>
      </section>
      
      <section>
         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-3">
            <FaCheckCircle className="text-green-500"/> Beginner-Friendly Plants
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Snake Plant', 'ZZ Plant', 'Pothos', 'Spider Plant'].map(plantName => (
                <div key={plantName} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
                    <p className="font-semibold text-lg text-[#2e7d32]">{plantName}</p>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
