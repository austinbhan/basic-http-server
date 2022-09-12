import net from 'net';

export const serve = (host, port) => {
    const server = net.createServer((socket) => {
        console.log('A peer connected!')
    });
    server.listen(port, host, () => {
        console.log('A server is up!');
    });
    console.log('Attempting to start server');
    return server;
}