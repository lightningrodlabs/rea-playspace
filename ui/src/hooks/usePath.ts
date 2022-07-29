import React, {useContext, useState, useEffect, useReducer} from 'react';
import { initialState, reducer } from '../store/store';
export function useRoot(tree) {

export function usePath(path: string) {
  const [tree, dispatch] = useReducer(reducer,  initialState);

  return tree;
}
