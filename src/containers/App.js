import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={BurgerBuilder}></Route>
            <Route path='/checkout' component={Checkout}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
