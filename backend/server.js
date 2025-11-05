/* eslint-env node */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your frontend
const allowedOrigins = [
    'http://localhost:5173',
    'https://cafecravecpt.co.za',
    'https://www.cafecravecpt.co.za'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Reviews endpoint
app.get('/api/reviews', async (req, res) => {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

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
        const response = await fetch(url);
        const data = await response.json();

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

        const reviews = data.result.reviews?.slice(0, 6).map((r, index) => ({
            id: index,
            name: r.author_name,
            rating: r.rating,
            text: r.text,
            date: r.relative_time_description,
        })) || [];

        const responseData = {
            reviews,
            rating: data.result.rating || 0,
            place_name: data.result.name
        };

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
    const config = {
        hasApiKey: !!process.env.GOOGLE_MAPS_API_KEY,
        hasPlaceId: !!process.env.GOOGLE_PLACE_ID,
        apiKeyPrefix: process.env.GOOGLE_MAPS_API_KEY ? process.env.GOOGLE_MAPS_API_KEY.substring(0, 10) + '...' : 'NOT SET',
        placeIdPrefix: process.env.GOOGLE_PLACE_ID ? process.env.GOOGLE_PLACE_ID.substring(0, 15) + '...' : 'NOT SET',
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
        port: PORT
    };
    res.json(config);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
