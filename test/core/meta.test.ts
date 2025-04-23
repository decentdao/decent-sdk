import { describe, it, expect } from 'bun:test';
import { apiInfo, apiHealth, apiChains } from '../../src/core/fetch/meta';

describe('Meta Routes', () => {
  it('should get api info', async () => {
    const meta = await apiInfo({
      apiUrl: 'http://localhost:3000',
    });
    expect(meta).toBeDefined();
  });

  it('should get health', async () => {
    const health = await apiHealth({
      apiUrl: 'http://localhost:3000',
    });
    expect(health).toBeDefined();
  });

  it('should get chains', async () => {
    const chains = await apiChains({
      apiUrl: 'http://localhost:3000',
    });
    expect(chains).toEqual([1, 10, 137, 8453]);
  });
});

