import ReactOnRails from 'react-on-rails';

import Home from '../components/Home';
import Builder from '../components/Builder';

// This is how react_on_rails can see the Home in the browser.
ReactOnRails.register({
  Builder,
  Home,
});
