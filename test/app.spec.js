import { expect } from 'chai';
import '../src/components/HelloWorld';

describe('Component Comment', () => {
  const component = document.createElement('hello-world');

  it('Should have an author named Jacoh', () => {
    const actual = component.id;
    const expected = 'Hello-World!';

    expect(actual).to.be.equal(expected);
  });
});
