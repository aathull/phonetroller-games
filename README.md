# Phonetroller

> 🚧 **Project in progress.**

Play classic 1v1 games against your friends by using your phones as controllers!

## How it works

1. Open the game on a shared screen (a laptop or TV). It shows a QR code and a 4-letter party code.
2. Each player scans the QR code with their phone, or goes to `/joinparty` and types the code.
3. Your phone becomes your controller. Button presses are sent live to the shared screen over WebSockets.

## Current status

- [x] Host screen with a random party code and QR code
- [x] Join page for entering a code by hand
- [x] Phone controller page with a +1 button
- [x] WebSocket server that sends phone presses to the host screen
- [ ] Rooms tracked on the server (check codes, keep each party's messages separate)
- [ ] Two-player 1v1 slots
- [ ] Handling disconnects and reconnects
- [ ] First game

## Tech

- [Next.js](https://nextjs.org) + React + TypeScript
- Tailwind CSS
- [`ws`](https://github.com/websockets/ws) WebSocket server
- [`qrcode.react`](https://github.com/zpao/qrcode.react) for the join QR code

## Running locally

Run these in two terminals:

```bash
npm install
npm run dev      # web app on http://localhost:3000
```

```bash
npm run server   # WebSocket server on ws://localhost:4000
```

Open http://localhost:3000 for the host screen, then open the QR link in another window to join as a player.
