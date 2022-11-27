import {toJSON, fieldsToJSON} from '../src';

describe('toJSON', () => {

});

describe('fieldsToJSON', () => {
  it('should properly mask fields while serializing', () => {
    class Hi {
      public name: string;
      public greeting: string;

      constructor(name: string, greeting: string) {
        this.name = name;
        this.greeting = greeting;
      }

      public toJSON(): {} {
        return fieldsToJSON(this, ['name','greeting']);
      }
    }

    const a = new Hi('Jill', 'Hello');
    // @ts-ignore
    a.hi = 'ehils';
    const s = JSON.stringify(a);
    expect(s).toBe('{"name":"Jill","greeting":"Hello"}');
  });
});