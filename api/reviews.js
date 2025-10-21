// API route for fetching Google Reviews
// This runs on the server side to keep your API key secure

export default async function handler(req, res) {
  // Your Google Place ID - find it at: https://developers.google.com/maps/documentation/places/web-service/place-id
  const placeId = process.env.VITE_GOOGLE_PLACE_ID || 'YOUR_PLACE_ID_HERE';

  // API Key stored securely in environment variables
  const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;

  // Check if API key is configured
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return res.status(500).json({
      error: 'Google Maps API key not configured',
      reviews: [],
      rating: 0
    });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // Check if the API request was successful
    if (data.status !== 'OK') {
      console.error('Google API Error:', data.status);
      return res.status(500).json({
        error: data.status,
        reviews: [],
        rating: 0
      });
    }

    // Map and limit the number of reviews
    const reviews = data.result.reviews?.slice(0, 6).map((r, index) => ({
      id: index,
      name: r.author_name,
      rating: r.rating,
      text: r.text,
      date: r.relative_time_description,
    })) || [];

    // Return reviews and overall rating
    res.status(200).json({
      reviews,
      rating: data.result.rating || 0
    });

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    res.status(500).json({
      error: 'Failed to fetch reviews',
      reviews: [],
      rating: 0
    });
  }
}

