import React from 'react';
import { Flame, Feather, Users, Sparkles } from 'lucide-react';

export const DokraStory = () => {
  const steps = [
    {
      step: '01',
      title: 'Clay Core Sculpting',
      desc: 'The artisan shapes a fine core using natural riverbed clay and rice husk, defining the foundational silhouette of each ornament.'
    },
    {
      step: '02',
      title: 'Pure Beeswax Wiring',
      desc: 'Beeswax mixed with natural tree resins is extruded into micro-threads and wrapped painstakingly by hand to generate the iconic ribbed textures.'
    },
    {
      step: '03',
      title: 'Lost-Wax Molten Cast',
      desc: 'Enclosed in an outer clay layer, molten scrap brass and bell metal are poured into the kiln. The wax melts away, replaced forever by metal.'
    },
    {
      step: '04',
      title: 'Breaking the Mould & Polish',
      desc: 'Because each clay mould must be broken to liberate the metal piece inside, no duplicate exists anywhere in the world. It is truly one-of-a-kind.'
    }
  ];

  return (
    <section id="dokra-story" className="py-16 sm:py-24 bg-[#FAF6F0] border-y border-[#EBD9B0]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBD9B0] text-[#724622] text-xs font-semibold tracking-widest uppercase">
            <Feather size={14} className="text-[#C5A059]" />
            Living Indian Heritage
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight">
            The 4,000-Year-Old Soul of <span className="italic font-medium text-[#A0772D]">Dokra Craft</span>
          </h2>

          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed font-light">
            Dating back to the legendary bronze <em>Dancing Girl of Mohenjo-daro</em>, Dokra is India's most ancient non-ferrous lost-wax casting technique. When you wear a piece from <strong>Nyishi Collections</strong>, you wear living history.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-xl p-6 border border-[#EBD9B0]/80 shadow-sm hover:shadow-lg transition-all duration-300 relative group"
            >
              <span className="font-serif text-4xl font-bold text-[#EBD9B0] group-hover:text-[#C5A059] transition-colors block mb-2">
                {item.step}
              </span>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Artisan Impact Banner */}
        <div className="mt-12 bg-[#231F1C] text-[#FAF8F5] rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#C5A059]/40">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#DFBE7D] flex-shrink-0">
              <Users size={28} />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                Empowering Indigenous Artisan Guilds
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl font-light">
                Every purchase directly finances tribal artisans, supporting families and sustaining sacred generational handicraft traditions.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A059]/10 border border-[#C5A059] text-[#DFBE7D] text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={16} />
              Fair-Trade Certified
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
