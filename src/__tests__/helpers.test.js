import { getAllFocusableElements } from '../helpers';

test('getAllFocusableElements returns all focusable elements', () => {
  document.body.innerHTML = `
    <div tabIndex="0"></div>
    <button></button>
    <a href="foo"></a>
    <select></select>
    <textarea></textarea>
    <input type="text"/>
  `;
  expect(getAllFocusableElements(document).length).toBe(6);
});

test('getAllFocusableElements filter out non focusable elements', () => {
  document.body.innerHTML = `
    <input type="file"/>
    <input type="hidden"/>
    <div tabIndex="-1"></div>
  `;
  expect(getAllFocusableElements(document).length).toBe(0);
});
