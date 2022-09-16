import net from 'net';
import chalk from 'chalk'

const logOut = (...args) => console.log(chalk.cyan('[server]'), ...args);

export const serve = (host, port) => {
    const server = net.createServer((socket) => {
        logOut('A peer connected!')
        socket.on('data', (data) => {
            const dataStr = data.toString();
            logOut('Got data:', data.toString());
            const lines = dataStr.split('\n')
            const startLine = lines[0];
            const [ method, path ] = startLine.split(' ');
            if(method == 'GET' && path == '/') { // Create GET /
                const body = `<html>
<main>
    <h1> cat blog </h1>
        <article>
        
        <h2>my favorite cats</h2>
        <p>what kinds of sauces.</p>
    </article>
</main>
</html>`;
const payload = `HTTP/1.1 200 Ok
Content-Length: ${body.length}
Content-Type: text/html

${body}`;
console.log(payload);
socket.write(
    payload
)
            } else if (method == 'GET' && path == '/posts') { // Create GET /posts
                const object = {
                    name: 'Austin',
                    location: 'Oregon',
                }
                socket.write(
`HTTP/1.1 200 Ok
Content-Length: ${JSON.stringify(object).length}
Content-Type: application/json

${JSON.stringify(object)}`);
                console.log(`${JSON.stringify(object)}`);
            } else if (method == 'POST' && path == '/mail') { // Create POST /mail
                const body = `Fan mail accepted`;
                socket.write(`\
HTTP/1.1 204 No Content
Content-Type: text/plain
Content-Length: 0

`);
console.log(`${JSON.stringify(body)}`);
            }
            else { // Create 404 Error
                const body = `404`;
                socket.write(`\
HTTP/1.1 404 Not found
Content-Type: text/plain
Content-Length: ${body.length}

${body}
`);
console.log(`${JSON.stringify(body)}`)         
        }
        });
        socket.on('error', (err) => {
            logOut('Got error!', err);
        });
        socket.on('end', () => {
            logOut('end connection')
        })
    });
    server.listen(port, host, () => {
        logOut('My server is up!');
    });
    logOut('Attempting to start server');
    return server;
}