import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plant } from '../types';
import { mockPlants } from '../utils/mockData';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaArrowLeft, FaTint, FaSun, FaRulerVertical, FaCalendarAlt } from 'react-icons/fa';

const ViewDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const allMockPlants = mockPlants;
      let myPlants: Plant[] = [];
      try {
        myPlants = JSON.parse(localStorage.getItem('plant-tracker-my-plants') || '[]');
      } catch (error) {
        console.error("Failed to parse my-plants from localStorage", error);
        localStorage.removeItem('plant-tracker-my-plants');
      }
      
      const combinedPlants = [...myPlants, ...allMockPlants];
      const foundPlant = combinedPlants.find(p => String(p.id) === id);
      setPlant(foundPlant || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!plant) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Plant not found</h2>
        <Link to="/all-plants" className="text-blue-500 mt-4 inline-block">Back to All Plants</Link>
      </div>
    );
  }
  
  const getCareLevelColor = (level: string) => {
    switch (level) {
      case 'easy': return 'text-green-600 border-green-500 bg-green-100';
      case 'moderate': return 'text-yellow-600 border-yellow-500 bg-yellow-100';
      case 'difficult': return 'text-red-600 border-red-500 bg-red-100';
      default: return 'text-gray-600 border-gray-500 bg-gray-100';
    }
  };


  return (
    <div>
       <Link to="/all-plants" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2e7d32] mb-6 transition-colors">
            <FaArrowLeft /> Back to plants
        </Link>
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <img src={plant.imageUrl} alt={plant.name} className="w-full h-auto object-cover rounded-xl shadow-lg aspect-square" />
          </div>
          <div className="space-y-4">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full inline-block ${getCareLevelColor(plant.careLevel)}`}>
                {plant.careLevel} Care
            </span>
            <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">{plant.name}</h1>
            <p className="text-lg text-gray-500 capitalize">{plant.category}</p>
            <p className="text-gray-700 leading-relaxed">{plant.description}</p>
            
            <div className="border-t pt-4 mt-4 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                    <FaTint className="text-[#81c784] text-xl" />
                    <div>
                        <span className="font-semibold">Watering</span>: {plant.wateringFrequency}
                    </div>
                </div>
                 {plant.lastWatered && (
                    <div className="flex items-center gap-3 text-gray-600">
                        <FaCalendarAlt className="text-[#81c784] text-xl" />
                        <div>
                            <span className="font-semibold">Last Watered</span>: {new Date(plant.lastWatered).toLocaleDateString()}
                        </div>
                    </div>
                 )}
                 {plant.nextWatering && (
                    <div className="flex items-center gap-3 text-gray-600">
                        <FaCalendarAlt className="text-[#2e7d32] text-xl" />
                        <div>
                            <span className="font-semibold">Next Watering</span>: {new Date(plant.nextWatering).toLocaleDateString()}
                        </div>
                    </div>
                 )}
                  {plant.healthStatus && (
                    <div className="flex items-center gap-3 text-gray-600">
                        <FaSun className="text-yellow-400 text-xl" />
                        <div className="capitalize">
                            <span className="font-semibold">Health</span>: {plant.healthStatus}
                        </div>
                    </div>
                 )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;