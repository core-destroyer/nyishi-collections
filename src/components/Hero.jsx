import React from 'react';
import { ArrowRight, Sparkles, Award, Shield, HeartHandshake } from 'lucide-react';

export const Hero = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4ECE1] to-[#FAF8F5] py-12 lg:py-20 border-b border-[#EBD9B0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Story & Headline */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBD9B0]/60 border border-[#C5A059]/40 text-[#724622] text-xs font-semibold tracking-widest uppercase">
              <Sparkles size={14} className="text-[#C5A059]" />
              Authentic Tribal Dokra Craft
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#151311] font-normal leading-[1.15] tracking-tight">
              Wear 4,000 Years of <br />
              <span className="italic font-medium text-[#A0772D] relative">
                Timeless Heritage
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#DFBE7D]/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-charcoal-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Each piece of <strong>Nyishi Collections</strong> is individually hand-cast using ancient lost-wax bell metal techniques. No two creations are identical—every curve carries the fingerprint of tribal masters.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#231F1C] text-[#FAF8F5] hover:bg-[#C5A059] rounded-full font-medium text-sm tracking-wider uppercase transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Shop Jewelry</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#dokra-story"
                className="w-full sm:w-auto px-7 py-3.5 border border-[#C5A059] text-[#724622] hover:bg-[#C5A059]/10 rounded-full font-medium text-sm tracking-wider uppercase transition text-center"
              >
                The Dokra Story
              </a>
            </div>

            {/* Micro Trust Proofs */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#EBD9B0]/80">
              <div className="flex items-center gap-2 text-left">
                <Award size={20} className="text-[#C5A059] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs text-charcoal-700 font-medium">100% Lost-Wax Cast</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <HeartHandshake size={20} className="text-[#C5A059] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs text-charcoal-700 font-medium">Fair Trade Artisans</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Shield size={20} className="text-[#C5A059] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs text-charcoal-700 font-medium">Secure UPI & Card</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card with Floating Accent */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-3 rounded-3xl border-2 border-[#C5A059]/30 transform rotate-2"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-[#EBD9B0]">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85"
                  alt="Dokra Statement Necklace Collection"
                  className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-block px-2.5 py-1 bg-[#C5A059] text-white text-[10px] font-bold uppercase tracking-widest rounded mb-1">
                    Featured Masterpiece
                  </div>
                  <h3 className="font-serif text-2xl font-bold">Mayur Dokra Statement Hasuli</h3>
                  <p className="text-xs text-gray-200 mt-1">Authentic brass lost-wax collar necklace with organic cord</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                    <span className="text-xl font-semibold text-[#DFBE7D]">₹2,499</span>
                    <button
                      onClick={onExploreClick}
                      className="text-xs font-semibold uppercase tracking-wider text-white hover:text-[#DFBE7D] flex items-center gap-1 underline underline-offset-4"
                    >
                      View Piece
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-3 sm:p-4 rounded-xl shadow-xl border border-[#C5A059]/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#C5A059] font-bold">
                  ✨
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal-900 leading-tight">4,000 Yrs Old</p>
                  <p className="text-[10px] text-charcoal-600">Dhokra Lost-Wax Heritage</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
