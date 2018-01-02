# Build Vanilla Redux from scratch with Typescript

## This example is to help get a grasp on how TS works.

# What is Redux?
`“this is just a structured process for updating a property on an object”. That is Redux. -Todd Motto`

# Actions
## actions tell the object what to update and with what.
example action
```
const action: Action = {
  type: 'ADD_TODO',
  payload: { label: 'Eat pizza,', complete: false },
};
```

# Store
## The store api has three public functions
`Store.dispatch()`
instructions, we intend to change the state tree.

`Store.subscribe()`
when the state tree changes we pass in the state down to the subscribe callback

`Store.value()`
This is a getter, tells us what the state of our store is.

# Subscribers

These are functions that are stored in an array and when the state updates the function are called, witht the current state.
