import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruck, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CustomerSlide {
  title: string;
  description: string;
  content: string;
}

const customerSlides: CustomerSlide[] = [
  {
    title: "Manufacturers (50–500 FTE)",
    description: "Balancing inventory and production runs.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Wholesale & Distribution",
    description: "Firms chasing faster fulfilment.",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    title: "3PLs & Last‑Mile Couriers",
    description: "Operating 20–200 vehicle fleets.",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
  },
  {
    title: "E‑Commerce Retailers",
    description: "Managing in‑house warehouses and returns.",
    content:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
  {
    title: "Owner‑Operators",
    description: "Expanding regional freight networks in ANZ & USA.",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
];

export default function CustomerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % customerSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % customerSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + customerSlides.length) % customerSlides.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative max-w-5xl mx-auto px-16">
      {/* Left Arrow - Positioned outside container */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-primary-600 p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-30 border border-gray-200"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow - Positioned outside container */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-primary-600 p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-30 border border-gray-200"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12"
          >
            <div className="flex items-center mb-6">
              <FaTruck className="w-8 h-8 text-primary-600 mr-4" />
              <div>
                <h3 className="text-2xl font-semibold text-primary-800 mb-2">
                  {customerSlides[currentSlide].title}
                </h3>
                <p className="text-primary-600 font-medium">
                  {customerSlides[currentSlide].description}
                </p>
              </div>
            </div>

            <div className="prose prose-lg text-gray-600 leading-relaxed">
              <p>{customerSlides[currentSlide].content}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {customerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-primary-600 scale-125"
                : "bg-primary-200 hover:bg-primary-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-4 text-sm text-gray-500">
        {currentSlide + 1} of {customerSlides.length}
      </div>
    </div>
  );
}
