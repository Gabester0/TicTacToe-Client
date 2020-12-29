const staticTicTacToe = `Static Tic Tac Toe V1`;

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
    "/src/static/Cannon.png",
    "/src/static/mute.svg",
    "/src/static/Slice.png",
    "/src/static/StubbyCannon.png",
    "/src/static/volume.svg",
    "/src/static/vs-pop-1.mp3",
    "/src/static/wood-click-1.wav",
    "/src/utility/utilities.js",
]
/*
Why am I using the .pngs instead of the SVGs?  Test running with svgs
"/src/static/Cannon.svg",
"/src/static/StubbyCannon.svg",
Need a way to check if we are online and disable randomGame if not
Do we do this in the service worker or in menu?
*/

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticTicTacToe).then(cache =>{
            cache.addAll(assets)
        })
    )
})