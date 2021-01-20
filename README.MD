# TrackedRef

TrackedRef is a custom React hook, that allows you to listen for chnages on the ref object.

### Installation

You can install TrackedRef from npm:

```
npm install @ncpa0cpl/tracked-ref
```

or download js file from `dist` folder in this repository and include it in your project manually.

### How to use

##### Define ref variable

Import `useTrackedRef` function from the installed package

```js
import { useTrackedRef } from "@ncpa0cpl/tracked-ref";
```

Create ref variable inside your React functional component

```js
const ref = useTrackedRef();
```

Value inside TrackedRef is accessed just like ordinary React ref

```js
// assign new value
ref.current = "value";
// read current value and print it to the console
console.log(ref.current);
```

##### To add a listener to the ref

```js
const listenerId = ref.addListener((newRef, remove) => {
  // do something when ref value changes
});
```

Callback passed to `.addListener()` function takes two arguments, first is the value which has been asigned to the ref object, second is a callback which if called will remove current listener from TrackedRef, this can be useful if you want to stop listening for changes after some condition is met.

##### To remove listener from ref

When creating a listener with `.addListener()`, an id of that listener is returned, use that id to remove it.

```js
ref.removeListener(listenerId);
```
