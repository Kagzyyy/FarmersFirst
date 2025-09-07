import type { Crop, Order, Review } from './types';
import { OrderStatus } from './types';

const MOCK_REVIEWS: Review[] = [
    { id: 'rev1', reviewerName: 'Vijay Sales', rating: 5, comment: 'Great quality and fast delivery. Highly recommended.', date: '2023-10-10' },
    { id: 'rev2', reviewerName: 'Meena Traders', rating: 4, comment: 'Good product, but packaging could be better.', date: '2023-09-25' },
    { id: 'rev3', reviewerName: 'Kisan Connect', rating: 5, comment: 'Always fresh and reliable.', date: '2023-09-15' },
];

export const MOCK_CROPS: Crop[] = [
  { id: '1', name: 'Tomatoes', stockKg: 500, pricePerKg: 30, sellerName: 'Ram Kumar', rating: 4.5, description: 'Fresh, ripe tomatoes from organic farms. Perfect for salads, sauces, and soups. Grown with care and harvested at peak freshness.', imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=400&h=300&auto=format&fit=crop', reviews: MOCK_REVIEWS.slice(0, 2), isOrganic: true, isSeasonal: true, sellerCategory: 'Farmer' },
  { id: '2', name: 'Potatoes', stockKg: 1200, pricePerKg: 20, sellerName: 'Sita Devi', rating: 4.8, description: 'High-quality potatoes, ideal for a variety of dishes. Stored in optimal conditions to maintain freshness and taste.', imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=400&h=300&auto=format&fit=crop', reviews: MOCK_REVIEWS, isOrganic: false, isSeasonal: false, sellerCategory: 'Wholesaler' },
  { id: '3', name: 'Onions', stockKg: 800, pricePerKg: 25, sellerName: 'Lakshman Farms', rating: 4.2, description: 'Crisp and flavorful onions. A staple for any kitchen, providing a great base for curries, stews, and more.', imageUrl: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/c78e02f8-8670-4562-b72f-4dc7e4423e85.png', reviews: [MOCK_REVIEWS[1]], isOrganic: false, isSeasonal: false, sellerCategory: 'Cooperative' },
  { id: '4', name: 'Carrots', stockKg: 300, pricePerKg: 40, sellerName: 'Ganga Traders', rating: 4.6, description: 'Sweet and crunchy carrots, rich in vitamins. Great for snacking, salads, or cooking.', imageUrl: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/84033087-3565-4de8-a935-8b148c07dcfe.png', reviews: MOCK_REVIEWS.slice(1, 3), isOrganic: true, isSeasonal: false, sellerCategory: 'Farmer' },
  { id: '5', name: 'Wheat', stockKg: 5000, pricePerKg: 22, sellerName: 'Modern Agro', rating: 4.9, description: 'Premium quality wheat grains, suitable for milling into flour for rotis, bread, and other baked goods.', imageUrl: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/a63a4b1d-893d-47ca-9b28-8bfe26ad140d.png', isOrganic: false, isSeasonal: false, sellerCategory: 'Cooperative' },
  { id: '6', name: 'Rice (Basmati)', stockKg: 2500, pricePerKg: 80, sellerName: 'Himalayan Grains', rating: 4.7, description: 'Aromatic long-grain Basmati rice, perfect for biryani, pulao, and other festive dishes.', imageUrl: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/de326cf9-80e0-4839-8959-349307d2338b.png', reviews: MOCK_REVIEWS, isOrganic: false, isSeasonal: true, sellerCategory: 'Wholesaler' },
];

export const MOCK_ORDERS: Order[] = [
    { id: 'ord1', cropName: 'Wheat', sellerName: 'Modern Agro', totalAmount: 11000, status: OrderStatus.DELIVERED, date: '2023-10-15', review: { rating: 5, comment: 'Excellent quality wheat! Very happy with the purchase.' }},
    { id: 'ord2', cropName: 'Tomatoes', sellerName: 'Ram Kumar', totalAmount: 3000, status: OrderStatus.DELIVERED, date: '2023-10-20' }, // Delivered but no review yet
    { id: 'ord3', cropName: 'Onions', sellerName: 'Lakshman Farms', totalAmount: 5000, status: OrderStatus.INSTALLMENT_PAID, date: '2023-11-01' },
    { id: 'ord4', cropName: 'Potatoes', sellerName: 'Sita Devi', totalAmount: 4000, status: OrderStatus.BLOCKED, date: '2023-11-05' },
];