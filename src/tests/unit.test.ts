import { generateSecretKey } from '../helpers';

describe('generateSecretKey', () => {
  it('should generate a secret key with the correct format', () => {
    const secretKey = generateSecretKey();
    expect(secretKey).toHaveLength(36); 
    expect(secretKey).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i); 
  });
});
describe('generateSecretKey', () => {
    it('should generate a unique secret key', () => {
      const secretKey1 = generateSecretKey();
      const secretKey2 = generateSecretKey();
      expect(secretKey1).not.toEqual(secretKey2);
    });
  });
  describe('generateSecretKey', () => {
    it('should return a string', () => {
      const secretKey = generateSecretKey();
      expect(typeof secretKey).toBe('string');
    });
  });
  