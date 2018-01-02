interface Action {
  type: string;
  payload?: any; //the `?` means optional
}

export class Store {
  private reducers: { [key: string]: Function }
  private state: { [key: string]: any }
  private subscribers: Function[]
  private reduce(state, action) {
    const newState = {}
    //calculate and return new state
    //newState.todos = this.reducers.todos(state.todos, action);
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action)
    }

    return newState
  }

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = []
    this.reducers = reducers;
    this.state = this.reduce(initialState, {})
  }

  /*
    returns the state object
   */
  get value() {
    return this.state;
  }

  /*
  Public funtion to tell store to update with the reducers provided
   */
  dispatch(action) {
    this.state = this.reduce(this.state, action)
    this.subscribers.forEach((fn) => fn(this.value))
  }

  subscribe(fn) {
    this.subscribers = [ ...this.subscribers, fn ]
    fn(this.value)
    return () => {
      this.subscribers.filter(sub => sub !== fn)
    }
  }
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
