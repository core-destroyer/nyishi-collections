# Nyishi Collections (nyishicollections.com)

A high-performance, mobile-first e-commerce web platform for **Nyishi Collections**, specializing in handcrafted **Dhokra (Dokra) brass jewelry, lost-wax figurines, and Indian tribal artifacts**.

Inspired by the clean, luxury craft aesthetic of **Miharu.in**.

---

## 🌟 Key Features

1. **Brand Identity & Theme:**
   - Incorporates your custom **Nyishi Collections** feather logo.
   - Luxury heritage color palette (`#C5A059` warm gold, `#FAF8F5` sand/ivory, and `#231F1C` charcoal).
   - High-end typography pairing: *Cormorant Garamond* serif headings + *Inter* body.

2. **Mobile-First Native App Experience:**
   - **Sticky Bottom Navigation Bar:** Quick access to Home, Shop, Wishlist, Bag, and WhatsApp Chat.
   - **Horizontal Category Pills:** Smooth horizontal scrolling through Dokra Necklaces, Tribal Earrings, Bangles, and Art.
   - **Miharu-Style Image Flip:** Hover / touch flip to view product details and model shots.
   - **Slide-out Cart Drawer:** Dynamic free shipping progress bar, instant coupon application (`NYISHI10`).

3. **Payment Gateway Integrations:**
   - **Razorpay Standard SDK:** Instant UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, NetBanking.
   - **PayU India:** SHA-512 cryptographic hash generation & reverse response verification.
   - **Cash on Delivery (COD):** Domestic order handling.

4. **Storytelling & Authenticity:**
   - Dedicated **4,000-Year Dokra Craft Story** section detailing the ancient lost-wax casting technique.
   - Fair-trade artisan empowerment and material care instructions.

---

## 🚀 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Keys (Optional for live payments)
Copy `.env.example` to `.env` and insert your Razorpay / PayU credentials:
```bash
cp .env.example .env
```

### 3. Start Frontend Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Start Fullstack / API Server
```bash
npm run server
```
Runs the Express backend on [http://localhost:5000](http://localhost:5000) for payment signature verification.

---

## 📦 Building for Production

```bash
npm run build
```
Creates an optimized static bundle in the `dist/` directory ready for deployment to **MilesWeb** or **Vercel**.
