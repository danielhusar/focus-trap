import FocusTrap from '../index';

describe('FocusTrap', () => {
  test('traps focus with default options', () => {
    const first = { focus: jest.fn() };
    const last = { focus: jest.fn() };
    const trap = new FocusTrap({ node: document });
    trap.focusableElements = [first, 'foo', last];

    trap.handleFocusTrap({
      keyCode: 9,
      shiftKey: false,
      srcElement: last,
      preventDefault: jest.fn(),
    });
    expect(first.focus).toHaveBeenCalled();

    trap.handleFocusTrap({
      keyCode: 9,
      shiftKey: true,
      srcElement: first,
      preventDefault: jest.fn(),
    });
    expect(last.focus).toHaveBeenCalled();
  });

  test('traps focus with changed first element', () => {
    const first = { focus: jest.fn() };
    const last = { focus: jest.fn() };
    const firstEl = { focus: jest.fn() };
    const firstElement = () => firstEl;
    const trap = new FocusTrap({ node: document, firstElement });
    trap.focusableElements = [first, 'foo', last];

    trap.handleFocusTrap({
      keyCode: 9,
      shiftKey: false,
      srcElement: last,
      preventDefault: jest.fn(),
    });
    expect(first.focus).not.toHaveBeenCalled();
    expect(firstEl.focus).toHaveBeenCalled();
  });

  test('traps focus with changed last element', () => {
    const first = { focus: jest.fn() };
    const last = { focus: jest.fn() };
    const lastEl = { focus: jest.fn() };
    const lastElement = () => lastEl;
    const trap = new FocusTrap({ node: document, lastElement });
    trap.focusableElements = [first, 'foo', last];

    trap.handleFocusTrap({
      keyCode: 9,
      shiftKey: true,
      srcElement: first,
      preventDefault: jest.fn(),
    });
    expect(last.focus).not.toHaveBeenCalled();
    expect(lastEl.focus).toHaveBeenCalled();
  });

  test('skip starting trap for disableStartingTrap callback returning true', () => {
    const first = { focus: jest.fn() };
    const last = { focus: jest.fn() };
    const disableStartingTrap = () => true;
    const trap = new FocusTrap({ node: document, disableStartingTrap });
    trap.focusableElements = [first, 'foo', last];

    trap.handleFocusTrap({
      keyCode: 9,
      shiftKey: true,
      srcElement: first,
      preventDefault: jest.fn(),
    });
    expect(first.focus).not.toHaveBeenCalled();
    expect(last.focus).not.toHaveBeenCalled();
  });

  test('skip ending trap for disableEndingTrap callback returning true', () => {
    const first = { focus: jest.fn() };
    const last = { focus: jest.fn() };
    const disableEndingTrap = () => true;
    const trap = new FocusTrap({ node: document, disableEndingTrap });
    trap.focusableElements = [first, 'foo', last];

    trap.handleFocusTrap({
      keyCode: 9,
      shiftKey: false,
      srcElement: last,
      preventDefault: jest.fn(),
    });
    expect(first.focus).not.toHaveBeenCalled();
    expect(last.focus).not.toHaveBeenCalled();
  });
});
