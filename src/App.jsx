import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryPills } from './components/CategoryPills';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { DokraStory } from './components/DokraStory';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.craft.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default popular
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const scrollToProducts = () => {
    const el = document.getElementById('products-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#231F1C]">
      {/* Top Header */}
      <Header
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToProducts();
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onExploreClick={scrollToProducts} />

        {/* Categories Bar */}
        <div id="products-grid">
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Product Catalog Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Controls Bar: Count & Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#EBD9B0]/60 gap-4">
            <div>
              <p className="text-xs sm:text-sm text-charcoal-600 font-medium">
                Showing <strong className="text-charcoal-900">{filteredProducts.length}</strong> handcrafted pieces
                {searchQuery && <span> for "<span className="text-[#A0772D]">{searchQuery}</span>"</span>}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <SlidersHorizontal size={14} className="text-charcoal-500" />
              <span className="text-gray-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#EBD9B0] rounded-lg px-2.5 py-1 text-charcoal-800 text-xs focus:outline-none focus:border-[#C5A059]"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#EBD9B0] my-8 p-6">
              <Sparkles size={36} className="mx-auto text-[#C5A059] mb-3" />
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                No matching handcrafted creations found
              </h3>
              <p className="text-xs text-charcoal-600 mt-1 max-w-sm mx-auto">
                Try searching with different terms or reset your category filter to explore all pieces.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 bg-[#231F1C] text-white text-xs font-semibold rounded-full hover:bg-[#C5A059] transition"
              >
                View All Dokra Pieces
              </button>
            </div>
          )}
        </section>

        {/* 4,000 Year Dokra Story Narrative */}
        <DokraStory />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={setSelectedCategory} />

      {/* Mobile Sticky Navigation Bar */}
      <MobileBottomNav
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToProducts();
        }}
        onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Drawers and Modals */}
      <CartDrawer />
      <CheckoutModal />
      <ProductModal />
    </div>
  );
}

export default App;
