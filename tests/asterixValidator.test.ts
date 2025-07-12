import { describe, it, expect } from 'vitest';
import { asterixValidator } from '../src/lib/asterixValidator';

describe('asterixValidator', () => {
  it('passes when number of asterisks is even', () => {
    expect(asterixValidator('hello**world')).toBe(true);
    expect(asterixValidator('no*stars*here**')).toBe(true);
  });

  it('fails when number of asterisks is odd', () => {
    expect(asterixValidator('one*star')).toBe('Number of * should be even');
    expect(asterixValidator('*odd')).toBe('Number of * should be even');
  });
});
