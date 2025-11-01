
import React from 'react';
import { Plant } from '../types';
import { motion } from 'framer-motion';
import { FaSeedling, FaTag, FaTint, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface PlantCardProps {
  plant: Plant;
  actions?: React.ReactNode;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PlantCard: React.FC<PlantCardProps> = ({ plant, actions }) => {
  const navigate = useNavigate();

  const getCareLevelColor = (level: string) => {
    switch (level) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'difficult':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
    >
      <div className="relative">
        <img className="h-48 w-full object-cover" src={plant.imageUrl} alt={plant.name} />
        <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${getCareLevelColor(plant.careLevel)}`}>
          {plant.careLevel}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{plant.name}</h3>
        <p className="flex items-center text-sm text-gray-500 capitalize mb-3">
            <FaTag className="mr-2 text-gray-400"/> {plant.category}
        </p>
        
        <p className="text-gray-600 text-sm flex-grow">{plant.description.substring(0, 70)}...</p>

        <div className="mt-4 border-t pt-4">
            <div className="flex justify-between items-center text-sm">
                {!actions && (
                    <button onClick={() => navigate(`/plant/${plant.id}`)} className="flex items-center gap-2 text-white bg-[#2e7d32] hover:bg-[#25632b] px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full justify-center">
                        <FaInfoCircle/> View Details
                    </button>
                )}
                {actions}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlantCard;
