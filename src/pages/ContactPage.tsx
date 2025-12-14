import { motion } from 'framer-motion';
import Masthead from '../components/Masthead';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { TornEdge, StampBadge, LinedInput } from '../components/NewspaperComponents';
import { newspaperVariants } from '../utils/newspaperAnimations';

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-grain font-body">
      <SEO
        title="Write to Us | Correspondence Dept. | Crave Café"
        description="Contact Crave Café for reservations, vinyl requests, or inquiries. Visit us at 219 Imam Haron Rd, Claremont, Cape Town. Call 066 238 6374."
        keywords="contact crave cafe, cafe reservations claremont, halal cafe contact cape town, correspondence department"
        schema={{
          "@context": "https://schema.org",
          "@type": "Cafe",
          "name": "Crave Café",
          "description": "A retro, music-inspired, halaal café in Claremont, Cape Town.",
          "url": "https://www.cafecravecpt.co.za",
          "telephone": "+27662386374",
          "priceRange": "R",
          "servesCuisine": ["Café", "Halaal"],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "219 Imam Haron Rd",
            "addressLocality": "Claremont",
            "addressRegion": "Cape Town",
            "postalCode": "7708",
            "addressCountry": "ZA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -33.983624,
            "longitude": 18.481859
          },
          "openingHoursSpecification": [
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "10:00", "closes": "18:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "08:30", "closes": "18:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "08:30", "closes": "18:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "08:30", "closes": "18:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "08:30", "closes": "12:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "14:00", "closes": "21:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:30", "closes": "21:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "18:00" }
          ],
          "potentialAction": {
            "@type": "ViewAction",
            "target": "https://www.cafecravecpt.co.za/menu"
          }
        }}
      />

      <Masthead />

      <main id="main-content">
        {/* SECTION 1: The Headline */}
        <div className="bg-paper pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block font-accent text-rust tracking-[0.3em] uppercase text-sm border-b-2 border-rust pb-1 mb-6">
              Correspondence Dept.
            </span>
            <h1 className="font-headline text-6xl md:text-8xl text-ink mb-6">
              WRITE TO US
            </h1>
            <p className="font-body text-lg md:text-xl text-ink/60 italic max-w-2xl mx-auto">
              "For table reservations, vinyl requests, or general musings on the state of coffee culture."
            </p>
          </div>
        </div>

        <TornEdge />

        {/* SECTION 2: The Split Layout (Form vs Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">

          {/* LEFT: The "Letter" (Form) */}
          <div className="bg-paper p-8 md:p-16 lg:p-24 relative">
            <div className="max-w-lg mx-auto relative z-10">

              {/* Decorative Stamp */}
              <div className="absolute -top-10 -right-10 hidden md:block opacity-80">
                <StampBadge text="PRIORITY MAIL" size="sm" rotation={12} />
              </div>

              <motion.form
                action="mailto:info@cafecravecpt.co.za?subject=Contact from Website"
                method="POST"
                encType="text/plain"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={newspaperVariants.staggerContainer}
              >
                <motion.div variants={newspaperVariants.staggerItem}>
                  <LinedInput
                    label="Sender Name"
                    name="name"
                    placeholder="E.g. Ernest Hemingway"
                    required
                  />
                </motion.div>

                <motion.div variants={newspaperVariants.staggerItem}>
                  <LinedInput
                    label="Contact Coordinates"
                    name="contact"
                    type="email"
                    placeholder="Email or Phone Number"
                    required
                  />
                </motion.div>

                <motion.div variants={newspaperVariants.staggerItem}>
                  <LinedInput
                    label="Subject"
                    name="subject"
                    placeholder="Reservation / Inquiry"
                    required
                  />
                </motion.div>

                <motion.div variants={newspaperVariants.staggerItem}>
                  <LinedInput
                    label="Your Message"
                    name="message"
                    rows={4}
                    placeholder="Type your letter here..."
                    required
                  />
                </motion.div>

                <motion.div variants={newspaperVariants.staggerItem} className="mt-12">
                  <button
                    type="submit"
                    className="w-full bg-ink text-paper font-accent tracking-[0.2em] uppercase py-4 border-2 border-ink hover:bg-rust hover:border-rust transition-all duration-300 shadow-newspaper hover:shadow-polaroid flex justify-center items-center gap-3"
                  >
                    <span>Send Telegram</span>
                    <span className="text-xl">✉</span>
                  </button>
                  <p className="text-center font-typewriter text-xs text-ink/40 mt-4">
                    * All correspondence is read over morning coffee.
                  </p>
                </motion.div>
              </motion.form>
            </div>

            {/* Background Texture for the form area */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(transparent,transparent_29px,rgba(35,31,32,0.1)_30px)]"></div>
          </div>

          {/* RIGHT: The "Location" (Map & Info) */}
          <div className="relative bg-espresso text-paper overflow-hidden flex flex-col">

            {/* The Map with Vintage Filter */}
            <div className="flex-grow relative h-[400px] lg:h-auto w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.286295325791!2d18.4735313!3d-33.9844444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc42da3d037063%3A0x67399334586b668d!2s219%20Imam%20Haron%20Rd%2C%20Claremont%2C%20Cape%20Town%2C%207708!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 map-vintage"
                title="Crave Café Location"
              ></iframe>

              {/* Overlay to blend map into espresso background */}
              <div className="absolute inset-0 bg-espresso/20 pointer-events-none mix-blend-multiply"></div>
            </div>

            {/* The "Directory" Info Box */}
            <div className="p-8 md:p-12 border-t-4 border-double border-white/10 bg-espresso relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Address */}
                <div>
                  <h3 className="font-accent text-rust mb-4 tracking-widest text-sm">HEADQUARTERS</h3>
                  <address className="font-body not-italic text-paper/80 leading-relaxed">
                    219 Imam Haron Rd,<br/>
                    Claremont, Cape Town<br/>
                    7708
                  </address>
                  <a
                    href="tel:+27662386374"
                    className="block mt-4 font-typewriter text-sm hover:text-rust transition-colors"
                  >
                    +27 66 238 6374
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <h3 className="font-accent text-rust mb-4 tracking-widest text-sm">OPERATING HOURS</h3>
                  <ul className="font-body text-paper/80 space-y-2 text-sm">
                    <li className="flex justify-between border-b border-white/10 pb-1">
                      <span>Mon - Fri</span>
                      <span>07:00 - 16:00</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-1">
                      <span>Saturday</span>
                      <span>08:00 - 15:00</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-1">
                      <span>Sunday</span>
                      <span>08:00 - 13:00</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
