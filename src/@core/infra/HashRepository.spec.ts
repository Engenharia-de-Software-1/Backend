import { HashRepository } from './HashRepository';

describe('Hash Repository tests', () => {
  it('should generate a hash', async () => {
    const hashRepository = new HashRepository();
    const hash = await hashRepository.generateHash('1234567');
    expect(hash).not.toBe('1234567');
  });

  it('should compare a text with a hash and return true', async () => {
    const hashRepository = new HashRepository();
    const hash = await hashRepository.generateHash('1234567');
    const match = await hashRepository.compareHash('1234567', hash);
    expect(match).toBeTruthy();
  });

  it('should compare a text with a hash and return false', async () => {
    const hashRepository = new HashRepository();
    const hash = await hashRepository.generateHash('1234567');
    const match = await hashRepository.compareHash('12345678', hash);
    expect(match).toBeFalsy();
  });
});
