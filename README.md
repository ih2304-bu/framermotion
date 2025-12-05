# Framer Motion Swipe Cards

A Tinder-style swipe card app built with React and Framer Motion for my CS-391 Show and Tell presentation.

## What it does

- Swipe cards left or right to dismiss them
- Cards rotate and show "LIKE" or "NOPE" text as you drag
- Smooth animations when cards fly off screen
- Reset button to bring all cards back

## Technologies Used

- React 19
- Framer Motion
- Vite
- CSS

## How to run

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Features I'm demonstrating

- **motion components** - turning regular divs into animated elements
- **useMotionValue & useTransform** - tracking drag position and converting it to rotation/opacity
- **Drag gestures** - making cards draggable with constraints
- **AnimatePresence** - exit animations when cards are removed
- **Variants** - defining animation states

## What I learned

Getting the exit animations to work in the right direction was tricky. Had to use the `custom` prop in AnimatePresence to pass the swipe direction to the exit animation.

Also learned about useTransform which is pretty cool - it maps one value range to another, so dragging the card left/right automatically rotates it.
