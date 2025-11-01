import React, { useState, useEffect } from 'react';
import { Plant } from '../types';
import PlantCard from '../components/PlantCard';
import { FaEdit, FaTrash, FaPlus, FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const MyPlants: React.FC = () => {
  const [myPlants, setMyPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const fetchPlants = () => {
      // Simulate loading
      setTimeout(() => {
        try {
          const storedPlants = JSON.parse(localStorage.getItem('plant-tracker-my-plants') || '[]');
          setMyPlants(storedPlants);
        } catch (error) {
          console.error("Failed to parse plants from localStorage", error);
          localStorage.removeItem('plant-tracker-my-plants');
          setMyPlants([]);
        } finally {
          setLoading(false);
        }
      }, 500);
    };
    fetchPlants();
  }, []);

  const handleDelete = (plantId: string | number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPlants = myPlants.filter(p => p.id !== plantId);
        setMyPlants(updatedPlants);
        localStorage.setItem('plant-tracker-my-plants', JSON.stringify(updatedPlants));
        Swal.fire(
          'Deleted!',
          'Your plant has been removed from your collection.',
          'success'
        );
      }
    });
  };
  
  const handleUpdate = (updatedPlant: Plant) => {
    const updatedPlants = myPlants.map(p => p.id === updatedPlant.id ? updatedPlant : p);
    setMyPlants(updatedPlants);
    localStorage.setItem('plant-tracker-my-plants', JSON.stringify(updatedPlants));
    setEditingPlant(null);
    Swal.fire('Updated!', 'Your plant details have been saved.', 'success');
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#2e7d32]"></div>
        </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">My Plant Collection</h1>
        <Link to="/add-plant" className="flex items-center gap-2 bg-[#2e7d32] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#25632b] transition-colors">
          <FaPlus /> Add New Plant
        </Link>
      </div>

      {myPlants.length > 0 ? (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {myPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              actions={
                <div className="flex w-full gap-2">
                  <button onClick={() => setEditingPlant(plant)} className="flex-1 flex justify-center items-center gap-2 bg-blue-500 text-white px-3 py-2 text-xs rounded-lg hover:bg-blue-600 transition-colors">
                    <FaEdit /> Update
                  </button>
                  <button onClick={() => handleDelete(plant.id)} className="flex-1 flex justify-center items-center gap-2 bg-red-500 text-white px-3 py-2 text-xs rounded-lg hover:bg-red-600 transition-colors">
                    <FaTrash /> Delete
                  </button>
                </div>
              }
            />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700">Your collection is empty!</h2>
          <p className="text-gray-500 mt-2">Start by adding your first plant.</p>
          <Link to="/add-plant" className="mt-6 inline-flex items-center gap-2 bg-[#2e7d32] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#25632b] transition-colors font-semibold">
            <FaPlus /> Add a Plant
          </Link>
        </div>
      )}
      <UpdatePlantModal plant={editingPlant} onUpdate={handleUpdate} onClose={() => setEditingPlant(null)} />
    </div>
  );
};


const UpdatePlantModal: React.FC<{plant: Plant | null, onUpdate: (plant: Plant) => void, onClose: () => void}> = ({plant, onUpdate, onClose}) => {
    const [formData, setFormData] = useState<Plant | null>(null);

    useEffect(() => {
        setFormData(plant);
    }, [plant]);

    if (!plant || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? ({ ...prev, [name]: value }) : null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(formData) onUpdate(formData);
    };

    const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2e7d32] focus:ring-[#2e7d32] sm:text-sm";

    return (
        <AnimatePresence>
            {plant && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit {plant.name}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Plant Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClasses} />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className={inputClasses} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className={inputClasses} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Watering Frequency</label>
                                <input type="text" name="wateringFrequency" value={formData.wateringFrequency} onChange={handleChange} className={inputClasses} />
                            </div>
                             <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded-lg bg-[#2e7d32] text-white hover:bg-[#25632b] flex items-center gap-2">
                                    <FaSave /> Save Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


export default MyPlants;