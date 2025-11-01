import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plant } from '../types';
import { toast } from 'react-toastify';
import { FaLeaf, FaSave } from 'react-icons/fa';

const AddPlant: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Plant, 'id'>>({
    name: '',
    category: 'tropical',
    description: '',
    imageUrl: '',
    careLevel: 'easy',
    wateringFrequency: '',
    lastWatered: '',
    nextWatering: '',
    healthStatus: 'healthy',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.imageUrl || !formData.wateringFrequency) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const newPlant: Plant = {
      id: Date.now(),
      ...formData,
    };

    let myPlants = [];
    try {
      myPlants = JSON.parse(localStorage.getItem('plant-tracker-my-plants') || '[]');
    } catch (error) {
        console.error("Failed to parse my-plants from localStorage", error);
        localStorage.removeItem('plant-tracker-my-plants');
    }

    myPlants.push(newPlant);
    localStorage.setItem('plant-tracker-my-plants', JSON.stringify(myPlants));

    toast.success(`${newPlant.name} has been added to your collection!`);
    navigate('/my-plants');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <FaLeaf className="mx-auto text-4xl text-[#2e7d32] mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">Add a New Plant</h1>
        <p className="text-gray-500">Fill in the details to add a new plant to your personal collection.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Plant Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2e7d32] focus:ring-[#2e7d32] sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2e7d32] focus:ring-[#2e7d32] sm:text-sm" required />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2e7d32] focus:ring-[#2e7d32] sm:text-sm">
              <option>tropical</option>
              <option>succulent</option>
              <option>fern</option>
              <option>flowering</option>
              <option>bonsai</option>
            </select>
          </div>
          <div>
            <label htmlFor="careLevel" className="block text-sm font-medium text-gray-700">Care Level</label>
            <select name="careLevel" id="careLevel" value={formData.careLevel} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2e7d32] focus:ring-[#2e7d32] sm:text-sm">
              <option>easy</option>
              <option>moderate</option>
              <option>difficult</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" rows={3} value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2e7d32] focus:ring-[#2e7d32] sm:text-sm"></textarea>
        </div>

        <div>
            <label htmlFor="wateringFrequency" className="block text-sm font-medium text-gray-700">Watering Frequency (e.g., Weekly)</label>
            <input type="text" name="wateringFrequency" id="wateringFrequency" value={formData.wateringFrequency} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2e7d32] focus:ring-[#2e7d32] sm:text-sm" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="lastWatered" className="block text-sm font-medium text-gray-700">Last Watered Date</label>
                <input type="date" name="lastWatered" id="lastWatered" value={formData.lastWatered} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2e7d32] focus:ring-[#2e7d32] sm:text-sm"/>
            </div>
            <div>
                <label htmlFor="nextWatering" className="block text-sm font-medium text-gray-700">Next Watering Date</label>
                <input type="date" name="nextWatering" id="nextWatering" value={formData.nextWatering} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2e7d32] focus:ring-[#2e7d32] sm:text-sm"/>
            </div>
        </div>
        
        <div>
          <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2e7d32] hover:bg-[#25632b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#81c784] transition-colors duration-300">
            <FaSave /> Add Plant
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlant;