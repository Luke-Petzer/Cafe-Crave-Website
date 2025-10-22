import React, { useEffect, useState } from 'react';
import { StarIcon, ExternalLinkIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
    id: number;
    name: string;
    rating: number;
    text: string;
    date: string;
}

interface GoogleReviewsProps {
    standalone?: boolean;
}

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({ standalone = true }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(1); // Start at 1 because we'll add clones
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    useEffect(() => {
        const fetchReviews = async () => {
            // Use the backend server URL from environment variable
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const endpoint = `${apiUrl}/reviews`;

            console.log('🔄 Frontend: Fetching reviews from:', endpoint);
            console.log('⏰ Frontend: Timestamp:', new Date().toISOString());

            try {
                const response = await fetch(endpoint); // Fixed: use endpoint instead of apiUrl
                console.log('📡 Frontend: Response status:', response.status);
                console.log('📡 Frontend: Response ok:', response.ok);

                const data = await response.json();
                console.log('📦 Frontend: Raw data received:', JSON.stringify(data, null, 2));
                console.log('   - Reviews count:', data.reviews?.length || 0);
                console.log('   - Rating:', data.rating);
                console.log('   - Error:', data.error || 'none');

                // Log each review individually
                if (data.reviews && Array.isArray(data.reviews)) {
                    console.log('📝 Frontend: Individual reviews:');
                    data.reviews.forEach((review: Review, i: number) => {
                        console.log(`   Review ${i + 1}:`, {
                            name: review.name,
                            rating: review.rating,
                            text: review.text?.substring(0, 50) + '...',
                            date: review.date
                        });
                    });
                }

                setReviews(data.reviews || []);
                setAverageRating(data.rating || 0);

                if (data.reviews && data.reviews.length > 0) {
                    console.log('✅ Frontend: Successfully set', data.reviews.length, 'reviews to state');
                } else {
                    console.warn('⚠️ Frontend: No reviews in response or empty array');
                }
            } catch (error) {
                console.error('❌ Frontend: Error fetching reviews:', error);
                if (error instanceof Error) {
                    console.error('❌ Frontend: Error details:', {
                        message: error.message,
                        stack: error.stack
                    });
                }
            } finally {
                setLoading(false);
                console.log('🏁 Frontend: Finished loading reviews');
                console.log('================================\n');
            }
        };

        fetchReviews();
    }, []);

    // Carousel navigation functions with seamless infinite loop
    const goToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const goToPrevious = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const goToSlide = (index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(index + 1); // +1 because of the cloned first slide
    };

    // Handle the transition end to create infinite loop effect
    const handleTransitionEnd = () => {
        setIsTransitioning(false);

        // If we're at the cloned last slide, jump to the real first slide
        if (currentIndex === reviews.length + 1) {
            setCurrentIndex(1);
        }
        // If we're at the cloned first slide, jump to the real last slide
        if (currentIndex === 0) {
            setCurrentIndex(reviews.length);
        }
    };

    // Auto-play carousel - advances every 8 seconds
    useEffect(() => {
        if (reviews.length === 0 || isTransitioning) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 8000);

        return () => clearInterval(interval);
    }, [reviews.length, isTransitioning]);

    // Create extended array with clones for infinite loop
    const getExtendedReviews = () => {
        if (reviews.length === 0) return [];

        // Clone last review at the beginning and first review at the end
        const lastReview = reviews[reviews.length - 1];
        const firstReview = reviews[0];

        return [lastReview, ...reviews, firstReview];
    };

    const extendedReviews = getExtendedReviews();

    const content = (
        <>
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-['Rockwell',serif] font-bold mb-4 text-lightText">
                    What Our Guests Say
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>

                {!loading && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-4xl font-bold text-lightText">
                            {averageRating ? averageRating.toFixed(1) : '—'}
                        </span>
                        <div>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        size={20}
                                        className={
                                            i < Math.round(averageRating)
                                                ? 'text-accent'
                                                : 'text-gray-400'
                                        }
                                        fill={i < Math.round(averageRating) ? 'currentColor' : 'none'}
                                    />
                                ))}
                            </div>
                            <p className="text-sm opacity-70 text-lightText">Google Reviews</p>
                        </div>
                    </div>
                )}
            </div>

            {loading ? (
                <p className="text-center opacity-70 text-lightText">Loading reviews...</p>
            ) : (
                <>
                    {/* Carousel Layout */}
                    {reviews.length > 0 ? (
                        <div className="relative max-w-5xl mx-auto mb-12">
                            {/* Carousel Container */}
                            <div className="relative overflow-hidden">
                                {/* Review Cards */}
                                <div
                                    className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
                                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    onTransitionEnd={handleTransitionEnd}
                                >
                                    {extendedReviews.map((review, index) => (
                                        <div
                                            key={`review-${index}`}
                                            className="w-full flex-shrink-0 px-4"
                                        >
                                            <div className="bg-light text-lightText p-8 md:p-10 rounded-lg shadow-xl border-2 border-accent border-opacity-30 transform transition-all duration-300 hover:shadow-2xl">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarIcon
                                                                key={i}
                                                                size={24}
                                                                className={
                                                                    i < review.rating ? 'text-accent' : 'text-gray-300'
                                                                }
                                                                fill={i < review.rating ? 'currentColor' : 'none'}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm opacity-70 text-lightText">{review.date}</span>
                                                </div>
                                                <p className="text-lg md:text-xl mb-6 italic leading-relaxed text-lightText min-h-[120px]">
                                                    "{review.text}"
                                                </p>
                                                <p className="text-lg font-semibold text-lightText">— {review.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            {reviews.length > 1 && (
                                <>
                                    {/* Previous Button */}
                                    <button
                                        onClick={goToPrevious}
                                        disabled={isTransitioning}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-accent hover:bg-opacity-90 text-light p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Previous review"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                    {/* Next Button */}
                                    <button
                                        onClick={goToNext}
                                        disabled={isTransitioning}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-accent hover:bg-opacity-90 text-light p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Next review"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}

                            {/* Dot Indicators */}
                            {reviews.length > 1 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    {reviews.map((_, index) => {
                                        // Calculate which dot should be active based on current position
                                        let activeIndex = currentIndex - 1;
                                        if (currentIndex === 0) activeIndex = reviews.length - 1;
                                        if (currentIndex === reviews.length + 1) activeIndex = 0;

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => goToSlide(index)}
                                                disabled={isTransitioning}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 disabled:cursor-not-allowed ${
                                                    index === activeIndex
                                                        ? 'bg-accent w-8'
                                                        : 'bg-lightText bg-opacity-30 hover:bg-opacity-50'
                                                }`}
                                                aria-label={`Go to review ${index + 1}`}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-center opacity-70 text-lightText">
                            No reviews available yet.
                        </p>
                    )}
                </>
            )}

            {/* Call to Action */}
            <div className="text-center">
                <a
                    href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                >
                    Leave a Review on Google
                    <ExternalLinkIcon size={18} className="ml-2" />
                </a>
            </div>
        </>
    );

    if (standalone) {
        return (
            <section className="section-light text-lightText py-20 md:py-28">
                <div className="container mx-auto px-6 md:px-10 lg:px-16">
                    {content}
                </div>
            </section>
        );
    }

    return content;
};