import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { About } from './pages/About';
import { ContactPage } from './pages/ContactPage';
import { MenuPage } from './pages/MenuPage';
import { MusicPage } from './pages/MusicPage';
import { EventsPage } from './pages/EventsPage';
import { ScrollToTop } from './components/ScrollToTop';

export function AppRouter() {
    return (
        <BrowserRouter>
            {/* We removed the 'behavior' prop as the component now handles this logic internally */}
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/music" element={<MusicPage />} />
                <Route path="/events" element={<EventsPage />} />
            </Routes>
        </BrowserRouter>
    );
}