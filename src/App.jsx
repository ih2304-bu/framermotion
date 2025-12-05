import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import './App.css'

// Just some sample data for our cards
const CARDS = [
  { id: 1, name: 'Tokyo', desc: 'Japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000' },
  { id: 2, name: 'Paris', desc: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000' },
  { id: 3, name: 'New York', desc: 'USA', img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1000' },
  { id: 4, name: 'Rome', desc: 'Italy', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000' }
]

// These control how cards appear and disappear
const cardVariants = {
  initial: { scale: 0.95, opacity: 0 }, // Start small and invisible
  animate: { scale: 1, opacity: 1 }, // Then grow to full size
  exit: (custom) => ({
    // Fly off left or right depending on swipe direction
    x: custom === 'left' ? -1000 : 1000,
    opacity: 0,
    transition: { duration: 0.3 } 
  })
}

const Card = ({ data, onSwipe, index }) => {
  // Track how far the card is dragged left or right
  const x = useMotionValue(0)
  
  // Make the card rotate when dragged (cool effect!)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  
  // Show "LIKE" text when swiping right
  const opacityLike = useTransform(x, [50, 150], [0, 1])
  
  // Show "NOPE" text when swiping left
  const opacityNope = useTransform(x, [-150, -50], [1, 0])

  const handleDragEnd = (event, info) => {
    // If they swiped right enough, count it as a like
    if (info.offset.x > 100) {
      onSwipe(data.id, 'right')
    } 
    // If they swiped left enough, count it as a nope
    else if (info.offset.x < -100) {
      onSwipe(data.id, 'left')
    }
  }

  return (
    <motion.div
      className="card"
      style={{ 
        x, 
        rotate, 
        backgroundImage: `url(${data.img})`,
        zIndex: index
      }}
      drag="x" // Makes card draggable horizontally
      dragConstraints={{ left: 0, right: 0 }} // Snaps back if you let go
      onDragEnd={handleDragEnd}
      
      variants={cardVariants} // Use the animations we defined earlier
      initial="initial"
      animate="animate"
      exit="exit"
      
      whileHover={{ cursor: "grabbing" }}
    >
      <div className="card-gradient" />
      <motion.div className="swipe-text like" style={{ opacity: opacityLike }}>
        LIKE
      </motion.div>
      <motion.div className="swipe-text nope" style={{ opacity: opacityNope }}>
        NOPE
      </motion.div>
      <div className="text-content">
        <h2>{data.name}</h2>
        <p>{data.desc}</p>
      </div>
    </motion.div>
  )
}

function App() {
  const [cards, setCards] = useState(CARDS)
  const [direction, setDirection] = useState(null) // Remember which way they swiped

  const handleSwipe = (id, dir) => {
    setDirection(dir) // Save the direction first
    // Wait a tiny bit before removing card so the animation looks smooth
    setTimeout(() => {
        setCards((prev) => prev.filter(card => card.id !== id))
    }, 10)
  }

  return (
    <div className="app">
      <h1>Swipe Destinations</h1>
      <div className="card-stack">
        {/* This handles the exit animations when cards are swiped away */}
        <AnimatePresence custom={direction}>
          {cards.map((card, index) => (
            // Only show the last 2 cards (for performance)
            index >= cards.length - 2 && (
              <Card 
                key={card.id} 
                data={card} 
                onSwipe={handleSwipe} 
                index={index}
              />
            )
          ))}
        </AnimatePresence>
        
        {cards.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666' }}>
            <h2>No more destinations!</h2>
            <button onClick={() => setCards(CARDS)} style={{ padding: '10px 20px', marginTop: '20px' }}>
              Reset Stack
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
