import 'babel-polyfill';
import 'webcomponents.js';
import './components/HelloWorld';

// @flow
const str = 'Initialized component...';
const component = document.createElement('hello-world');

document.body.appendChild(component);
console.log(str);
