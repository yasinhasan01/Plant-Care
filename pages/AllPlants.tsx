
import React from 'react';
import { mockPlants } from '../utils/mockData';
import PlantCard from '../components/PlantCard';
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

const AllPlants: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Plant Collection</h1>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {mockPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </motion.div>
    </div>
  );
};

export default AllPlants;
