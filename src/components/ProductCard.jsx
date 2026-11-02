import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setActiveModalProduct } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden border border-[#EBD9B0]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-square overflow-hidden bg-[#FAF6F0] cursor-pointer"
           onClick={() => setActiveModalProduct(product)}>
        
        {/* Main & Secondary Image (Miharu Style Flip) */}
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Tag Badge */}
        {product.tag && (
          <div className="absolute top-2.5 left-2.5 bg-[#231F1C]/90 backdrop-blur-xs text-[#DFBE7D] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-xs">
            {product.tag}
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 right-2.5 bg-[#A0772D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            -{discountPercent}%
          </div>
        )}

        {/* Action Overlay: Wishlist & Quick View */}
        <div className="absolute bottom-2.5 right-2.5 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-full shadow-md transition ${
              inWishlist
                ? 'bg-rose-50 text-rose-600'
                : 'bg-white/90 text-charcoal-800 hover:text-rose-600'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveModalProduct(product);
            }}
            className="p-2 bg-white/90 hover:bg-[#C5A059] text-charcoal-800 hover:text-white rounded-full shadow-md transition"
            aria-label="Quick View"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Craft Origin */}
          <div className="text-[10px] font-medium tracking-wider text-[#A0772D] uppercase mb-1">
            {product.craft}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setActiveModalProduct(product)}
            className="font-serif text-base sm:text-lg font-medium text-charcoal-900 group-hover:text-[#A0772D] transition line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-charcoal-600">
            <div className="flex items-center text-[#C5A059]">
              <Star size={13} fill="currentColor" />
              <span className="font-semibold ml-1 text-charcoal-800">{product.rating}</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-[11px] text-gray-500">({product.reviews})</span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg sm:text-xl font-bold text-charcoal-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[9px] text-emerald-700 font-medium block">Inclusive of all taxes</span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2.5 bg-[#FAF6F0] hover:bg-[#231F1C] text-charcoal-900 hover:text-[#DFBE7D] border border-[#EBD9B0] rounded-lg transition-colors duration-200 flex items-center gap-1.5 shadow-xs"
            title="Add to Cart"
          >
            <ShoppingBag size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
