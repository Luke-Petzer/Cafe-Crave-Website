import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cafeLogoIcon from '../assets/old-logo.svg';

// import cafeLogo from '../assets/cafe-logo.svg'; // I've commented this out and used a placeholder below

// Every page (App.tsx, About.tsx, MenuPage.tsx, ...) renders its OWN
// <Header/> as a sibling of its own <main>/<Footer> - there is no shared
// layout wrapper. That means a cross-route navigation doesn't update one
// persisting Header instance: react-router swaps <Routes> to a whole new
// matched element, so the CURRENT Header (with its open, opaque overlay) is
// unmounted and a brand new Header mounts for the destination page,
// starting from scratch. Verified empirically (a tagged DOM node was gone
// on the very next microtask) - there's no surviving overlay node to run a
// fade-out transition on, so a same-instance "wait a frame, then fade"
// effect keyed on the route can never fire.
//
// This module-scoped flag is the hand-off between the dying instance and
// the one that replaces it: the tapped link's onClick sets it synchronously
// (still on the old instance, before React unmounts it), and the new
// instance's useState lazy initializers read it once on its very first
// render, so that instance's FIRST paint already shows the overlay fully
// open - visually identical to the old instance's last frame, so the
// swap is imperceptible - "cut on the cover" continues across the
// remount boundary. The new instance then runs its own one-frame-wait,
// then fades itself out, same as any other close.
let pendingMenuHandoff = false;

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(() => pendingMenuHandoff);
    // Keeps the overlay mounted for the duration of its exit transition
    // (4.1): a conditional {isMenuOpen && (...)} mount/unmount can't animate
    // the close, only the open. Mounting on open and unmounting only after
    // the CSS opacity transition finishes gives open and close one shared,
    // retargetable transition instead of a one-sided keyframe-in/instant-out.
    const [isMenuRendered, setIsMenuRendered] = useState(() => pendingMenuHandoff);
    // will-change:opacity is only worth paying for while a transition is
    // actually in flight (mobile-menu-polish item 2) - not for the whole
    // time the overlay sits open, and not once it's fully closed.
    const [isAnimating, setIsAnimating] = useState(false);
    const location = useLocation();

    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);
    // Scroll position captured the moment the overlay locks the body, so a
    // non-navigating close (Escape / toggle / same-route tap) can restore it
    // exactly, iOS-Safari-safe (mobile-menu-polish item 5).
    const savedScrollYRef = useRef(0);
    // True only for a close that was triggered by a cross-route link tap -
    // tells the close effect to restore scroll to the top (not the saved Y)
    // and hand focus to the new page instead of back to the toggle
    // (mobile-menu-polish items 3 & 4). Lazily seeded from the handoff flag
    // so a freshly-mounted "taking over" instance already knows its own
    // eventual close is a navigating one.
    const isNavigatingCloseRef = useRef(pendingMenuHandoff);
    // Guards the close-side effects (scroll restore / focus return) so they
    // don't fire on initial mount, when isMenuOpen is already false and
    // nothing has actually closed.
    const wasOpenRef = useRef(false);
    // A handoff instance mounts already-open; skip the usual "focus the
    // first link on open" once so focus doesn't jump there only to be
    // moved to <main> a frame later.
    const suppressInitialFocusRef = useRef(pendingMenuHandoff);

    useEffect(() => {
        if (isMenuOpen) setIsMenuRendered(true);
    }, [isMenuOpen]);

    // --- Mobile Menu & Body Scroll ---
    // Ensure body scroll-lock styles are cleared on initial mount (fixes
    // refresh issues / a lock left over from a fast-refresh reload).
    useEffect(() => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
    }, []);

    // Consumes a handoff this instance was minted with (see the
    // pendingMenuHandoff comment above): wait one frame so this route has
    // painted under the still-opaque overlay, then start the fade-out -
    // "cut on the cover" (mobile-menu-polish item 3). Mount-only by design:
    // every cross-route nav in this app remounts Header (see above), so
    // there is never a later pathname change for this same instance to react
    // to.
    useEffect(() => {
        if (!pendingMenuHandoff) return;
        // Consume inside the frame callback (not before scheduling it) so a
        // StrictMode-style mount/unmount/remount can't swallow the handoff.
        const frameId = requestAnimationFrame(() => {
            pendingMenuHandoff = false; // consume once so it never leaks to a later, unrelated mount
            setIsMenuOpen(false);
        });
        return () => cancelAnimationFrame(frameId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Lock/unlock the body scroll (iOS-Safari-safe position:fixed technique),
    // make the background content inert, and hand focus on when the overlay
    // opens/closes (mobile-menu-polish items 4 & 5).
    useEffect(() => {
        // There's no single shared layout wrapper around <main>/<Footer> -
        // every page (App.tsx, About.tsx, MenuPage.tsx, ...) renders its own
        // <Header/><main/><Footer/> siblings. Querying the live DOM for the
        // one <main> and <footer> on the page works uniformly across all of
        // them without touching six page files.
        const mainEl = document.querySelector('main') as HTMLElement | null;
        const footerEl = document.querySelector('footer') as HTMLElement | null;

        if (isMenuOpen) {
            wasOpenRef.current = true;
            const scrollY = window.scrollY || window.pageYOffset || 0;
            savedScrollYRef.current = scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            mainEl?.setAttribute('inert', '');
            footerEl?.setAttribute('inert', '');
            return;
        }

        // Closing (or initial, never-opened mount - guarded below).
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        mainEl?.removeAttribute('inert');
        footerEl?.removeAttribute('inert');

        if (!wasOpenRef.current) return; // never opened yet - nothing to restore
        wasOpenRef.current = false;

        if (isNavigatingCloseRef.current) {
            isNavigatingCloseRef.current = false;
            // Restore to the top, not the pre-open Y - we've moved to a new
            // route. (ScrollToTop's own reset ran while the body was still
            // locked and had no scrollable area to act on; this is the call
            // that actually takes effect once the lock lifts, so it isn't a
            // duplicate of it.)
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            if (mainEl) {
                if (!mainEl.hasAttribute('tabindex')) mainEl.setAttribute('tabindex', '-1');
                mainEl.focus({ preventScroll: true });
            }
        } else {
            window.scrollTo({ top: savedScrollYRef.current, left: 0, behavior: 'instant' });
            toggleButtonRef.current?.focus({ preventScroll: true });
        }
    }, [isMenuOpen]);

    // Focus the first link once the overlay is both mounted and open -
    // covers the very first open (isMenuRendered flips true a render after
    // isMenuOpen does) and every subsequent one (already mounted).
    useEffect(() => {
        if (isMenuOpen && isMenuRendered) {
            if (suppressInitialFocusRef.current) {
                // A handoff instance: it mounted already "open" to continue
                // the cover from the instance that navigated here. Don't
                // steal focus onto the first link only to move it to <main>
                // a frame later.
                suppressInitialFocusRef.current = false;
                return;
            }
            firstLinkRef.current?.focus({ preventScroll: true });
        }
    }, [isMenuOpen, isMenuRendered]);

    // Safety net for the exit: the overlay normally unmounts on its own
    // transitionend, but if that event never arrives (tab/app switched
    // mid-fade, an interrupted transition) it must not linger. While closing
    // it already ignores taps (pointer-events-none); this unmounts it anyway
    // shortly after the 200ms fade should have finished.
    useEffect(() => {
        if (isMenuOpen || !isMenuRendered) return;
        const id = window.setTimeout(() => {
            setIsAnimating(false);
            setIsMenuRendered(false);
        }, 400);
        return () => window.clearTimeout(id);
    }, [isMenuOpen, isMenuRendered]);

    // Marks the start of an opacity transition so `will-change` can be
    // dropped again once onTransitionEnd fires.
    useEffect(() => {
        if (isMenuRendered) setIsAnimating(true);
    }, [isMenuOpen, isMenuRendered]);

    // Escape closes; Tab/Shift+Tab traps focus cycling the toggle button +
    // the menu links (mobile-menu-polish item 4).
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setIsMenuOpen(false);
                return;
            }

            if (event.key !== 'Tab') return;

            const focusables = (
                [
                    toggleButtonRef.current,
                    ...Array.from(overlayRef.current?.querySelectorAll('a') ?? []),
                ] as (HTMLElement | null)[]
            ).filter((el): el is HTMLElement => el !== null);

            if (focusables.length === 0) return;

            const currentIndex = focusables.indexOf(document.activeElement as HTMLElement);
            let nextIndex: number;
            if (event.shiftKey) {
                nextIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
            } else {
                nextIndex = currentIndex === -1 || currentIndex === focusables.length - 1 ? 0 : currentIndex + 1;
            }

            event.preventDefault();
            focusables[nextIndex]?.focus({ preventScroll: true });
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMenuOpen]);

    // Same-route tap: just close. Cross-route tap: let the Link navigate and
    // leave the close to the pathname-change effect above (the "cut on the
    // cover" hand-off) - this is the one path for that case, replacing the
    // old double-close (every link's onClick *and* a pathname effect).
    const handleNavLinkClick = (to: string) => () => {
        if (location.pathname === to) {
            setIsMenuOpen(false);
            return;
        }
        // Cross-route: this instance is about to be unmounted by the route
        // swap (see the pendingMenuHandoff comment above the component).
        // Leave the overlay exactly as it is (still fully opaque) and hand
        // off to whatever instance replaces it - do NOT call setIsMenuOpen
        // here, that would start a fade-out this dying instance can't see
        // through, and would race the unmount.
        pendingMenuHandoff = true;
    };

    return (
        <>
            <a href="#main-content" className="skip-to-content">
                Skip to main content
            </a>

            {/* This header is now *always* fixed, with a single, consistent size.
              All the conditional logic for scrolling has been removed.
              The spacer div has been removed - spacing is now handled by pt-16 md:pt-20 on <main>
            */}
            <header
                className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg py-4"
            >
                <div className="container mx-auto px-6 md:px-10 lg:px-16 flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-4" aria-label="Café Crave - Home">
                            {/* Logo with circular background, hover and focus states */}
                            <div
                                className="p-2 transition-[opacity,box-shadow] duration-200 ease-in-out hover:opacity-80 focus-within:opacity-80 focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 focus-within:ring-offset-primary"
                            >
                                <img
                                    src={cafeLogoIcon}
                                    alt=""
                                    className="h-8 md:h-12"
                                />
                            </div>

                            {/* Cafe Crave text - visible on all screen sizes */}
                            {/*<span className="text-xl md:text-2xl font-bold text-light font-['Playfair_Display',serif]">*/}
                            {/*    <span style={{*/}
                            {/*        background: 'linear-gradient(135deg, #f3ecd5 0%, #E9D8C4 50%, #f3ecd5 100%)',*/}
                            {/*        WebkitBackgroundClip: 'text',*/}
                            {/*        WebkitTextFillColor: 'transparent',*/}
                            {/*        backgroundClip: 'text',*/}
                            {/*        textShadow: '0 0 20px rgba(243, 236, 213, 0.3)',*/}
                            {/*        filter: 'drop-shadow(0 0 8px rgba(243, 236, 213, 0.4))'*/}
                            {/*    }}>*/}
                            {/*        Cafe Crave*/}
                            {/*    </span>*/}
                            {/*</span>*/}
                        </Link>

                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            ref={toggleButtonRef}
                            onClick={() => setIsMenuOpen((open) => !open)}
                            className="text-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 rounded-md p-1 z-[60] relative"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="burger-icon" aria-hidden="true">
                                <span className={`burger-line burger-line-top${isMenuOpen ? ' burger-line-top-open' : ''}`} />
                                <span className={`burger-line burger-line-middle${isMenuOpen ? ' burger-line-middle-open' : ''}`} />
                                <span className={`burger-line burger-line-bottom${isMenuOpen ? ' burger-line-bottom-open' : ''}`} />
                            </span>
                        </button>
                    </div>
                    {/* Desktop Navigation */}
                    <nav className="hidden md:block" aria-label="Main Navigation">
                        <ul className="flex space-x-8">
                            <li>
                                <Link to="/" className={`text-sm uppercase tracking-[0.15em] font-sans font-semibold transition-colors ${location.pathname === '/' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} aria-current={location.pathname === '/' ? 'page' : undefined}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className={`text-sm uppercase tracking-[0.15em] font-sans font-semibold transition-colors ${location.pathname === '/about' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} aria-current={location.pathname === '/about' ? 'page' : undefined}>
                                    Our Vibe
                                </Link>
                            </li>
                            <li>
                                <Link to="/menu" className={`text-sm uppercase tracking-[0.15em] font-sans font-semibold transition-colors ${location.pathname === '/menu' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} aria-current={location.pathname === '/menu' ? 'page' : undefined}>
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link to="/music" className={`text-sm uppercase tracking-[0.15em] font-sans font-semibold transition-colors ${location.pathname === '/music' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} aria-current={location.pathname === '/music' ? 'page' : undefined}>
                                    Music
                                </Link>
                            </li>
                            <li>
                                <Link to="/events" className={`text-sm uppercase tracking-[0.15em] font-sans font-semibold transition-colors ${location.pathname === '/events' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} aria-current={location.pathname === '/events' ? 'page' : undefined}>
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={`text-sm uppercase tracking-[0.15em] font-sans font-semibold transition-colors ${location.pathname === '/contact' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} aria-current={location.pathname === '/contact' ? 'page' : undefined}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* Mobile Navigation Overlay */}
                {isMenuRendered && (
                    <div
                        id="mobile-menu"
                        ref={overlayRef}
                        role="dialog"
                        aria-modal={isMenuOpen ? true : undefined}
                        aria-label="Menu"
                        aria-hidden={isMenuOpen ? undefined : true}
                        className={`fixed inset-0 bg-primary z-[45] md:hidden flex flex-col items-center justify-center overscroll-contain transition-opacity ease-out-strong ${isMenuOpen ? 'duration-drawer opacity-100' : 'duration-200 opacity-0 pointer-events-none'}`}
                        style={isAnimating ? { willChange: 'opacity' } : undefined}
                        onTransitionEnd={(e) => {
                            if (e.propertyName !== 'opacity') return;
                            setIsAnimating(false);
                            if (!isMenuOpen) setIsMenuRendered(false);
                        }}
                    >
                        <div className="text-center mb-8">
                            {/* Mobile menu logo */}
                            <img
                                src={cafeLogoIcon}
                                alt="Café Crave Logo"
                                className="h-16 mb-4 mx-auto"
                            />
                            {/* Cafe Crave text with gradient styling */}
                            {/*<h2 className="text-3xl font-bold font-['Playfair_Display',serif]">*/}
                            {/*    <span style={{*/}
                            {/*        background: 'linear-gradient(135deg, #f3ecd5 0%, #E9D8C4 50%, #f3ecd5 100%)',*/}
                            {/*        WebkitBackgroundClip: 'text',*/}
                            {/*        WebkitTextFillColor: 'transparent',*/}
                            {/*        backgroundClip: 'text',*/}
                            {/*        filter: 'drop-shadow(0 0 8px rgba(243, 236, 213, 0.4))'*/}
                            {/*    }}>*/}
                            {/*        Cafe Crave*/}
                            {/*    </span>*/}
                            {/*</h2>*/}
                        </div>
                        <ul className="flex flex-col items-center space-y-6">
                            <li>
                                <Link ref={firstLinkRef} to="/" style={{ '--i': 0 } as React.CSSProperties} className={`mobile-menu-link${isMenuOpen ? ' mobile-menu-link-open' : ''} text-xl uppercase tracking-[0.15em] font-sans font-semibold transition-colors duration-200 ${location.pathname === '/' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} onClick={handleNavLinkClick('/')} aria-current={location.pathname === '/' ? 'page' : undefined}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" style={{ '--i': 1 } as React.CSSProperties} className={`mobile-menu-link${isMenuOpen ? ' mobile-menu-link-open' : ''} text-xl uppercase tracking-[0.15em] font-sans font-semibold transition-colors duration-200 ${location.pathname === '/about' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} onClick={handleNavLinkClick('/about')} aria-current={location.pathname === '/about' ? 'page' : undefined}>
                                    Our Vibe
                                </Link>
                            </li>
                            <li>
                                <Link to="/menu" style={{ '--i': 2 } as React.CSSProperties} className={`mobile-menu-link${isMenuOpen ? ' mobile-menu-link-open' : ''} text-xl uppercase tracking-[0.15em] font-sans font-semibold transition-colors duration-200 ${location.pathname === '/menu' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} onClick={handleNavLinkClick('/menu')} aria-current={location.pathname === '/menu' ? 'page' : undefined}>
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link to="/music" style={{ '--i': 3 } as React.CSSProperties} className={`mobile-menu-link${isMenuOpen ? ' mobile-menu-link-open' : ''} text-xl uppercase tracking-[0.15em] font-sans font-semibold transition-colors duration-200 ${location.pathname === '/music' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} onClick={handleNavLinkClick('/music')} aria-current={location.pathname === '/music' ? 'page' : undefined}>
                                    Music
                                </Link>
                            </li>
                            <li>
                                <Link to="/events" style={{ '--i': 4 } as React.CSSProperties} className={`mobile-menu-link${isMenuOpen ? ' mobile-menu-link-open' : ''} text-xl uppercase tracking-[0.15em] font-sans font-semibold transition-colors duration-200 ${location.pathname === '/events' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} onClick={handleNavLinkClick('/events')} aria-current={location.pathname === '/events' ? 'page' : undefined}>
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" style={{ '--i': 5 } as React.CSSProperties} className={`mobile-menu-link${isMenuOpen ? ' mobile-menu-link-open' : ''} text-xl uppercase tracking-[0.15em] font-sans font-semibold transition-colors duration-200 ${location.pathname === '/contact' ? 'text-[#F3ECD5] underline underline-offset-8 decoration-2' : 'text-light/80 hover:text-[#F3ECD5]'}`} onClick={handleNavLinkClick('/contact')} aria-current={location.pathname === '/contact' ? 'page' : undefined}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        </>
    );
};
