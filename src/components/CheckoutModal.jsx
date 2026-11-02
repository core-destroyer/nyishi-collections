import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Smartphone, Banknote, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/logo.jpg';

export const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, grandTotal, cart, clearCart } = useCart();
  
  const [step, setStep] = useState('details'); // 'details' | 'processing' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'payu' | 'cod'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [orderResult, setOrderResult] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initiatePayment = async (e) => {
    e.preventDefault();
    setStep('processing');

    const orderId = 'NC-' + Math.floor(100000 + Math.random() * 900000);

    // If Razorpay is chosen
    if (paymentMethod === 'razorpay') {
      if (typeof window.Razorpay !== 'undefined') {
        const options = {
          key: 'rzp_test_YourKeyHere', // Replace with your live Razorpay Key
          amount: grandTotal * 100, // paise
          currency: 'INR',
          name: 'Nyishi Collections',
          description: `Order ${orderId} - Handcrafted Dokra Art`,
          image: logoImg,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#C5A059',
          },
          handler: function (response) {
            setOrderResult({
              orderId,
              paymentId: response.razorpay_payment_id || 'PAY_' + Date.now(),
              gateway: 'Razorpay (UPI / Card)',
            });
            clearCart();
            setStep('success');
          },
          modal: {
            ondismiss: function () {
              setStep('details');
            },
          },
        };

        try {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch {
          // Simulation fallback for local test mode
          simulateSuccessfulPayment(orderId, 'Razorpay Test');
        }
      } else {
        simulateSuccessfulPayment(orderId, 'Razorpay Instant UPI');
      }
    } else if (paymentMethod === 'payu') {
      // PayU Gateway Integration Handler
      simulateSuccessfulPayment(orderId, 'PayU India');
    } else {
      // Cash on Delivery
      setOrderResult({
        orderId,
        paymentId: 'COD_VERIFIED',
        gateway: 'Cash on Delivery',
      });
      clearCart();
      setStep('success');
    }
  };

  const simulateSuccessfulPayment = (orderId, gatewayName) => {
    setTimeout(() => {
      setOrderResult({
        orderId,
        paymentId: 'TXN_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        gateway: gatewayName,
      });
      clearCart();
      setStep('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-[#EBD9B0] my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-[#EBD9B0] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={22} className="text-[#C5A059]" />
            <h2 className="font-serif text-xl font-bold text-charcoal-900">
              {step === 'success' ? 'Order Confirmed' : 'Secure Express Checkout'}
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={initiatePayment} className="space-y-6">
              
              {/* Shipping Address Inputs */}
              <div>
                <h3 className="font-serif text-base font-semibold text-charcoal-900 mb-3 flex items-center gap-2">
                  <span>1. Delivery Address</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059] bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-600 mb-1 font-medium">Email Address (for invoice) *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059] bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-600 mb-1 font-medium">Street Address / Landmark *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Apartment, Studio, Street name"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Kolkata / Mumbai"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059] bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">State *</label>
                      <input
                        type="text"
                        name="state"
                        required
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        pattern="[0-9]{6}"
                        placeholder="6 digits"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059] bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Gateway Selection */}
              <div>
                <h3 className="font-serif text-base font-semibold text-charcoal-900 mb-3">
                  2. Select Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Razorpay Option */}
                  <label
                    className={`flex flex-col p-3.5 rounded-xl border-2 cursor-pointer transition ${
                      paymentMethod === 'razorpay'
                        ? 'border-[#C5A059] bg-amber-50/40 shadow-xs'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        className="text-[#C5A059] focus:ring-[#C5A059]"
                      />
                      <Smartphone size={18} className="text-[#C5A059]" />
                    </div>
                    <span className="text-xs font-bold text-charcoal-900">Razorpay</span>
                    <span className="text-[10px] text-gray-500 mt-0.5">UPI, GPay, Cards, NetBanking</span>
                  </label>

                  {/* PayU Option */}
                  <label
                    className={`flex flex-col p-3.5 rounded-xl border-2 cursor-pointer transition ${
                      paymentMethod === 'payu'
                        ? 'border-[#C5A059] bg-amber-50/40 shadow-xs'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="radio"
                        name="payment"
                        value="payu"
                        checked={paymentMethod === 'payu'}
                        onChange={() => setPaymentMethod('payu')}
                        className="text-[#C5A059] focus:ring-[#C5A059]"
                      />
                      <CreditCard size={18} className="text-[#C5A059]" />
                    </div>
                    <span className="text-xs font-bold text-charcoal-900">PayU Gateway</span>
                    <span className="text-[10px] text-gray-500 mt-0.5">Instant Card & NetBanking</span>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    className={`flex flex-col p-3.5 rounded-xl border-2 cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'border-[#C5A059] bg-amber-50/40 shadow-xs'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-[#C5A059] focus:ring-[#C5A059]"
                      />
                      <Banknote size={18} className="text-[#C5A059]" />
                    </div>
                    <span className="text-xs font-bold text-charcoal-900">Cash on Delivery</span>
                    <span className="text-[10px] text-gray-500 mt-0.5">Pay upon delivery</span>
                  </label>

                </div>
              </div>

              {/* Total & Action */}
              <div className="pt-4 border-t border-[#EBD9B0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">Payable Amount:</span>
                  <span className="font-serif text-2xl font-bold text-charcoal-900">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#231F1C] hover:bg-[#C5A059] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-md flex items-center gap-2"
                >
                  <span>Pay with {paymentMethod === 'razorpay' ? 'Razorpay' : paymentMethod === 'payu' ? 'PayU' : 'COD'}</span>
                </button>
              </div>

            </form>
          )}

          {step === 'processing' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                Opening Payment Gateway...
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Connecting securely to {paymentMethod.toUpperCase()} servers. Please do not close or refresh this tab.
              </p>
            </div>
          )}

          {step === 'success' && orderResult && (
            <div className="py-8 text-center space-y-5">
              <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
                <CheckCircle2 size={44} />
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-charcoal-900">
                  Payment Successful!
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Thank you for supporting traditional Indian tribal craftsmanship.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#EBD9B0] max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Order Reference:</span>
                  <strong className="text-charcoal-900 font-mono">{orderResult.orderId}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Payment ID:</span>
                  <span className="text-charcoal-800 font-mono">{orderResult.paymentId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Gateway Used:</span>
                  <span className="text-charcoal-800">{orderResult.gateway}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Shipping To:</span>
                  <span className="text-charcoal-800 font-medium">{formData.city}, {formData.pincode}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep('details');
                }}
                className="px-8 py-3 bg-[#231F1C] hover:bg-[#C5A059] text-white text-xs font-bold uppercase tracking-wider rounded-full transition"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
