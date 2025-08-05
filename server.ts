import { createServer } from 'node:http';

const hostname = '127.0.0.1';
const port = Number(process.env.PORT);

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world!\n');
});

server.listen(port, hostname, () => {
    console.log(`Listening on ${hostname}:${port}`);
});
