# emttr

A tiny pub/sub utility in vanilla JavaScript.

[![npm](https://img.shields.io/npm/v/emttr)](https://www.npmjs.com/package/emttr)
[![bundle size](https://img.shields.io/badge/gzip-337B-brightgreen)](https://bundlejs.com/?q=emttr)
[![license](https://img.shields.io/npm/l/emttr)](./LICENSE)

## Features

- Simple pub/sub pattern
- Lightweight and dependency-free
- Duplicate subscription protection
- Easy unsubscribe handling
- Debug helpers for inspecting subscribers

## Installation

```bash
npm install emttr
```

## Usage

```js
import Emttr from "emttr";

const emttr = new Emttr();

const subscription = emttr.subscribe("user:login", data => {
  console.log("User logged in:", data);
});

emttr.publish("user:login", { name: "Geet" });

subscription.unsubscribe();
```

## API

### `new Emttr()`

Creates a new emitter instance.

### `subscribe(event, callback)`

Subscribes a callback to an event.

#### Parameters

- `event` - the event name
- `callback` - the function to run when the event is published

#### Returns

An object with an `unsubscribe()` method.

```js
const subscription = emttr.subscribe("message", data => {
  console.log(data);
});

subscription.unsubscribe();
```

### `publish(event, data)`

Publishes data to all subscribers of an event.

#### Parameters

- `event` - the event name
- `data` - optional data passed to each subscriber

```js
emttr.publish("message", { text: "Hello world" });
```

### `clear(event)`

Clears subscribers for a specific event.

```js
emttr.clear("message");
```

### `clear()`

Clears all subscribers.

```js
emttr.clear();
```

### `debug()`

Returns helper methods for inspecting subscriber state.

#### Example

```js
const debug = emttr.debug();

console.log(debug.count("message"));
console.log(debug.subscribers());
```

#### Available methods

- `count(event)` - returns the number of subscribers for an event
- `subscribers()` - returns a copied object of all subscribers

## Full Example

```js
import Emttr from "emttr";

const emttr = new Emttr();

const sub1 = emttr.subscribe("order:created", order => {
  console.log("Order received:", order);
});

const sub2 = emttr.subscribe("order:created", order => {
  console.log("Processing order:", order.id);
});

emttr.publish("order:created", { id: 101, item: "Pizza" });

console.log(emttr.debug().count("order:created")); // 2
console.log(emttr.debug().subscribers());

sub1.unsubscribe();
sub2.unsubscribe();
```

## License

MIT