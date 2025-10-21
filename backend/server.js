/* eslint-env node */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Reviews endpoint with detailed logging
app.get('/api/reviews', async (req, res) => {
  console.log('\n🔍 ================================');
  console.log('🔍 === REVIEWS API CALLED ===');
  console.log('🔍 ================================');
  console.log('⏰ Timestamp:', new Date().toISOString());

  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  console.log('📋 Environment Check:');
  console.log('  - Place ID:', placeId ? `${placeId.substring(0, 10)}...` : '❌ MISSING');
  console.log('  - API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : '❌ MISSING');

  if (!apiKey || !placeId) {
    console.error('❌ ERROR: Missing API credentials');
    return res.status(500).json({
      error: 'API configuration missing',
      reviews: [],
      rating: 0,
      debug: {
        hasApiKey: !!apiKey,
        hasPlaceId: !!placeId
      }
    });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
    console.log('🌐 Calling Google Places API...');

    const response = await fetch(url);
    const data = await response.json();

    console.log('📊 Google API Response Status:', data.status);

    if (data.status !== 'OK') {
      console.error('❌ Google API Error:', data.status);
      console.error('   Error Message:', data.error_message || 'No error message');
      return res.status(500).json({
        error: data.status,
        error_message: data.error_message,
        reviews: [],
        rating: 0
      });
    }

    console.log('✅ Data received from Google:');
    console.log('   - Place Name:', data.result?.name);
    console.log('   - Rating:', data.result?.rating);
    console.log('   - Number of Reviews:', data.result?.reviews?.length || 0);

    // Log raw review data
    if (data.result?.reviews) {
      console.log('\n📝 Raw Google Reviews:');
      data.result.reviews.forEach((r, i) => {
        console.log(`\n   Review ${i + 1}:`);
        console.log(`      Author: ${r.author_name}`);
        console.log(`      Rating: ${r.rating}`);
        console.log(`      Date: ${r.relative_time_description}`);
        console.log(`      Text: ${r.text.substring(0, 100)}...`);
      });
    }

    const reviews = data.result.reviews?.slice(0, 6).map((r, index) => {
      const mappedReview = {
        id: index,
        name: r.author_name,
        rating: r.rating,
        text: r.text,
        date: r.relative_time_description,
      };
      console.log(`\n   ✅ Mapped Review ${index + 1}:`, JSON.stringify(mappedReview, null, 2));
      return mappedReview;
    }) || [];

    const responseData = {
      reviews,
      rating: data.result.rating || 0,
      place_name: data.result.name
    };

    console.log('\n📤 Final Response Data:');
    console.log('   - Reviews Array Length:', responseData.reviews.length);
    console.log('   - Rating:', responseData.rating);
    console.log('   - Place Name:', responseData.place_name);
    console.log('   - Full Response:', JSON.stringify(responseData, null, 2));

    console.log('\n✅ Sending response with', reviews.length, 'reviews');
    console.log('🔍 ================================');
    console.log('🔍 === END REVIEWS API ===');
    console.log('🔍 ================================\n');

    res.status(200).json(responseData);

  } catch (error) {
    console.error('❌ FATAL ERROR:', error);
    console.error('   Stack:', error.stack);
    res.status(500).json({
      error: 'Failed to fetch reviews',
      error_details: error.message,
      reviews: [],
      rating: 0
    });
  }
});

// Test endpoint to verify configuration
app.get('/api/test', (req, res) => {
  console.log('\n🧪 === TEST ENDPOINT CALLED ===');
  const config = {
    hasApiKey: !!process.env.GOOGLE_MAPS_API_KEY,
    hasPlaceId: !!process.env.GOOGLE_PLACE_ID,
    apiKeyPrefix: process.env.GOOGLE_MAPS_API_KEY ? process.env.GOOGLE_MAPS_API_KEY.substring(0, 10) + '...' : 'NOT SET',
    placeIdPrefix: process.env.GOOGLE_PLACE_ID ? process.env.GOOGLE_PLACE_ID.substring(0, 15) + '...' : 'NOT SET',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    port: PORT
  };
  console.log('📋 Configuration:', config);
  console.log('=== END TEST ===\n');
  res.json(config);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log('\n🚀 ================================');
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log('🚀 ================================');
  console.log('📍 Available endpoints:');
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log(`   - http://localhost:${PORT}/api/reviews`);
  console.log('🚀 ================================\n');
});
