import ReactOnRails from 'react-on-rails';

import Home from '../components/Home';
import RecentActivity from '../components/RecentActivity';
import Builder from '../components/Builder';
import Sidebar from '../components/Sidebar';

// This is how react_on_rails can see the Home in the browser.
ReactOnRails.register({
  Builder,
  Home,
  RecentActivity,
  Sidebar
});


