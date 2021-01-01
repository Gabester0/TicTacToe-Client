/* eslint-disable no-restricted-globals */
const staticTicTacToe = `Static Tic Tac Toe V2`;

const assets = [
    "/",
    "/public/index.html",
    "/src/App.js",
    "/src/AppStyles.js",
    "/src/index.js",
    "/src/index.css",
    "/src/LocalGame.js",
    "/src/components/board/Board.js",
    "/src/components/board/BoardStyles.js",
    "/src/components/confettiCannon/confettiCannon.js",
    "/src/components/confettiDot/ConfettiDot.js",
    "/src/components/confettiDotConfettiDotStyles.js",
    "/src/components/menu/Menu.js",
    "/src/components/menu/MenuStyles.js",
    "/src/components/square/Square.js",
    "/src/components/square/SquareStyles.js",
    "/src/static/mute.svg",
    "/src/static/StubbyCannon.svg",
    "/src/static/volume.svg",
    "/src/static/vs-pop-1.mp3",
    "/src/static/wood-click-1.wav",
    "/src/utility/utilities.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticTicTacToe).then(cache =>{
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent =>{
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res=>{
            return res || fetch(fetchEvent.request)
        })
    )
})