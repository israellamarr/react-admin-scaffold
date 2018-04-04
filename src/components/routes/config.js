// @flow
import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import SubHeader from 'app/components/UI/sub-header';
import Login from 'app/components/containers/login';
import AddProduct from 'app/components/containers/add-product';
import ProductList from 'app/components/containers/product-list';
import CategoryList from 'app/components/containers/category-list';
import OrderList from 'app/components/containers/order-list';

export type RouteConfig = {
  name: string,
  render: () => React.Component,
  dependenciesReady: ( state: Object ) => boolean,
  path: string,
  navOpen: boolean,
  header?: () => React.Component,
  authorization?: boolean
}

const login = {
  name: 'Login',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <Login />
    </CSSTransitionGroup>
  ),
  path: '/login',
  dependenciesReady : state => {
    return true;
  }
};

const addProduct = {
  name: 'Add Product',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <AddProduct/>
    </CSSTransitionGroup>
  ),
  path: '/products/add',
  dependenciesReady : state => {
    return true;
  },
  authorization: true
};

const viewProducts = {
  name: 'View Products',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <ProductList/>
    </CSSTransitionGroup>
  ),
  header: () => (
    <SubHeader title={ 'Products' } />
  ),
  path: '/products/:activeDomain',
  dependenciesReady : state => {
    return true;
  },
  authorization: true
};

const viewCategories = {
  name: 'View Categories',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <CategoryList/>
    </CSSTransitionGroup>
  ),
  header: () => (
    <SubHeader title={ 'Categories' } />
  ),
  path: '/categories',
  dependenciesReady : state => {
    return true;
  },
  authorization: true
};

const viewOrders = {
  name: 'View Orders',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <OrderList/>
    </CSSTransitionGroup>
  ),
  header: () => (
    <SubHeader title={ 'Orders' } />
  ),
  path: '/orders/',
  dependenciesReady : state => {
    return true;
  },
  authorization: true
};

const links = [
  {
    name: 'Products',
    to: 'products',
    rootTo: 'all'
  },
  {
    name: 'Categories',
    to: 'categories'
  },
  {
    name: 'Orders',
    to: 'orders'
  }
];

const routes = [
  login,
  addProduct,
  viewProducts,
  viewCategories,
  viewOrders
];

export { routes, links };