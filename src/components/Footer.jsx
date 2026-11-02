import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, ShieldCheck, Heart } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

export const Footer = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#1B1816] text-[#FAF8F5] pt-16 pb-24 lg:pb-12 border-t border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-[#C5A059]">
                <img src={logoImg} alt="Nyishi Collections Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Nyishi
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#DFBE7D] uppercase font-semibold">
                  Collections
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-light max-w-sm">
              Reviving India’s 4,000-year-old Dokra bell metal craft into wearable jewelry and heirloom home decor. Ethically sourced and handcrafted directly with tribal artisan families.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[#DFBE7D]">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition">
                <Facebook size={16} />
              </a>
              <a href="mailto:support@nyishicollections.com" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Collections */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#DFBE7D] mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => onSelectCategory('necklaces')} className="hover:text-white transition">
                  Dokra Hasuli & Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('earrings')} className="hover:text-white transition">
                  Tribal Earrings & Studs
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('bangles')} className="hover:text-white transition">
                  Hand-Cast Bangles
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('dokra-art')} className="hover:text-white transition">
                  Dokra Sculptures & Art
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#DFBE7D] mb-4">
              Policies & Help
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition">Shipping & Delivery Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Returns & Exchange (7 Days)</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Brass Care & Maintenance</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#DFBE7D] mb-4">
              Artisan Atelier
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#DFBE7D] flex-shrink-0 mt-0.5" />
                <span>Dokra Artisan Cluster, Bankura & Jharkhand / HQ India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#DFBE7D] flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#DFBE7D] flex-shrink-0" />
                <span>contact@nyishicollections.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Gateway Badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Nyishi Collections (nyishicollections.com). All rights reserved.</p>

          <div className="flex items-center gap-3 text-gray-300 flex-wrap justify-center">
            <span className="text-[10px] uppercase tracking-wider text-gray-400">Supported Gateways:</span>
            <span className="px-2 py-0.5 bg-white/10 rounded font-semibold text-[10px] text-white">Razorpay</span>
            <span className="px-2 py-0.5 bg-white/10 rounded font-semibold text-[10px] text-white">PayU</span>
            <span className="px-2 py-0.5 bg-white/10 rounded font-semibold text-[10px] text-white">UPI / GPay</span>
            <span className="px-2 py-0.5 bg-white/10 rounded font-semibold text-[10px] text-white">RuPay / Cards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
