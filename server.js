import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Razorpay from 'razorpay';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve built frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

// ----------------------------------------------------
// 1. RAZORPAY PAYMENT GATEWAY ENDPOINTS
// ----------------------------------------------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholderKey',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholderSecret',
});

// Create Razorpay Order
app.post('/api/razorpay/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt = 'rcpt_' + Date.now() } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order', details: error.message });
  }
});

// Verify Razorpay Payment Signature
app.post('/api/razorpay/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET || 'placeholderSecret';

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      // Payment is authentic & verified
      res.json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Razorpay verification error:', error);
    res.status(500).json({ error: 'Payment verification failed', details: error.message });
  }
});

// ----------------------------------------------------
// 2. PAYU INDIA PAYMENT GATEWAY ENDPOINTS
// ----------------------------------------------------
const PAYU_KEY = process.env.PAYU_KEY || 'payu_merchant_key';
const PAYU_SALT = process.env.PAYU_SALT || 'payu_merchant_salt';

// Generate PayU SHA-512 Hash
app.post('/api/payu/generate-hash', (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email, udf1 = '', udf2 = '', udf3 = '', udf4 = '', udf5 = '' } = req.body;

    if (!txnid || !amount || !productinfo || !firstname || !email) {
      return res.status(400).json({ error: 'Missing required PayU parameters' });
    }

    // Formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
    const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${PAYU_SALT}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    res.json({
      key: PAYU_KEY,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      hash,
    });
  } catch (error) {
    console.error('PayU hash generation error:', error);
    res.status(500).json({ error: 'Failed to generate PayU hash', details: error.message });
  }
});

// Verify PayU Response Hash
app.post('/api/payu/verify-payment', (req, res) => {
  try {
    const { status, txnid, amount, productinfo, firstname, email, additionalCharges = '', hash } = req.body;

    // Reverse formula: sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
    let hashString = '';
    if (additionalCharges) {
      hashString = `${additionalCharges}|${PAYU_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_KEY}`;
    } else {
      hashString = `${PAYU_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_KEY}`;
    }

    const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

    if (calculatedHash === hash && status === 'success') {
      res.json({ success: true, message: 'PayU payment verified successfully', txnid });
    } else {
      res.status(400).json({ success: false, message: 'PayU payment verification failed or status unsuccessful' });
    }
  } catch (error) {
    console.error('PayU response verification error:', error);
    res.status(500).json({ error: 'Verification failed', details: error.message });
  }
});

// Fallback for SPA routing in production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Nyishi Collections API Server running on port ${PORT}`);
});
