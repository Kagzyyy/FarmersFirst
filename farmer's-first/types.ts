export interface User {
  farmId: string;
  name: string;
  email: string;
  contactNumber: string;
  profilePic?: string;
}

export enum CropType {
  Vegetable = 'Vegetable',
  Grain = 'Grain',
  Fruit = 'Fruit',
}

export enum CulturalPractice {
  Organic = 'Organic',
  Hybrid = 'Hybrid',
  Conventional = 'Conventional',
}

export interface Crop {
  id: string;
  name:string;
  type: CropType;
  culturalPractice: CulturalPractice;
  pricePerKg: number;
  stockKg: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  buyerName: string;
  crop: Crop;
  quantityKg: number;
  date: string;
  status: 'Completed' | 'Ongoing' | 'Pending Payment';
}

export enum AuthPage {
  Welcome,
  Login,
  Register,
}

export enum MainPage {
  Home,
  AddCrop,
  Orders,
  Profile,
}