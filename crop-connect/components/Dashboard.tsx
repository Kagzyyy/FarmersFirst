
import React, { useState, useMemo, useCallback } from 'react';
import type { Crop, SellerCategory } from '../types';
import CropCard from './CropCard';
import Header from './common/Header';

interface DashboardProps {
  crops: Crop[];
  onSelectCrop: (crop: Crop) => void;
  onProfileClick: () => void;
}

const ProfileIcon: React.FC<{onClick: () => void}> = ({onClick}) => (
    <button onClick={onClick} className="text-textPrimary hover:text-primary transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </button>
);

const FilterIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
    </svg>
);


const Dashboard: React.FC<DashboardProps> = ({ crops, onSelectCrop, onProfileClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<Crop[]>([]);
  const [isSearchFocused, setSearchFocused] = useState(false);

  const maxPossiblePrice = useMemo(() => {
    if (crops.length === 0) return 100;
    return Math.ceil(Math.max(...crops.map(c => c.pricePerKg)) / 10) * 10;
  }, [crops]);

  const [maxPrice, setMaxPrice] = useState<number>(maxPossiblePrice);
  const [minRating, setMinRating] = useState<number>(0);
  const [filterTags, setFilterTags] = useState({ organic: false, seasonal: false });
  const [filterSellerCategory, setFilterSellerCategory] = useState<SellerCategory | null>(null);

  const handleResetFilters = useCallback(() => {
    setMaxPrice(maxPossiblePrice);
    setMinRating(0);
    setFilterTags({ organic: false, seasonal: false });
    setFilterSellerCategory(null);
  }, [maxPossiblePrice]);

  const handleRatingFilterClick = (rating: number) => {
    setMinRating(prev => (prev === rating ? 0 : rating));
  };

  const handleTagFilterClick = (tag: 'organic' | 'seasonal') => {
    setFilterTags(prev => ({...prev, [tag]: !prev[tag]}));
  };

  const handleSellerCategoryFilterClick = (category: SellerCategory) => {
    setFilterSellerCategory(prev => (prev === category ? null : category));
  }
  
  const filteredCrops = useMemo(() => {
    return crops.filter(crop => {
        const searchMatch = !searchTerm ||
            crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crop.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
        
        const priceMatch = crop.pricePerKg <= maxPrice;
        const ratingMatch = crop.rating >= minRating;
        const organicMatch = !filterTags.organic || crop.isOrganic;
        const seasonalMatch = !filterTags.seasonal || crop.isSeasonal;
        const sellerCategoryMatch = !filterSellerCategory || crop.sellerCategory === filterSellerCategory;

        return searchMatch && priceMatch && ratingMatch && organicMatch && seasonalMatch && sellerCategoryMatch;
    });
  }, [crops, searchTerm, maxPrice, minRating, filterTags, filterSellerCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
        setSuggestions(crops.filter(crop => crop.name.toLowerCase().includes(value.toLowerCase())).slice(0, 5));
    } else {
        setSuggestions([]);
    }
  };

  const handleSuggestionClick = (cropName: string) => {
    setSearchTerm(cropName);
    setSuggestions([]);
  };

  const activeFilterCount = (maxPrice < maxPossiblePrice ? 1 : 0) + 
                             (minRating > 0 ? 1 : 0) + 
                             (filterTags.organic ? 1 : 0) +
                             (filterTags.seasonal ? 1 : 0) +
                             (filterSellerCategory ? 1 : 0);

  return (
    <div className="flex flex-col h-full">
      <Header title="Crop Connect" rightAction={<ProfileIcon onClick={onProfileClick} />} />
      
      <div className="p-4 space-y-4">
        <div className="relative" onBlur={() => setTimeout(() => setSearchFocused(false), 100)}>
          <input
            type="text"
            placeholder="Search for crops..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setSearchFocused(true)}
            className="w-full px-4 py-3 pl-12 border border-slate-700 rounded-full text-lg bg-slate-800 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            aria-label="Search for crops"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {isSearchFocused && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg">
                {suggestions.map(s => (
                    <li 
                        key={s.id} 
                        className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                        onMouseDown={() => handleSuggestionClick(s.name)}
                    >
                        {s.name}
                    </li>
                ))}
            </ul>
          )}
        </div>
        
        <div>
            <button 
                onClick={() => setShowFilters(prev => !prev)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-full text-textSecondary hover:bg-slate-50 transition"
                aria-expanded={showFilters}
            >
                <FilterIcon />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                    <span className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{activeFilterCount}</span>
                )}
            </button>
        </div>

        {showFilters && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="price-range" className="font-semibold text-textSecondary">Max Price</label>
                        <span className="font-bold text-primary">₹{maxPrice}/kg</span>
                    </div>
                    <input 
                        id="price-range"
                        type="range"
                        min={0}
                        max={maxPossiblePrice}
                        value={maxPrice}
                        onChange={e => setMaxPrice(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
                 <div>
                    <label className="font-semibold text-textSecondary block mb-2">Tags</label>
                    <div className="flex space-x-2">
                        <button onClick={() => handleTagFilterClick('organic')} className={`px-4 py-2 rounded-full border-2 transition ${filterTags.organic ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}>Organic</button>
                        <button onClick={() => handleTagFilterClick('seasonal')} className={`px-4 py-2 rounded-full border-2 transition ${filterTags.seasonal ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}>Seasonal</button>
                    </div>
                </div>
                 <div>
                    <label className="font-semibold text-textSecondary block mb-2">Seller Category</label>
                    <div className="flex space-x-2">
                        {(['Farmer', 'Wholesaler', 'Cooperative'] as SellerCategory[]).map(cat => (
                           <button key={cat} onClick={() => handleSellerCategoryFilterClick(cat)} className={`px-4 py-2 rounded-full border-2 transition ${filterSellerCategory === cat ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}>{cat}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="font-semibold text-textSecondary block mb-2">Seller Rating</label>
                    <div className="flex space-x-2">
                        {[4, 3].map(rating => (
                            <button 
                                key={rating}
                                onClick={() => handleRatingFilterClick(rating)}
                                className={`px-4 py-2 rounded-full border-2 transition ${minRating === rating ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}
                            >
                                {rating}+ ★
                            </button>
                        ))}
                    </div>
                </div>
                <div className="pt-2">
                    <button onClick={handleResetFilters} className="text-sm text-textSecondary hover:text-primary transition font-semibold">Reset Filters</button>
                </div>
            </div>
        )}
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 pt-0">
        {filteredCrops.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
                {filteredCrops.map(crop => (
                    <CropCard key={crop.id} crop={crop} onClick={() => onSelectCrop(crop)} />
                ))}
            </div>
        ) : (
            <div className="text-center py-10">
                <p className="text-lg text-textSecondary">No crops match your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
