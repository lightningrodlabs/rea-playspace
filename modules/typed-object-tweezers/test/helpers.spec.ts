import {getParentPath, getAlmostLastPart, getLastPart, getPathLength } from '../src';

const path = 'root.a.2.d.5';

describe('getParentPath', () => {
  it('should return the parent path', () => {
    expect(getParentPath(path)).toBe('root.a.2.d');
  });

  it('should return blank if blank', () => {
    expect(getParentPath('')).toBe('');
  });

  it('should return blank if only one part', () => {
    expect(getParentPath('a')).toBe('');
  });
});

describe('getAlmostLastPart', () => {
  it('should return the second to last part', () => {
    expect(getAlmostLastPart(path)).toBe('d');
  });

  it('should return blank if blank', () => {
    expect(getAlmostLastPart('')).toBe('');
  });

  it('should return blank if only one part', () => {
    expect(getAlmostLastPart('a')).toBe('');
  });
});

describe('getLastPart', () => {
  it('should return the last part', () => {
    expect(getLastPart(path)).toBe('5');
  });


  it('should return blank if blank', () => {
    expect(getLastPart('')).toBe('');
  });

  it('should return blank if only one part', () => {
    expect(getLastPart('a')).toBe('a');
  });
});

describe('getPathLength', () => {
  it('`a.b.c` should return 3', () => {
    expect(getPathLength('a.b.c')).toBe(3);
  });

  it('`a.b` should return 2', () => {
    expect(getPathLength('a.b')).toBe(2);
  });

  it('`a` should return 1', () => {
    expect(getPathLength('a')).toBe(1);
  });

  it('`` should return 0', () => {
    expect(getPathLength('')).toBe(0);
  });
});