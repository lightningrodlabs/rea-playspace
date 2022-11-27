import { TreeStoreWithIndex } from '../src';
import { tree_test, TreeDef, ModelKinds, A, C} from 'data-providers/test/fixtures';
import { Pathed, PathFunctor} from 'data-providers';
import { GetPath } from 'typed-object-tweezers';

describe('TreeStoreWithIndex', () => {
  it('should create a snapshot when created', () => {
    const Tree = new TreeStoreWithIndex(tree_test, TreeDef, ModelKinds);
    expect(Tree.getSnapshot()).toEqual(tree_test);
  });

  it('should create a snapshot when updated', () => {
    const Tree = new TreeStoreWithIndex(tree_test, TreeDef, ModelKinds);
    const A = Tree.getCursor<Pathed<A>>('root.a.3')
    A.id = '4';
    Tree.setLocal(A);
    expect(GetPath(Tree.getSnapshot(), 'root.a.3')).toEqual(A);
  });

  it('should update the index when created', () => {
    const Tree = new TreeStoreWithIndex(tree_test, TreeDef, ModelKinds);
    const A = Tree.getById<Pathed<A>>('3');
    expect(GetPath(Tree.getSnapshot(), 'root.a.3')).toEqual(A);
  });

  it('should update the index when a new object is added', () => {
    const Tree = new TreeStoreWithIndex(tree_test, TreeDef, ModelKinds);
    const newC = new C({id: '13'})
    const pathedNewC = PathFunctor(newC, `root.a.3.c.${newC.id}`);
    Tree.setLocal(pathedNewC);
    const c = Tree.getById<Pathed<C>>('13');
    expect(Tree.getCursor<Pathed<C>>('root.a.3.c.13')).toEqual(c);
  });

  it('should update the index when an object is deleted', () => {
    const Tree = new TreeStoreWithIndex(tree_test, TreeDef, ModelKinds);
    const newC = new C({id: '13'})
    const path = `root.a.3.c.${newC.id}`;
    const pathedNewC = PathFunctor(newC, path);
    Tree.setLocal(pathedNewC);
    const c = Tree.getById<Pathed<C>>('13');
    expect(Tree.getCursor<Pathed<C>>('root.a.3.c.13')).toEqual(c);
    Tree.deleteLocal(path);
    expect(Tree.lookUpPath('13')).toBeUndefined();
  });

});