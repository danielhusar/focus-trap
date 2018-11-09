// @flow

import { addEventListener, removeEventListener, getAllFocusableElements, KEYS } from './helpers';

type Params = {
  node: Node,
  firstElement?: () => ?HTMLElement,
  lastElement?: () => ?HTMLElement,
  disableStartingTrap?: () => boolean,
  disableEndingTrap?: () => boolean,
};

export interface FocusTrapType {
  recalculateFocusableElements(): void;
  restore(): void;
}

const boolNoop = () => false;
const nullNoop = () => null;

export default class FocusTrap {
  node: Node;
  firstElement: () => ?HTMLElement;
  lastElement: () => ?HTMLElement;
  disableStartingTrap: () => boolean;
  disableEndingTrap: () => boolean;
  focusableElements: ?(HTMLElement[]) = null;

  constructor({ node, firstElement, lastElement, disableStartingTrap, disableEndingTrap }: Params) {
    this.node = node;
    this.firstElement = firstElement || nullNoop;
    this.lastElement = lastElement || nullNoop;
    this.disableStartingTrap = disableStartingTrap || boolNoop;
    this.disableEndingTrap = disableEndingTrap || boolNoop;
    this.focusableElements = getAllFocusableElements(this.node);
    addEventListener(this.node, 'keydown', this.handleFocusTrap);
  }

  handleFocusTrap = (event: KeyboardEvent) => {
    const { focusableElements, firstElement, lastElement, disableEndingTrap, disableStartingTrap } = this;
    if (!focusableElements || !focusableElements.length || event.keyCode !== KEYS.TAB) return;
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const isBackwards = event.shiftKey;

    if (last === event.srcElement && !isBackwards && !disableEndingTrap()) {
      event.preventDefault();
      return (firstElement() || first).focus();
    }
    if (first === event.srcElement && isBackwards && !disableStartingTrap()) {
      event.preventDefault();
      return (lastElement() || last).focus();
    }
  };

  recalculateFocusableElements() {
    this.focusableElements = getAllFocusableElements(this.node);
  }

  restore() {
    if (this.node) {
      removeEventListener(this.node, 'keydown', this.handleFocusTrap);
    }
  }
}
