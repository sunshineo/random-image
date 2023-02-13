import express from "express";
import text2png from 'text2png';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
const port = 3000; // default port to listen

const server = http.createServer(app);

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws: WebSocket) => {

    // connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        // TODO: parse message for parameters
        const images: string[] = []
        for (let i: number = 0; i < 5; i++) {
            // A 4 digits random number from 1000 to 9999
            const rand = Math.floor(Math.random() * 9000 + 1000)
            const buffer = text2png('' + rand, {color: 'blue'})
            images.push(buffer.toString('base64'))
        }
        ws.send(JSON.stringify(images));
    });
});

// start the Express server
server.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
