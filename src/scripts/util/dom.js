/**
 * Creates a name-spaced element with attributes and children. This method is used to create both
 * HTML elements as well as non-HTML elements that can include SVG or even XML.
 *
 * @param {string|bool=} namespace A string that specifies the namespace URI to associate with the
 * element.
 * @param {string} tag The element name that will be created.
 * @param {object} attributes Object of attributes with the attribute name as the key and value as
 * the property value.
 * @param {string|Element} children Inner HTML content of the element.
 * @returns {Element} The element that is created.
 */
function createElementNS(namespace, tag, attributes, ...children) {
  let element;

  if (namespace) {
    element = document.createElementNS(namespace, tag);
  } else {
    element = document.createElement(tag);
  }

  if (attributes) {
    setAttributes(element, attributes);
  }

  if (children) {
    appendChildren(element, ...children);
  }

  return element;
}

/**
 * Creates an HTML element with attributes and children.
 *
 * @param {string} tag The element name that will be created.
 * @param {object} attributes Object of attributes with the attribute name as the key and value as
 * the property value.
 * @param {string|Element} children Inner HTML content of the element.
 * @returns {Element} The element that is created.
 */
function createElement(tag, attributes, ...children) {
  return createElementNS(null, tag, attributes, ...children);
}

/**
 * Creates an SVG element with attributes and children.
 *
 * @param {string} tag The element name that will be created.
 * @param {object} attributes Object of attributes with the attribute name as the key and value as
 * the property value.
 * @param {string|Element} children Inner HTML content of the element.
 * @returns {Element} The element that is created.
 */
function createSVGElement(tag, attributes, ...children) {
  return createElementNS('http://www.w3.org/2000/svg', tag, attributes, ...children);
}

/**
 * Set any number of attributes of a given HTML element.
 *
 * @param {Element} element Element to set attributes of.
 * @param {object} elementAttributes Object of attributes with the attribute name as the key and
 * value as the property value.
 */
function setAttributes(element, elementAttributes) {
  for (const elementProperty of Object.keys(elementAttributes)) {
    let propertyName = elementProperty;
    let elementPropertyValue = elementAttributes[elementProperty];

    // Run property value function if it is a function.
    if (typeof elementPropertyValue === 'function') {
      elementPropertyValue = elementPropertyValue();
    }

    // Change the name of the property to class if the property given is className
    if (elementProperty === 'className') {
      propertyName = 'class';
    }

    // If an object was supplied for style, loop through all properties and set each style
    // property.
    if (elementProperty === 'style' && typeof elementPropertyValue === 'object') {
      for (const styleProperty of Object.keys(elementPropertyValue)) {
        element.style[styleProperty] = elementPropertyValue[styleProperty];
      }
      continue;
    }

    if (elementPropertyValue !== null) {
      element.setAttribute(propertyName, elementPropertyValue);
    }
  }
}

/**
 * Helper function to append any number of children onto given HTML element.
 *
 * @param {Element} parent Element to append children into.
 * @param {...Element|string} children Children to append into parent element.
 */
function appendChildren(parent, ...children) {
  children.forEach((child) => {
    if (child) {
      let childToAppend = child;

      // If child is not an object then create text node.
      if (typeof child !== 'object') {
        childToAppend = document.createTextNode(child);
      }

      parent.appendChild(childToAppend);
    }
  });
}

/**
 * Helper function that empties the contents of any given HTML element.
 *
 * @param {Element} element The element to empty.
 */
function emptyElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Removes the given element from its parent node.
 *
 * @param {Element} element The element to remove.
 * @return {Element} The element that has just been removed.
 */
function removeFromParent(element) {
  element.parentNode.removeChild(element);
  return element;
}

export default {
  createElement,
};