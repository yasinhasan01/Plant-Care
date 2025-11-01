
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    title: 'Watering Wisdom',
    subtitle: 'Check soil moisture before watering. Overwatering is a common mistake that can lead to root rot.',
    image: 'https://picsum.photos/seed/slide1/1200/500',
  },
  {
    id: 2,
    title: 'Let There Be Light',
    subtitle: 'Most houseplants thrive in bright, indirect sunlight. Rotate your plants for even growth.',
    image: 'https://picsum.photos/seed/slide2/1200/500',
  },
  {
    id: 3,
    title: 'The Perfect Pot',
    subtitle: 'Ensure your pots have drainage holes. This prevents water from sitting at the bottom and damaging roots.',
    image: 'https://picsum.photos/seed/slide3/1200/500',
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const BannerSlider: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const imageIndex = ((page % slides.length) + slides.length) % slides.length;

  useEffect(() => {
    const timer = setTimeout(() => paginate(1), 5000);
    return () => clearTimeout(timer);
  }, [page]);


  return (
    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden flex justify-center items-center bg-gray-200 shadow-lg">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="absolute w-full h-full"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
            <img src={slides[imageIndex].image} className="w-full h-full object-cover" alt={slides[imageIndex].title}/>
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4">
                <h2 className="text-2xl md:text-4xl font-bold">{slides[imageIndex].title}</h2>
                <p className="mt-2 md:text-lg max-w-2xl">{slides[imageIndex].subtitle}</p>
            </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
        <button onClick={() => paginate(1)} className="bg-white/50 p-2 rounded-full text-gray-800 hover:bg-white transition">
          <FaChevronRight />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
        <button onClick={() => paginate(-1)} className="bg-white/50 p-2 rounded-full text-gray-800 hover:bg-white transition">
          <FaChevronLeft />
        </button>
      </div>
       <div className="absolute bottom-4 flex space-x-2 z-10">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${i === imageIndex ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
