import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Youtube, ChevronLeft, ChevronRight } from "lucide-react";

import slideImg1 from "@assets/IMG_7809_1770894464899.png?url";
import slideImg2 from "@assets/IMG_7817_1770894464899.jpg?url";
import slideImg3 from "@assets/IMG_7819_1770894464899.jpg?url";
import slideImg4 from "@assets/IMG_7822_1770894464899.jpg?url";
import slideImg5 from "@assets/IMG_7823_1770894464899.jpg?url";
import slideImg6 from "@assets/IMG_7820_1770894464899.jpg?url";
import slideImg7 from "@assets/IMG_7821_1770894464899.jpg?url";
import slideImg8 from "@assets/IMG_7827_1770894464899.jpg?url";
import slideImg9 from "@assets/IMG_7810_1770894464899.png?url";
import slideImg10 from "@assets/IMG_7816_1770894464899.png?url";

import cardNature from "@assets/IMG_7824_1770894464899.jpg?url";
import cardOffbeat from "@assets/IMG_7814_1770894464899.png?url";
import cardCulture from "@assets/IMG_7825_1770894464899.jpg?url";

const slides = [
  { image: slideImg1, label: "Maldives Sunset" },
  { image: slideImg2, label: "New Zealand" },
  { image: slideImg3, label: "Antarctica" },
  { image: slideImg6, label: "Victoria Falls" },
  { image: slideImg4, label: "Desert Camping" },
  { image: slideImg7, label: "Island Life" },
  { image: slideImg8, label: "Seychelles" },
  { image: slideImg5, label: "Golden Hour" },
  { image: slideImg9, label: "Kyrgyzstan" },
  { image: slideImg10, label: "River Crossing" },
];

const categoryCards = [
  { image: cardNature, label: "Nature" },
  { image: cardOffbeat, label: "Offbeat" },
  { image: cardCulture, label: "Culture" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const cardTimer = setInterval(() => {
      setActiveCard(prev => (prev + 1) % categoryCards.length);
    }, 3000);
    return () => clearInterval(cardTimer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `url('${slide.image}')`,
            opacity: currentSlide === index ? 1 : 0,
            transform: currentSlide === index ? 'scale(1.02)' : 'scale(1.08)',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-16">
            <div className="space-y-6">
              <div className="overflow-hidden">
                <p className="text-primary font-medium tracking-widest uppercase text-sm animate-fade-in-up">
                  Travel Creator & Author
                </p>
              </div>

              <div className="overflow-hidden">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9]">
                  WAYFARER
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-accent">
                    FOOTPRINTS
                  </span>
                </h1>
              </div>

              <p className="text-lg text-white/80 tracking-wide">
                BY <span className="text-white font-semibold">ANKITHA RAJENDARAN</span>
              </p>

              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent"></div>

              <p className="text-white/80 text-lg max-w-md leading-relaxed">
                Your personal travel curator for offbeat adventures across 100+ countries and 7 continents.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-8 shadow-lg shadow-primary/25 font-semibold" asChild>
                  <a href="https://mybook.to/whynot" target="_blank" rel="noopener noreferrer" data-testid="hero-book-button">
                    Buy My Book
                  </a>
                </Button>
                <Button size="lg" className="bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 px-8 font-semibold" asChild>
                  <a href="/consultation" data-testid="hero-consultation-button">
                    Plan a Private Trip
                  </a>
                </Button>
                <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-black px-8 font-semibold transition-all duration-300" asChild>
                  <a href="/blog" data-testid="hero-guides-button">
                    Browse Travel Guides
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-5 pt-4">
                <a href="https://www.instagram.com/wayfarer_anki/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@ankitharajendaran?si=J-vzQV5nn8osjjhY" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/ankitha-rajendaran-b4506958/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="hidden lg:flex items-end justify-end gap-4 pr-4 self-end pb-8">
              {categoryCards.map((card, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 ${
                    activeCard === index
                      ? 'w-44 h-56 scale-105 z-10'
                      : 'w-36 h-48 opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => setActiveCard(index)}
                >
                  <img
                    src={card.image}
                    alt={card.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-500 ${
                    activeCard === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'
                  }`}>
                    <p className="text-white font-bold text-base tracking-wide uppercase">{card.label}</p>
                    <div className={`h-0.5 bg-primary mt-1 transition-all duration-500 ${
                      activeCard === index ? 'w-full' : 'w-0'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 ml-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index
                        ? 'w-8 h-2 bg-primary'
                        : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-white/60 font-mono text-sm">
              <span className="text-white text-2xl font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(slides.length).padStart(2, '0')}</span>
            </div>
          </div>

          <div className="mt-4 w-full bg-black/30 py-3 overflow-hidden">
            <div className="animate-scroll flex whitespace-nowrap">
              <span className="text-xs text-white/60 px-4 tracking-wider">
                Madagascar | Socotra Island | Faroe Islands | Bhutan | Myanmar | Laos | Georgia | Armenia | Azerbaijan | Kazakhstan | Kyrgyzstan | Uzbekistan | Tajikistan | Moldova | Belarus | North Macedonia | Albania | Kosovo | Montenegro | Bosnia | Serbia | Slovenia | Slovakia | Estonia | Latvia | Lithuania | Iceland | Malta | Cyprus | Luxembourg | Liechtenstein | Andorra | Monaco | San Marino | Vatican City | India | Nepal | Sri Lanka | Maldives | Bangladesh | Pakistan | Afghanistan | Iran | Iraq | Jordan | Syria | Lebanon | Israel | Palestine | Turkey | Egypt | Sudan | Ethiopia | Kenya | Tanzania | Uganda | Rwanda | Zambia | Zimbabwe | Botswana | Namibia | South Africa | Mozambique | Malawi | Seychelles | Mauritius
              </span>
              <span className="text-xs text-white/60 px-4 tracking-wider">
                Madagascar | Socotra Island | Faroe Islands | Bhutan | Myanmar | Laos | Georgia | Armenia | Azerbaijan | Kazakhstan | Kyrgyzstan | Uzbekistan | Tajikistan | Moldova | Belarus | North Macedonia | Albania | Kosovo | Montenegro | Bosnia | Serbia | Slovenia | Slovakia | Estonia | Latvia | Lithuania | Iceland | Malta | Cyprus | Luxembourg | Liechtenstein | Andorra | Monaco | San Marino | Vatican City | India | Nepal | Sri Lanka | Maldives | Bangladesh | Pakistan | Afghanistan | Iran | Iraq | Jordan | Syria | Lebanon | Israel | Palestine | Turkey | Egypt | Sudan | Ethiopia | Kenya | Tanzania | Uganda | Rwanda | Zambia | Zimbabwe | Botswana | Namibia | South Africa | Mozambique | Malawi | Seychelles | Mauritius
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
