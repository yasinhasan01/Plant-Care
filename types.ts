
export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
}

export interface Plant {
  id: string | number;
  name: string;
  category: 'succulent' | 'fern' | 'flowering' | 'tropical' | 'bonsai';
  description: string;
  imageUrl: string;
  careLevel: 'easy' | 'moderate' | 'difficult';
  wateringFrequency: string;
  lastWatered?: string;
  nextWatering?: string;
  healthStatus?: string;
}
