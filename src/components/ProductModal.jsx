import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, MessageCircle, Star, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal = () => {
  const { activeModalProduct, setActiveModalProduct, addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen } = useCart();
  const [selectedImg, setSelectedImg] = useState('main');
  const [quantity, setQuantity] = useState(1);

  if (!activeModalProduct) return null;

  const product = activeModalProduct;
  const inWishlist = isInWishlist(product.id);

  const handleInstantBuy = () => {
    addToCart(product, quantity);
    setActiveModalProduct(null);
    setIsCheckoutOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Nyishi Collections! I'm interested in buying: ${product.name} (₹${product.price}). Could you please share more details?`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-[#EBD9B0] my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveModalProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal-800 shadow-md transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-[#FAF6F0] flex flex-col justify-between">
            <div className="aspect-square rounded-xl overflow-hidden bg-white border border-[#EBD9B0] relative">
              <img
                src={selectedImg === 'main' ? product.image : (product.secondaryImage || product.image)}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-[#231F1C]/90 text-[#DFBE7D] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                100% Hand-Cast Dokra
              </div>
            </div>

            {/* Thumbnail switcher */}
            {product.secondaryImage && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setSelectedImg('main')}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                    selectedImg === 'main' ? 'border-[#C5A059] shadow-md' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={product.image} alt="Angle 1" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setSelectedImg('secondary')}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                    selectedImg === 'secondary' ? 'border-[#C5A059] shadow-md' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={product.secondaryImage} alt="Angle 2" className="w-full h-full object-cover" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Specs & Purchasing */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs text-[#A0772D] font-semibold uppercase tracking-widest">
                <span>{product.craft}</span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span> Ready to Dispatch
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal-900 mt-2">
                {product.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-[#EBD9B0]/60">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">
                  <Star size={14} fill="currentColor" />
                  <span className="ml-1 font-bold text-charcoal-800">{product.rating}</span>
                  <span className="text-gray-400 ml-1">({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-charcoal-600 mt-4 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Specifications Table */}
              <div className="mt-4 bg-white p-3.5 rounded-xl border border-[#EBD9B0]/60 text-xs space-y-1.5">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Material:</span>
                  <span className="font-semibold text-charcoal-800 text-right">{product.material}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Weight:</span>
                  <span className="font-semibold text-charcoal-800">{product.weight}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">Care Tip:</span>
                  <span className="font-semibold text-charcoal-800 text-right">Wipe with soft cotton; shine with Pitambari / lime</span>
                </div>
              </div>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="mt-6 pt-4 border-t border-[#EBD9B0]/60 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#EBD9B0] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-charcoal-700 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-charcoal-700 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3 px-4 border border-[#C5A059] text-charcoal-900 hover:bg-[#C5A059]/10 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-lg border transition ${
                    inWishlist
                      ? 'border-rose-400 bg-rose-50 text-rose-600'
                      : 'border-[#EBD9B0] bg-white text-charcoal-700 hover:text-rose-600'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Instant Buy (UPI / Razorpay / PayU) */}
              <button
                onClick={handleInstantBuy}
                className="w-full py-3.5 px-4 bg-[#231F1C] hover:bg-[#C5A059] text-white rounded-lg text-xs sm:text-sm font-bold uppercase tracking-widest transition shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles size={16} className="text-[#DFBE7D]" />
                <span>Instant Buy (UPI / Cards)</span>
              </button>

              {/* WhatsApp Enquiry Link */}
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <MessageCircle size={16} className="text-emerald-600" />
                <span>Enquire or Custom Order via WhatsApp</span>
              </a>

              {/* Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-gray-500 text-center">
                <div className="flex flex-col items-center">
                  <ShieldCheck size={16} className="text-[#C5A059] mb-0.5" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck size={16} className="text-[#C5A059] mb-0.5" />
                  <span>Express Courier</span>
                </div>
                <div className="flex flex-col items-center">
                  <RefreshCw size={16} className="text-[#C5A059] mb-0.5" />
                  <span>7-Day Easy Return</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
