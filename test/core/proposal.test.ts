import { describe, it, expect } from 'bun:test';
import { getAllProposals } from '../../src/core/fetch/proposal';
import { chainId, daoAddress } from '../constants';

describe('Proposal Routes', () => {
  it('should get all proposals', async () => {
    const proposals = await getAllProposals({
      chainId,
      address: daoAddress,
      apiUrl: 'http://localhost:3000',
    });
    expect(proposals).toBeDefined();
    expect(proposals.length).toBeGreaterThan(0);
  });
});
