import request from 'supertest';
import app from '../index'; 

describe('Integration tests for secret routes', () => {
  it('should create a new secret', async () => {
    const response = await request(app)
      .post('/api/secrets')
      .send({ message: 'This is a secret message' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('secretKey');
  });


  it('should return 404 for non-existing secret', async () => {
    const nonExistingSecretKey = 'non-existing-secret-key';
    const response = await request(app).get(`/api/secret/${nonExistingSecretKey}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Secret not found');
  });
});
