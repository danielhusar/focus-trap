export const KEYS = {
  TAB: 9,
};

export const getAllFocusableElements = context =>
  Array.from(context.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'));

export const addEventListener = (node, eventName, callback) => {
  if (node.addEventListener) {
    node.addEventListener(eventName, callback);
  } else {
    node.attachEvent(`on${eventName}`, callback);
  }
};

export const removeEventListener = (node, eventName, callback) => {
  if (node.removeEventListener) {
    node.removeEventListener(eventName, callback);
  } else {
    node.detachEvent(`on${eventName}`, callback);
  }
};
