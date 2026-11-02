import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/logo.jpg';

export const Header = ({ onSearch, searchQuery, selectedCategory, onSelectCategory }) => {
  const { totalCartCount, wishlist, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBD9B0]/60 transition-all">
      {/* Top Notification Bar */}
      <div className="bg-[#231F1C] text-[#FAF8F5] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#C5A059] animate-pulse" />
        <span>Celebrate Indian Heritage • Use Code <strong className="text-[#DFBE7D] tracking-wider">NYISHI10</strong> for 10% Off</span>
        <span className="hidden sm:inline">• Free Shipping Above ₹1,999</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-800 hover:text-gold-600 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-charcoal-800 hover:text-gold-600 transition ml-1"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Brand Logo & Name */}
          <div className="flex items-center justify-center flex-1 lg:flex-none">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C5A059]/40 shadow-sm p-0.5 bg-white transition group-hover:scale-105 flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="Nyishi Collections Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#231F1C] leading-none">
                  Nyishi
                </span>
                <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] text-[#A0772D] uppercase font-semibold">
                  Collections
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => onSelectCategory('all')} 
              className={`text-sm tracking-wider uppercase transition font-medium ${selectedCategory === 'all' ? 'text-[#C5A059] font-bold border-b-2 border-[#C5A059] pb-1' : 'text-charcoal-700 hover:text-[#C5A059]'}`}
            >
              All Pieces
            </button>
            <button 
              onClick={() => onSelectCategory('necklaces')} 
              className={`text-sm tracking-wider uppercase transition font-medium ${selectedCategory === 'necklaces' ? 'text-[#C5A059] font-bold border-b-2 border-[#C5A059] pb-1' : 'text-charcoal-700 hover:text-[#C5A059]'}`}
            >
              Necklaces & Hasuli
            </button>
            <button 
              onClick={() => onSelectCategory('earrings')} 
              className={`text-sm tracking-wider uppercase transition font-medium ${selectedCategory === 'earrings' ? 'text-[#C5A059] font-bold border-b-2 border-[#C5A059] pb-1' : 'text-charcoal-700 hover:text-[#C5A059]'}`}
            >
              Tribal Earrings
            </button>
            <button 
              onClick={() => onSelectCategory('dokra-art')} 
              className={`text-sm tracking-wider uppercase transition font-medium ${selectedCategory === 'dokra-art' ? 'text-[#C5A059] font-bold border-b-2 border-[#C5A059] pb-1' : 'text-charcoal-700 hover:text-[#C5A059]'}`}
            >
              Dokra Heritage Art
            </button>
            <a 
              href="#dokra-story" 
              className="text-sm tracking-wider uppercase text-charcoal-700 hover:text-[#C5A059] transition font-medium"
            >
              The Craft Story
            </a>
          </nav>

          {/* Actions: Search, Wishlist, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search Dokra art, hasuli..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-48 lg:w-64 pl-9 pr-3 py-1.5 text-xs rounded-full bg-white border border-[#EBD9B0] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition text-charcoal-800 placeholder-gray-400"
              />
              <Search size={15} className="absolute left-3 text-gray-400" />
            </div>

            {/* Wishlist Link */}
            <div className="relative">
              <button
                onClick={() => {}}
                className="p-2 text-charcoal-800 hover:text-[#C5A059] transition relative"
                title="Wishlist"
              >
                <Heart size={21} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#C5A059] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#231F1C] text-[#FAF8F5] rounded-full hover:bg-[#C5A059] transition duration-200 shadow-sm flex items-center gap-2 group"
              aria-label="View Cart"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">
                Cart
              </span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 bg-[#C5A059] group-hover:bg-[#231F1C] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer (toggled) */}
        {searchOpen && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Dokra art, jewelry, handicrafts..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-white border border-[#C5A059] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                autoFocus
              />
              <Search size={18} className="absolute left-3 top-3 text-[#A0772D]" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EBD9B0] px-6 py-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); }}
              className="text-left font-serif text-lg text-charcoal-800 hover:text-[#C5A059] font-medium"
            >
              All Collections
            </button>
            <button
              onClick={() => { onSelectCategory('necklaces'); setMobileMenuOpen(false); }}
              className="text-left font-serif text-lg text-charcoal-800 hover:text-[#C5A059] font-medium"
            >
              Dokra Necklaces & Hasuli
            </button>
            <button
              onClick={() => { onSelectCategory('earrings'); setMobileMenuOpen(false); }}
              className="text-left font-serif text-lg text-charcoal-800 hover:text-[#C5A059] font-medium"
            >
              Tribal Earrings & Studs
            </button>
            <button
              onClick={() => { onSelectCategory('bangles'); setMobileMenuOpen(false); }}
              className="text-left font-serif text-lg text-charcoal-800 hover:text-[#C5A059] font-medium"
            >
              Hand-Cast Bangles & Cuffs
            </button>
            <button
              onClick={() => { onSelectCategory('dokra-art'); setMobileMenuOpen(false); }}
              className="text-left font-serif text-lg text-charcoal-800 hover:text-[#C5A059] font-medium"
            >
              Dokra Home Art & Sculptures
            </button>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-charcoal-600">
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-[#C5A059]" /> 100% Genuine Brass</span>
              <span className="flex items-center gap-1.5"><Phone size={14} className="text-[#C5A059]" /> Artisan Support</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
