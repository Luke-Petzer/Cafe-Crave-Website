// --- 1. Import your new images ---
import direStraitsBrothers from '../assets/dire-straits-brothers.webp';
import ericClaptonTimepieces from '../assets/eric-clapton-timepieces.webp';
import johnnyNashClearlyNow from '../assets/johnny-nash-clearly-now.webp';
import jimiHendrixMoods from '../assets/jimi-hendrix-electric-lady.webp';
import elvisPresleyGoldenHits from '../assets/elvis-presley-golden-hits.webp';
import gipsyKingsAllegria from '../assets/gipsy-kings-allegria.webp';
import gipsyKingsMosaique from '../assets/gipsy-kings-mosaique.webp';
import chicago17 from '../assets/chicago-17.webp';
import deanMartinOneMoreTime from '../assets/dean-martin-one-more-time.webp';
import oscarPetersonPlaysSinatra from '../assets/oscar-peterson-plays-sinatra.webp';
import georgeBensonGiveMeTheNight from '../assets/george-benson-give-me-the-night.webp';
import totoFahrenheit from '../assets/toto-fahrenheit.webp';
import michaelJacksonOffTheWall from '../assets/michael-jackson-off-the-wall.webp';
import paulaAbdulSpellbound from '../assets/paula-abdul-spellbound.webp';
import bobMarleyBirthOfALegend from '../assets/bob-marley-greatest-hits.webp';
import carlySimonNoSecrets from '../assets/carly-simon-no-secrets.webp';
import fleetwoodMacRumours from '../assets/fleetwood-mac-rumours.webp';
import theBeatlesAbbeyRoad from '../assets/the-beatles-abbey-road.webp';
import queenNightAtTheOpera from '../assets/queen-night-at-the-opera.webp';
import stevieWonderSongsInKey from '../assets/stevie-wonder-songs-in-key.webp';
import eaglesHotelCalifornia from '../assets/eagles-hotel-california.webp';

// --- NEW / UPDATED IMAGES ---
import bryanAdamsReckless from '../assets/bryan-adams-reckless.webp';
import bruceSpringsteenBornInTheUsa from '../assets/bruce-springsteen-born-in-the-usa.webp';
import pinkFloydDarkSide from '../assets/pink-floyd-back-of-moon.webp';
import tearsForFearsBigChair from '../assets/tears-for-joy-head-over-heals.webp';
import thePoliceSynchronicity from '../assets/the-police-every-breath-you-take.webp';

// --- 2. Export the album data array ---
export const albumsData = [
    // From your photos
    {
        id: 1,
        title: "Brothers in Arms",
        artist: "Dire Straits",
        year: "1985",
        image: direStraitsBrothers,
        description: "A landmark 80s rock album, known for its pioneering digital recording. Perfect for a smooth, relaxed cafe vibe with hits like 'Money for Nothing'.",
        genres: ["Rock", "Roots Rock", "Blues Rock"],
        previewLink: "https://open.spotify.com/album/6Pz06FAaeym0JSqVqIkN56?si=wj8S6H4KQZWZswNxsuc8-w",
        tracks: [
            { number: "01", title: "So Far Away", duration: "5:12" },
            { number: "02", title: "Money for Nothing", duration: "8:26" },
            { number: "04", title: "Your Latest Trick", duration: "6:33" },
            { number: "06", title: "Walk of Life", duration: "4:12" }
        ]
    },
    {
        id: 2,
        title: "Timepieces: The Best of Eric Clapton",
        artist: "Eric Clapton",
        year: "1982",
        image: ericClaptonTimepieces,
        description: "A brilliant collection of Clapton's 70s hits. 'Wonderful Tonight' and 'Layla' provide the ultimate soulful, classic rock backdrop.",
        genres: ["Rock", "Blues", "Classic Rock"],
        previewLink: "https://open.spotify.com/playlist/1YPYpnUl4dXp1NNW779L1O?si=3ed93b804e7e4f91",
        tracks: [
            { number: "01", title: "I Shot the Sheriff", duration: "4:23" },
            { number: "05", title: "Wonderful Tonight", duration: "3:42" },
            { number: "06", title: "Cocaine", duration: "3:38" },
            { number: "09", title: "Layla", duration: "7:10" }
        ]
    },
    {
        id: 3,
        title: "I Can See Clearly Now",
        artist: "Johnny Nash",
        year: "1972",
        image: johnnyNashClearlyNow,
        description: "The optimistic title track is a cafe classic, but the whole album is a beautiful blend of reggae and soul, also featuring Bob Marley's 'Stir It Up'.",
        genres: ["Reggae", "Soul", "Pop"],
        previewLink: "https://open.spotify.com/album/0aBgqFsQmUQGw8emDAjNt4?si=Ml5i8INxSgqQI12iW0YIUA",
        tracks: [
            { number: "01", title: "Stir It Up", duration: "3:02" },
            { number: "02", title: "That's the Way We Get By", duration: "2:55" },
            { number: "04", title: "I Can See Clearly Now", duration: "2:46" }
        ]
    },
    {
        id: 4,
        title: "Off the Wall",
        artist: "Michael Jackson",
        year: "1979",
        image: michaelJacksonOffTheWall,
        description: "MJ's groundbreaking blend of disco, pop, and R&B. 'Rock with You' is the perfect track for a lively, stylish afternoon.",
        genres: ["Disco", "Pop", "Funk", "R&B"],
        previewLink: "https://open.spotify.com/album/2ZytN2cY4Zjrr9ukb2rqTP?si=17ypLatEQ3qveC6vLSyQeg",
        tracks: [
            { number: "01", title: "Don't Stop 'Til You Get Enough", duration: "6:05" },
            { number: "02", title: "Rock with You", duration: "3:40" },
            { number: "03", title: "Workin' Day and Night", duration: "5:14" }
        ]
    },
    {
        id: 5,
        title: "Fahrenheit",
        artist: "Toto",
        year: "1986",
        image: totoFahrenheit,
        description: "A polished 80s rock classic. The perfect album to have on rotation, featuring the timeless hit singles 'I'll Be Over You' and 'Without Your Love'.",
        genres: ["Rock", "Pop Rock"],
        previewLink: "https://open.spotify.com/album/2FsaIC8jrXvWGIfokVZ4Jg?si=6iC2iD4jSBOQ9LhTFtC4mg",
        tracks: [
            { number: "01", title: "Till the End", duration: "5:17" },
            { number: "02", title: "I'll Be Over You", duration: "3:50" },
            { number: "07", title: "Without Your Love", duration: "4:33" }
        ]
    },
    {
        id: 6,
        title: "The Birth of a Legend",
        artist: "Bob Marley & The Wailers",
        year: "1973",
        image: bobMarleyBirthOfALegend,
        description: "Early recordings from the reggae legends, featuring Peter Tosh. Raw, soulful, and perfect for setting a relaxed, positive vibe.",
        genres: ["Reggae", "Ska"],
        previewLink: "https://open.spotify.com/album/2ymwnKX5hw8j4PqxYv2UQV?si=QrZT1w_5QNmW-_36J5ltog",
        tracks: [
            { number: "01", title: "Simmer Down", duration: "2:49" },
            { number: "02", title: "It Hurts to Be Alone", duration: "2:42" },
            { number: "03", title: "LONESOME FEELINGS", duration: "2:31" }
        ]
    },
    {
        id: 7,
        title: "Chicago 17",
        artist: "Chicago",
        year: "1984",
        image: chicago17,
        description: "The band's best-selling album, packed with iconic 80s power ballads. 'You're the Inspiration' is a quintessential cafe soundtrack song.",
        genres: ["Soft Rock", "Pop Rock"],
        previewLink: "https://open.spotify.com/album/1ICKrl6sDjJD1YdR9VDfPR?si=PqzcWVM5Qrqqwc1cSlHWrQ",
        tracks: [
            { number: "01", title: "Stay the Night", duration: "3:48" },
            { number: "02", title: "We Can Stop the Hurtin'", duration: "4:12" },
            { number: "03", title: "You're the Inspiration", duration: "4:43" }
        ]
    },
    {
        id: 8,
        title: "No Secrets",
        artist: "Carly Simon",
        year: "1972",
        image: carlySimonNoSecrets,
        description: "A classic of the singer-songwriter era. Features the legendary, enigmatic hit 'You're So Vain'—a perfect conversation starter.",
        genres: ["Soft Rock", "Pop"],
        previewLink: "https://open.spotify.com/album/79x0PRGIZv33znrCkPkCZ5?si=nv3OdNB5TiaFc6n7maWucg",
        tracks: [
            { number: "01", title: "The Right Thing to Do", duration: "2:57" },
            { number: "03", title: "You're So Vain", duration: "4:18" },
            { number: "5", title: "We Have No Secrets", duration: "3:58" }
        ]
    },
    {
        id: 9,
        title: "Give Me the Night",
        artist: "George Benson",
        year: "1980",
        image: georgeBensonGiveMeTheNight,
        description: "Produced by Quincy Jones, this album is the definition of smooth. The title track is an upbeat, sophisticated R&B classic.",
        genres: ["R&B", "Soul", "Jazz Funk"],
        previewLink: "https://open.spotify.com/album/6qwOcN9wZgVF0bishcfFsh?si=P_keyZ5hSjWJqiOzUvGASQ",
        tracks: [
            { number: "01", title: "Love X Love", duration: "4:46" },
            { number: "04", title: "Give Me the Night", duration: "5:01" },
            { number: "05", title: "What's on Your Mind", duration: "4:04" }
        ]
    },
    {
        id: 10,
        title: "Mosaïque",
        artist: "Gipsy Kings",
        year: "1989",
        image: gipsyKingsMosaique,
        description: "An energetic and passionate blend of flamenco, rumba, and pop. 'Volaré' brings an instant, joyful energy to the room.",
        genres: ["Flamenco", "Rumba", "World"],
        previewLink: "https://open.spotify.com/album/4bnWDBDMEsDvwObwZnMngr?si=iGsTgxiUQ4mt5lAkOT3KAw",
        tracks: [
            { number: "01", title: "Caminando Por la Calle", duration: "4:17" },
            { number: "02", title: "Viento del Arena", duration: "5:27" },
            { number: "03", title: "Mosaïque", duration: "3:40" }
        ]
    },
    {
        id: 11,
        title: "Allegria",
        artist: "Gipsy Kings",
        year: "1982",
        image: gipsyKingsAllegria,
        description: "The debut album from the group, showcasing their raw, acoustic talent. 'Allegria' is pure, infectious musical passion.",
        genres: ["Flamenco", "Rumba"],
        previewLink: "https://open.spotify.com/album/7HyFsfldvhFh1RjN2D5Ocq?si=eBZ8iHAxQ0awU-V6l_PtSA",
        tracks: [
            { number: "01", title: "Pena Penita", duration: "3:19" },
            { number: "02", title: "Allegria", duration: "2:47" },
            { number: "05", title: "Djobi Djoba", duration: "3:31" }
        ]
    },
    {
        id: 12,
        title: "One More Time",
        artist: "Dean Martin",
        year: "1962",
        image: deanMartinOneMoreTime,
        description: "Classic crooning from the 'King of Cool'. The title track and 'Sway' set a timeless, relaxed, and slightly nostalgic mood.",
        genres: ["Vocal Jazz", "Traditional Pop"],
        previewLink: "https://open.spotify.com/album/3VYXSxp5L3wev6pTnCELjQ?si=o3idCe3WROqlplReDe9l-w",
        tracks: [
            { number: "01", title: "One More Time", duration: "2:44" },
            { number: "02", title: "If", duration: "2:47" },
            { number: "03", title: "Winter Wonderland", duration: "1:56" }
        ]
    },
    // Fan Favorites
    {
        id: 13,
        title: "Rumours",
        artist: "Fleetwood Mac",
        year: "1977",
        image: fleetwoodMacRumours,
        description: "One of the best-selling albums of all time. 'Dreams' and 'Go Your Own Way' are essential tracks for any vinyl collection.",
        genres: ["Soft Rock", "Pop Rock"],
        previewLink: "https://open.spotify.com/album/1bt6q2SruMsBtcerNVtpZB?si=n4fq_eviRhut-q15MzuxdQ",
        tracks: [
            { number: "02", title: "Dreams", duration: "4:14" },
            { number: "05", title: "Go Your Own Way", duration: "3:38" },
            { number: "07", title: "The Chain", duration: "4:30" }
        ]
    },
    {
        id: 14,
        title: "Abbey Road",
        artist: "The Beatles",
        year: "1969",
        image: theBeatlesAbbeyRoad,
        description: "The final masterpiece from The Beatles. 'Come Together' and 'Here Comes The Sun' are instantly recognizable and universally loved.",
        genres: ["Rock", "Pop", "Classic Rock"],
        previewLink: "https://open.spotify.com/album/0ETFjACtuP2ADo6LFhL6HN?si=Bn-FaeqBSPGyQF1Zsr_rRQ",
        tracks: [
            { number: "01", title: "Come Together", duration: "4:20" },
            { number: "02", title: "Something", duration: "3:03" },
            { number: "07", title: "Here Comes The Sun", duration: "3:05" }
        ]
    },
    {
        id: 15,
        title: "Songs in the Key of Life",
        artist: "Stevie Wonder",
        year: "1976",
        image: stevieWonderSongsInKey,
        description: "A monumental and joyful double album. 'Sir Duke' and 'Isn't She Lovely' are guaranteed to make anyone in the cafe smile.",
        genres: ["Soul", "R&B", "Funk", "Pop"],
        previewLink: "https://open.spotify.com/album/6YUCc2RiXcEKS9ibuZxjt0?si=mxaleUsjROq_IlgrJZYrjQ",
        tracks: [
            { number: "01", title: "Sir Duke", duration: "3:54" },
            { number: "02", title: "I Wish", duration: "4:12" },
            { number: "03", title: "Isn't She Lovely", duration: "6:34" }
        ]
    },
    {
        id: 16,
        title: "Hotel California",
        artist: "Eagles",
        year: "1976",
        image: eaglesHotelCalifornia,
        description: "A true classic rock staple. The iconic title track is the perfect soundtrack for a late afternoon coffee, full of story and atmosphere.",
        genres: ["Rock", "Soft Rock", "Classic Rock"],
        previewLink: "https://open.spotify.com/album/2widuo17g5CEC66IbzveRu?si=aoaivYYGQci9b2UrG7Ka7g",
        tracks: [
            { number: "01", title: "Hotel California", duration: "6:30" },
            { number: "02", title: "New Kid in Town", duration: "5:04" },
            { number: "03", title: "Life in the Fast Lane", duration: "4:46" }
        ]
    },
    {
        id: 17,
        title: "A Night at the Opera",
        artist: "Queen",
        year: "1975",
        image: queenNightAtTheOpera,
        description: "An epic, genre-bending masterpiece. While 'Bohemian Rhapsody' is legendary, 'You're My Best Friend' is the ultimate feel-good cafe track.",
        genres: ["Rock", "Progressive Rock", "Pop"],
        previewLink: "https://open.spotify.com/album/1GbtB4zTqAsyfZEsm1RZfx?si=aRClPxEiSmmYTsbiPC5qfQ",
        tracks: [
            { number: "04", title: "You're My Best Friend", duration: "2:52" },
            { number: "09", title: "Love of My Life", duration: "3:39" },
            { number: "11", title: "Bohemian Rhapsody", duration: "5:55" }
        ]
    },
    // Other albums from your photos (with some assumptions)
    {
        id: 18,
        title: "Electric Ladyland",
        artist: "Jimi Hendrix",
        year: "1971",
        image: jimiHendrixMoods,
        description: "A compelling compilation of Hendrix's work, capturing his incredible range from bluesy ballads to psychedelic rock explorations.",
        genres: ["Rock", "Psychedelic Rock", "Blues"],
        previewLink: "https://open.spotify.com/album/5z090LQztiqh13wYspQvKQ?si=Teb7-aTDR4GcrOBrX57MOA",
        tracks: [
            { number: "01", title: "...And the Gods Made Love", duration: "1:22" },
            { number: "02", title: "Have you Even Been (To Electric Ladyland)", duration: "2:10" },
            { number: "03", title: "Crosstown Traffic", duration: "2:26" }
        ]
    },
    {
        id: 19,
        title: "Elvis' Golden Records",
        artist: "Elvis Presley",
        year: "1958",
        image: elvisPresleyGoldenHits,
        description: "The original King of Rock 'n' Roll. This collection defined a generation with hits like 'Hound Dog' and 'Jailhouse Rock'.",
        genres: ["Rock and Roll", "Rockabilly"],
        previewLink: "https://open.spotify.com/album/0C3t1htEDTFKcg7F2rNbek?si=5Ve3XSYDQv2ZWENbulJybA",
        tracks: [
            { number: "01", title: "Hound Dog", duration: "2:13" },
            { number: "02", title: "Loving You", duration: "2:13" },
            { number: "03", title: "All Shook Up", duration: "1:57" }
        ]
    },
    {
        id: 20,
        title: "A Jazz Portrait of Frank Sinatra",
        artist: "The Oscar Peterson Trio",
        year: "1959",
        image: oscarPetersonPlaysSinatra,
        description: "A sophisticated, instrumental take on Sinatra's classics by one of the greatest jazz pianists of all time. Pure class.",
        genres: ["Jazz", "Piano Jazz", "Swing"],
        previewLink: "https://open.spotify.com/album/5JXjrJw1ziAWR0AczH5SfM?si=NT037cakTMacd1cD2rSb-Q",
        tracks: [
            { number: "01", title: "You Make Me Feel So Young", duration: "2:39" },
            { number: "02", title: "Come Dance with Me", duration: "1:55" },
            { number: "09", title: "I Get a Kick Out of You", duration: "3:00" }
        ]
    },
    {
        id: 21,
        title: "Spellbound",
        artist: "Paula Abdul",
        year: "1991",
        image: paulaAbdulSpellbound,
        description: "A global #1 album that defined the sound of early 90s pop. 'Rush Rush' is a perfect, smooth ballad for a nostalgic afternoon.",
        genres: ["Pop", "R&B", "New Jack Swing"],
        previewLink: "https://open.spotify.com/album/6gHhunUztPgpyBmzeie6MH?si=UsqoP7xiS9-PmlvI4KJJ5Q",
        tracks: [
            { number: "01", title: "The Promise of a New Day", duration: "4:32" },
            { number: "03", title: "Rush Rush", duration: "4:52" },
            { number: "08", title: "Blowing Kisses in the Wind", duration: "4:41" }
        ]
    },
    {
        id: 22,
        title: "Reckless",
        artist: "Bryan Adams",
        year: "1984",
        image: bryanAdamsReckless,
        description: "The quintessential 80s rock album. Packed with stadium-sized hits like 'Summer of '69' and 'Heaven', it's pure, feel-good energy.",
        genres: ["Rock", "Arena Rock", "Pop Rock"],
        previewLink: "https://open.spotify.com/album/7LPkGn9WJkguua8oZtaHxa?si=TvRJbGtzTBK5ERwlpmxSGA",
        tracks: [
            { number: "01", title: "Run to You", duration: "3:54" },
            { number: "02", title: "Heaven", duration: "4:03" },
            { number: "04", title: "Summer of '69", duration: "3:35" }
        ]
    },
    {
        id: 23,
        title: "Born in the U.S.A.",
        artist: "Bruce Springsteen",
        year: "1984",
        image: bruceSpringsteenBornInTheUsa,
        description: "An American rock icon at the peak of his powers. From the title track to 'Dancing in the Dark', this album is a force of nature.",
        genres: ["Rock", "Heartland Rock"],
        previewLink: "https://open.spotify.com/album/0PMasrHdpaoIRuHuhHp72O?si=Z1dJcJz_TYKen8wYYFO2Og",
        tracks: [
            { number: "01", title: "Born in the U.S.A.", duration: "4:39" },
            { number: "04", title: "Dancing in the Dark", duration: "4:01" },
            { number: "07", title: "Glory Days", duration: "4:15" }
        ]
    },
    {
        id: 24,
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        year: "1973",
        image: pinkFloydDarkSide,
        description: "One of the most ambitious and iconic albums ever made. Perfect for a deep, immersive listening session with tracks like 'Money' and 'Time'.",
        genres: ["Progressive Rock", "Art Rock"],
        previewLink: "https://open.spotify.com/album/4LH4d3cOWNNsVw41Gqt2kv?si=3T3WPKBASCGWoXltueyUhg",
        tracks: [
            { number: "05", title: "The Great Gig in the Sky", duration: "4:43" },
            { number: "06", title: "Money", duration: "6:22" },
            { number: "07", title: "Us and Them", duration: "7:49" }
        ]
    },
    {
        id: 25,
        title: "Songs from the Big Chair",
        artist: "Tears for Fears",
        year: "1985",
        image: tearsForFearsBigChair,
        description: "A defining album of the 80s New Wave sound. 'Everybody Wants to Rule the World' and 'Shout' are timeless, sophisticated pop hits.",
        genres: ["New Wave", "Synth-pop", "Pop Rock"],
        previewLink: "https://open.spotify.com/album/7y7459SFZReE5Wec4hejv5?si=410GTrg7Tj2VJL6PJAKrBw",
        tracks: [
            { number: "01", title: "Shout", duration: "6:33" },
            { number: "02", title: "Everybody Wants to Rule the World", duration: "4:11" },
            { number: "03", title: "Head Over Heels", duration: "5:02" }
        ]
    },
    {
        id: 26,
        title: "Synchronicity",
        artist: "The Police",
        year: "1983",
        image: thePoliceSynchronicity,
        description: "The Police's final studio album and their commercial peak. 'Every Breath You Take' is one of the most famous songs of all time.",
        genres: ["New Wave", "Rock", "Reggae Fusion"],
        previewLink: "https://open.spotify.com/album/5W9OT0a5iZlBr83a9WMKFY?si=9C1Ntao9Tj2jaZUxibBhyA",
        tracks: [
            { number: "01", title: "Synchronicity I", duration: "3:23" },
            { number: "04", title: "King of Pain", duration: "4:59" },
            { number: "07", title: "Every Breath You Take", duration: "4:13" }
        ]
    }

];