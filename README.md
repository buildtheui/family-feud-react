# Family Feud - React + TypeScript

A modern Family Feud game built with React, TypeScript, and Socket.io for real-time multiplayer gameplay.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start Socket.io server (Terminal 1)
npm run server

# Start Vite dev server (Terminal 2)
npm run dev
```

Or run both servers together:
```bash
npm run dev:all
```

Then open http://localhost:5173

## 🎮 How to Play

1. **Be the Host**: Click "Be the host" to control the game
2. **Flip Cards**: Click cards to reveal answers
3. **Score Points**: Flipped cards add to the board score
4. **Award Teams**: Transfer board score to Team 1 or Team 2
5. **Wrong Answers**: Click the X button to show wrong indicators
6. **New Question**: Load the next question

## 🛠️ Tech Stack

- ⚛️ React 19 + TypeScript
- ⚡ Vite 7
- 🎨 TailwindCSS 4
- 🔄 Zustand (State Management)
- ✨ Framer Motion (Animations)
- 🔌 Socket.io (Multiplayer)

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 📝 Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks (Socket.io, State)
│   ├── types/          # TypeScript definitions
│   └── data/           # Game questions JSON
├── server/
│   └── server.js       # Socket.io server
└── public/
    └── img/            # Game assets
```

See `walkthrough.md` in the project artifacts for detailed documentation.

## 🎯 Features

- ✅ Real-time multiplayer synchronization
- ✅ Smooth 3D card flip animations
- ✅ Animated score counters
- ✅ Full TypeScript type safety
- ✅ Responsive design
- ✅ Original game design preserved

## 📄 License

Original Family Feud game concept. This is a technical demonstration project.
