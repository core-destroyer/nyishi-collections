import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    discountPercent,
    shippingFee,
    grandTotal,
    freeShippingThreshold,
    applyCoupon,
    couponCode,
    setIsCheckoutOpen
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);

  if (!isCartOpen) return null;

  const freeShippingDifference = freeShippingThreshold - subtotal;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#EBD9B0] transform transition-transform duration-300">
        
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBD9B0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#C5A059]" />
            <h2 className="font-serif text-xl font-bold text-charcoal-900">Your Craft Bag</h2>
            <span className="text-xs text-gray-500 font-medium">({cart.length} items)</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3 bg-[#FAF6F0] border-b border-[#EBD9B0]/60">
          <div className="text-xs text-charcoal-700 font-medium flex justify-between mb-1.5">
            {freeShippingDifference > 0 ? (
              <span>Add <strong className="text-[#A0772D]">₹{freeShippingDifference.toLocaleString('en-IN')}</strong> more for <strong>FREE Shipping</strong></span>
            ) : (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                🎉 Congratulations! You unlocked FREE Express Shipping
              </span>
            )}
            <span className="text-gray-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C5A059] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF6F0] border border-[#EBD9B0] flex items-center justify-center text-[#C5A059]">
                <ShoppingBag size={28} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-900">Your bag is empty</h3>
              <p className="text-xs text-charcoal-600 max-w-xs mx-auto">
                Explore our authentic Dokra necklaces, tribal earrings, and bell metal sculptures.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-6 py-2.5 bg-[#231F1C] text-white text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-[#C5A059] transition"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white rounded-xl border border-[#EBD9B0]/60 shadow-xs"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover bg-[#FAF6F0]"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-serif text-sm font-semibold text-charcoal-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-rose-600 p-1 transition"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <span className="text-[10px] text-[#A0772D] uppercase font-medium">
                      {item.craft}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded-md bg-[#FAF8F5]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-charcoal-700 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-charcoal-700 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif text-sm font-bold text-charcoal-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EBD9B0] space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. NYISHI10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059] uppercase"
                />
                <Tag size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#FAF6F0] hover:bg-[#231F1C] hover:text-white border border-[#EBD9B0] text-xs font-semibold rounded-lg transition"
              >
                Apply
              </button>
            </form>

            {couponFeedback && (
              <p className={`text-[11px] font-medium ${couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                {couponFeedback.message}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-gray-100">
              <div className="flex justify-between text-charcoal-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Craft Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-charcoal-600">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-charcoal-900 pt-2 border-t border-gray-200">
                <span>Grand Total</span>
                <span className="font-serif text-lg text-[#151311]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedCheckout}
              className="w-full py-3.5 bg-[#231F1C] hover:bg-[#C5A059] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <ShieldCheck size={12} className="text-[#C5A059]" />
              <span>Direct Razorpay & PayU Encrypted Checkout</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
