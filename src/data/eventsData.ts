/**
 * Events Data - Community Notice Board
 *
 * Central data file for all upcoming events at Crave Café
 * Easily update this file to add/remove/modify events
 */

export interface Event {
  id: number;
  date: string;
  month: string;
  title: string;
  time: string;
  price: string;
  description: string;
  category: 'music' | 'community' | 'workshop' | 'private';
  featured?: boolean;
}

export const eventsData: Event[] = [
  {
    id: 1,
    date: "15",
    month: "DEC",
    title: "Vinyl & Vino Night",
    time: "19:00",
    price: "Free Entry",
    description: "Bring your own records or listen to our curated jazz selection. BYOB welcome. An evening of smooth grooves and good conversation.",
    category: 'music',
    featured: true
  },
  {
    id: 2,
    date: "17",
    month: "DEC",
    title: "Sunday Chess Club",
    time: "09:00",
    price: "R50 Entry",
    description: "Open to all skill levels. Coffee and pastries included in entry fee. Boards and pieces provided.",
    category: 'community',
    featured: false
  },
  {
    id: 3,
    date: "20",
    month: "DEC",
    title: "Live Jazz: The Blue Note Trio",
    time: "20:00",
    price: "R120 pp",
    description: "An evening of smooth sax and double bass. Limited seating — booking essential. Light bites available.",
    category: 'music',
    featured: true
  },
  {
    id: 4,
    date: "22",
    month: "DEC",
    title: "Board Game Marathon",
    time: "14:00",
    price: "R40 Entry",
    description: "Bring your favorite games or try ours. Strategy, party games, and classics. Pizza and refreshments available for purchase.",
    category: 'community',
    featured: false
  },
  {
    id: 5,
    date: "27",
    month: "DEC",
    title: "Coffee Brewing Workshop",
    time: "10:00",
    price: "R150 pp",
    description: "Learn pour-over techniques, espresso basics, and latte art from our head barista. Includes tasting session and take-home beans.",
    category: 'workshop',
    featured: false
  }
];

// Helper function to get featured events
export const getFeaturedEvents = (): Event[] => {
  return eventsData.filter(event => event.featured);
};

// Helper function to get events by category
export const getEventsByCategory = (category: Event['category']): Event[] => {
  return eventsData.filter(event => event.category === category);
};

