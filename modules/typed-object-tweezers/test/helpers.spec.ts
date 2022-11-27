import {getParentPath, getAlmostLastPart, getLastPart } from '../src';

const path = 'root.a.2.d.5';

describe('getParentPath', () => {
  it('should return the parent path', () => {
    expect(getParentPath(path)).toBe('root.a.2.d');
  });
});

describe('getAlmostLastPart', () => {
  it('should return the second to last part', () => {
    expect(getAlmostLastPart(path)).toBe('d');
  });
});

describe('getLastPart', () => {
  it('should return the last part', () => {
    expect(getLastPart(path)).toBe('5');
  });
});