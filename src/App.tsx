import { Provider } from 'react-redux';

import { Router } from './components';
import { store } from './store';
import './style/index.scss';
import './style/fonts.scss';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export { App };
