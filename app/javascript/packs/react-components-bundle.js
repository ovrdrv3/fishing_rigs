import ReactOnRails from 'react-on-rails';

import RecentActivity from '../components/RecentActivity';
import Builder from '../components/Builder';
import SearchHeader from '../components/SearchHeader';
import Sidebar from '../components/Sidebar';
import RigBuilder from '../components/RigBuilder';

// This is how react_on_rails can see the Home in the browser.
ReactOnRails.register({
  Builder,
  RecentActivity,
  SearchHeader,
  Sidebar,
  RigBuilder
});


