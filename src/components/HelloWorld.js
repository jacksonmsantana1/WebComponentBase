import { createStore } from 'redux';
import { diff, patch, create, h } from 'virtual-dom'; /* eslint no-unused-vars:0 */

// Feature detection for old Shadow DOM v0.
// From ShadowTemplate.js
const USING_SHADOW_DOM_V0 = (typeof HTMLElement.prototype.createShadowRoot !== 'undefined');

class HelloWorld extends HTMLElement {

  static get defaultState() {
    return {
      id: 'Hello-World!',
    };
  }

  static reducer(state, action) {
    if (action == null || action.type == null) {
      return state;
    }

    if (state == null) {
      return HelloWorld.defaultState;
    }

    switch (action.type) {
      case 'SET_ID':
        return Object.assign({}, state, { id: action.id });

      default:
        return state;
    }
  }

  createdCallback() {
    // Initialize the component state and its Redux store.
    // Build the initial DOM root node and prepare for future virtual-dom patches.
    this.store = createStore(HelloWorld.reducer);
    this.store.subscribe(this.storeListener.bind(this));
    this.tree = this.render(HelloWorld.defaultState);
    this.rootNode = create(this.tree);

    const sRoot = USING_SHADOW_DOM_V0 ?
      this.createShadowRoot() :
      this.attachShadow({ mode: 'open' });
    sRoot.appendChild(this.rootNode);

    if (super.createdCallback) {
      super.createdCallback();
    }
  }

  storeListener() {
    const newTree = this.render(this.store.getState());
    const patches = diff(this.tree, newTree);
    this.rootNode = patch(this.rootNode, patches);
    this.tree = newTree;
  }

  set id(id) {
    this.store.dispatch({
      type: 'SET_ID',
      id,
    });
  }

  get id() {
    return this.store.getState().id;
  }

  render(state) {
    // Render the local dom for the component
    return (
      <div id="comment">
        <h2 id="commentAuthor">
          {state.id}
        </h2>
        <content></content>
      </div>
    );
  }
}

document.registerElement('hello-world', HelloWorld);
export default HelloWorld;

