import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { fetchExplore } from './actions/post_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    let preloadedState = {
      entities: {
        users: {[window.currentUser.id]: window.currentUser}
      },
      session: {id: window.currentUser.id},
    };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  window.store = store;
  window.fetchExplore = fetchExplore;
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
