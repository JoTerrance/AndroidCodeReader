// store.js
import React, {createContext, useReducer} from 'react';

export const READ_ALL_RANGES = "readAllRanges";

const initialState = {ranges : []};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case READ_ALL_RANGES:
      const newStateReadAll = {...state, tokenId: action.tokenId, ranges: action.ranges};
      return newStateReadAll;
      default:
      throw new Error();
    };
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
