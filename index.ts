/*What is Redux

“this is just a structured process for updating a property on an object”. That is Redux. -Todd Motto

*/

interface Action {
  type: string;
  payload?: any; //? means optional
}

/* example
const action: Action = {
  type: 'ADD_TODO',
  payload: { label: 'Eat pizza,', complete: false },
};
 */

/*
The Store API
the store api has three public functions
Store.dispatch() - instructions, we intend to change the state tree.
Store.subscribe() - when the state tree changes we pass in the state down to the subscribe callback
Store.value() - This is a getter, tells us what the state of our store is.
 */

export class Store {
  private reducers: { [key: string]: Function }
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {})
  }

  /*
    return sthe state objectconsole.log(store.value);
   */
  get value() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action)
  }

  private reduce(state, action) {
    const newState = {}
    //calculate and return new state
    //newState.todos = this.reducers.todos(state.todos, action);
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action)
    }

    return newState
  }
  subscribe() {}
}

export const initialState = {
  data: [],
  loaded: false,
  loading: false
};

export function todosReducer(state = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'ADD_TODO': {
      const todo = action.payload
      const data = [...state.data, todo]

      return {
        ...state,
        data,
      }
    }
  }
  return state;
}

const reducers = {
  todo: todosReducer,
}
const store = new Store(reducers);
console.log("store", store.value);

store.dispatch({
  type: "ADD_TODO",
  payload: "Eat Pizza",
});

store.dispatch({
  type: "ADD_TODO",
  payload: "Shower",
});

console.log("store", JSON.stringify(store.value));
