import request from 'supertest';
import { serve } from './server.js';

describe('The TCP server', () => {
  let server = null;

  beforeEach(() => {
    // Deliberately omit the port so we get an available one.
    server = serve('localhost', undefined);
  });

  afterEach(() => {
    server.close();
  });

  // This test will fail initially since the project doesn't start with a
  // working HTTP server.
  it('connects on the default port', async () => {
    await request(server)
      .get('/')
      .expect(200);
  });

  it('responds with GET /HTML', async () => {
    const response = await request(server)
    .get('/')
    expect(response.text).toEqual(`<html>
<main>
    <h1> cat blog </h1>
        <article>
        
        <h2>my favorite cats</h2>
        <p>what kinds of sauces.</p>
    </article>
</main>
</html>`)
  });

  // Create GET /posts test
  it('respond with GET /posts', async () => {
    const response = await request(server)
    .get('/posts');
    expect(response.body).toEqual({
    name: 'Austin',
    location: 'Oregon'
    });
    console.log('line 47', response)
  })

  // Create POST /mail test
  it('responds with POST /mail', async () => {
    await request(server)
    .post('/mail')
    .expect(204);
  });

  it('receives a 404 when requesting an unknown resource/method', async () => {
    await request(server)
      .put('/fictitious')
      .expect(404);
  });
});
