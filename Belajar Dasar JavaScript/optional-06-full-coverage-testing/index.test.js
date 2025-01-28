import { describe, it, expect } from 'bun:test';
import sum from './index.js';


describe('Testing', () => {
    it('kalau selain number gabisa false', () => {
      expect(sum('a', 3)).toBe(0);
    });
  
    it('kalau negatif juga gabisa', () => {
      expect(sum(-1, 8)).toBe(0);
    });
  
    it('bisa penjumlahan', () => {
      expect(sum(2, 3)).toBe(5);
    });
  });
