# focus-trap

 > Add focus traps around elements.

## Install

using npm
```sh
npm install --save-dev @daniel.husar/focus-trap
```

or using yarn
```sh
yarn add @daniel.husar/focus-trap
```

## Usage

```javascript
import FocusTrap from '@daniel.husar/focus-trap';
// Setup trap
const trap = new FocusTrap({ node: document.querySelector('#my-trap') });
// Release trap
trap.restore();
```

### Constructor API
Constructor accept object with those properties:

```javascript
new FocusTrap({
  node: document.querySelector('#my-trap') }),
  firstElement: () => document.querySelector('#first-element'),
  lastElement: () => document.querySelector('#last-element'),
  disableStartingTrap: () => false,
  disableEndingTrap: () => false,
});
```

#### node

Type: `DOM element`

Default: `none`

Required: `true`

This is the DOM node you want to set-up focus trap around

#### firstElement

Type: `Function`

Default: `() => null`

Required: `none`

Function that returns element that will replace first element when focus will jump back at the start. Usefull when you want to connect 2 focus traps together. Will fallback to firstElement in focus trap if function returns falsy value.

#### lastElement

Type: `Function`

Default: `() => null`

Required: `none`

Function that returns element that will replace last element when focus will jump back at the end. Usefull when you want to connect 2 focus traps together. Will fallback to lastElement in focus trap if function returns falsy value.

#### disableStartingTrap

Type: `Function`

Default: `() => false`

Required: `none`

Function that returns boolean if the starting trap should be disabled.

#### disableEndingTrap

Type: `Function`

Default: `() => false`

Required: `none`

Function that can returns boolean if the ending trap should be disabled.

### Interface

#### recalculateFocusableElements

Type: `Function`

Recalculate focusable elements inside of your trap. Usefull if content of the node changes over time.

#### restore

Type: `Function`

Remove the focus trap from element.

## License

MIT © [Daniel Husar](https://github.com/danielhusar)
