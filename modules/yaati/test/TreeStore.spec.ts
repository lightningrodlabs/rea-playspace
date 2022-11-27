import { TreeStore } from '../src';
import { tree_test, A} from 'data-providers/test/fixtures';
import { Pathed } from 'data-providers';
import { GetPath } from 'typed-object-tweezers';

describe('TreeStore', () => {
  it('should create a snapshot when created', () => {
    const Tree = new TreeStore(tree_test);
    expect(Tree.getSnapshot()).toEqual(tree_test);
  });

  it('should create a snapshot when updated', () => {
    const Tree = new TreeStore(tree_test);
    const A = Tree.getCursor<Pathed<A>>('root.a.3')
    A.id = '4';
    Tree.setLocal(A);
    expect(GetPath(Tree.getSnapshot(), 'root.a.3')).toEqual(A);
  });

  it('should call the root subscriber if changed', (done) => {
    function subscriber () {
      try {
        done();
      } catch (e) {
        done(e);
      }
    };
    const Tree = new TreeStore(tree_test);
    Tree.subscribe(subscriber, 'root');
    const A = Tree.getCursor<Pathed<A>>('root.a.3')
    A.id = '4';
    Tree.setLocal(A);
    expect(GetPath(Tree.getSnapshot(), 'root.a.3')).toEqual(A);
  });

  it('should call the specific subscriber if changed', (done) => {
    function subscriber () {
      try {
        done();
      } catch (e) {
        done(e);
      }
    };
    const Tree = new TreeStore(tree_test);
    Tree.subscribe(subscriber, 'root.a.3');
    const A = Tree.getCursor<Pathed<A>>('root.a.3')
    A.id = '4';
    Tree.setLocal(A);
    expect(GetPath(Tree.getSnapshot(), 'root.a.3')).toEqual(A);
  });

  it('should call the root subscriber if an object is deleted', (done) => {
    function subscriber () {
      try {
        done();
      } catch (e) {
        done(e);
      }
    };
    const Tree = new TreeStore(tree_test);
    Tree.subscribe(subscriber, 'root');
    Tree.deleteLocal('root.a.3');
  });

  it('should call the specific subscriber if an object is deleted', (done) => {
    function subscriber () {
      try {
        done();
      } catch (e) {
        done(e);
      }
    };
    const Tree = new TreeStore(tree_test);
    Tree.subscribe(subscriber, 'root.a.3');
    Tree.deleteLocal('root.a.3');
  });
});