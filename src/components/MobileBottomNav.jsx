import React from 'react';
import { Home, Sparkles, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileBottomNav = ({ onSelectCategory, onHomeClick }) => {
  const { totalCartCount, wishlist, setIsCartOpen } = useCart();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EBD9B0] py-2 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={onHomeClick}
          className="flex flex-col items-center justify-center text-charcoal-700 hover:text-[#C5A059] transition"
        >
          <Home size={20} />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </button>

        {/* Collections */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center justify-center text-charcoal-700 hover:text-[#C5A059] transition"
        >
          <Sparkles size={20} />
          <span className="text-[10px] mt-1 font-medium">Shop</span>
        </button>

        {/* WhatsApp Fast Support */}
        <a
          href="https://wa.me/919876543210?text=Hello%20Nyishi%20Collections!%20I%20have%20an%20enquiry."
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center text-emerald-600 hover:text-emerald-700 transition"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md -mt-4 border-2 border-white">
            <MessageCircle size={20} />
          </div>
          <span className="text-[10px] mt-0.5 font-medium text-emerald-700">Chat</span>
        </a>

        {/* Wishlist */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center justify-center text-charcoal-700 hover:text-[#C5A059] relative transition"
        >
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A059] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] mt-1 font-medium">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center text-charcoal-700 hover:text-[#C5A059] relative transition"
        >
          <ShoppingBag size={20} />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#231F1C] text-[#DFBE7D] text-[9px] font-bold rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
          <span className="text-[10px] mt-1 font-medium">Bag</span>
        </button>

      </div>
    </div>
  );
};
