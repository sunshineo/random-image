import express from "express";
import text2png from 'text2png';

const app = express();
const port = 3000; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    const images: string[] = []
    for (let i: number = 0; i < 5; i++) {
        // A 4 digits random number from 1000 to 9999
        const rand = Math.floor(Math.random() * 9000 + 1000)
        const buffer = text2png('' + rand, {color: 'blue'})
        images.push(buffer.toString('base64'))
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(images));
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
