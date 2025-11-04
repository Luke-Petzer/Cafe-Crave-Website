import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ArrowRightIcon } from 'lucide-react';

const upcomingEvents = [
	{
		id: 1,
		title: 'Trivia Night',
		date: 'Every Wednesday',
		time: '7:00 PM',
		image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
		category: 'Community',
	},
	{
		id: 2,
		title: 'Live Acoustic Music',
		date: 'Friday, July 21',
		time: '6:30 PM',
		image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
		category: 'Music',
	},
];

interface EventPreviewProps {
	showHeader?: boolean;
	showViewAllButton?: boolean;
}

export const EventPreview: React.FC<EventPreviewProps> = ({
	showHeader = true,
	showViewAllButton = true
}) => {
	return (
		<section className={showHeader ? "py-20 md:py-28" : ""}>
			<div className={showHeader ? "container mx-auto px-6 md:px-10 lg:px-16" : ""}>
				{showHeader && (
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
							Upcoming Events
						</h2>
						<div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
						<p className="max-w-2xl mx-auto">
							Join us for community gatherings, live music, and special events
						</p>
					</div>
				)}

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
					{upcomingEvents.map((event) => (
						<div
							key={event.id}
							className="bg-white rounded-lg overflow-hidden shadow-md border border-redText border-opacity-20 transform transition-all duration-150 hover:-translate-y-2 hover:shadow-lg"
						>
							<div className="h-48 overflow-hidden relative">
								<img
									src={event.image}
									alt={event.title}
									className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
								/>
								<span className="absolute top-3 right-3 bg-accent text-light text-xs px-3 py-1 rounded-full font-medium">
									{event.category}
								</span>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-serif font-bold text-darkBg mb-2">
									{event.title}
								</h3>
								<div className="flex items-center text-accent mb-4">
									<CalendarIcon size={16} className="mr-2" />
									<span className="text-sm font-medium text-darkBg">
										{event.date} • {event.time}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{showViewAllButton && (
					<div className="text-center">
						<Link
							to="/events"
							className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
						>
							View All Events
							<ArrowRightIcon size={18} className="ml-2" />
						</Link>
					</div>
				)}
			</div>
		</section>
	);
};
