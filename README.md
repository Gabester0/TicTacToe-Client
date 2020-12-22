# Tic Tac Toe

[Tic Tac Toe]('https://eipper-tictactoe.herokuapp.com/')

## Built with:

#### Client

- React
- Styled Components
- React-Spring

#### Server

- Node.js
- Express
- Socket.io
- Redis

## About:

> Tic Tac Toe game that supports playing on a shared screen or against a random opponent online. The project originated as a simple Tic Tac Toe game with a single React front-end only where players shared a computer and took turns using the mouse. I built this in about 4 hours as a challenge while attending the [Full-Stack-Dojo](https://www.meetup.com/Full-Stack-Dev-Factory/) meetup. I later incorporated React-Spring to create a confetti cannon animation when a player won a game.

> This year, 2020, I have been learning Node.js, Express, and Socket.io and I wanted to incorporate a server into this project allow different players to connect for a game of Tic Tac Toe. I built an Express server using Socket.io for rapid server-client communication. Because my primary focus was creating a full-stack website with basic game functionality and exploring more complex uses of Socket.io I chose to use Redis as a temporary data-store during each game.

> Each connection from Socket.io is connectd to a socket room with only 1 player or added to a new room to wait for a second player. All of the game state exists in Redis and is emitted to the room when it is updated.

---

## Run client locally

1.  Clone repository
2.  Create a .env file inside the root client directory and add `REACT_APP_SERVER_URL='http://localhost:5005/'`
3.  Make sure you are in the client folder with `cd client`
4.  Run `yarn` to install Node modules
5.  Run `yarn run start` to start the client

## Remaining goals:

### - Pre-Deployment Items:

##### - Client

> - Update & uncomment line 15 of index.html with url of front-end
> - Update line 10 of RandomGame.js with url of deployed server
> - Updated line 3 of this README file with URL of deployed client

##### - Server

> - Comment out line 1 of server.js pre-deployment
