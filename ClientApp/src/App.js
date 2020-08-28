import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home/Home';
import { UserDashboard } from './components/Dashboard/UserDashboard';

import './custom.css'

export const App = () => {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/user' component={UserDashboard} />
    </Layout>
  );
}
