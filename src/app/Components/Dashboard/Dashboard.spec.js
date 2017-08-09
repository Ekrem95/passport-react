import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

const wrapper = mount(
  <BrowserRouter>
    <Dashboard history={[]} />
  </BrowserRouter>
);

test('has elements', () => {
  expect(wrapper.find('div')).toHaveLength(4);
  expect(wrapper.find('div.dashboard')).toHaveLength(1);
  expect(wrapper.find('div.content')).toHaveLength(1);
  expect(wrapper.find('div#dashboard-content')).toHaveLength(1);
  expect(wrapper.find('p')).toHaveLength(1);
  expect(wrapper.find('Link')).toHaveLength(1);
  expect(wrapper.find('br')).toHaveLength(1);
  expect(wrapper.find('textarea')).toHaveLength(1);
});

test('condition dependent', () => {
    sinon.spy(Dashboard.prototype, 'componentDidMount');
    sinon.spy(Dashboard.prototype, 'componentWillMount');
    const wrapper = mount(
    <BrowserRouter>
      <Dashboard history={[]} />
    </BrowserRouter>
    );
    expect(Dashboard.prototype.componentDidMount.calledOnce).toEqual(true);
    expect(Dashboard.prototype.componentWillMount.calledOnce).toEqual(true);

    expect(Dashboard.prototype.componentDidMount).toHaveProperty('callCount', 1);
    expect(Dashboard.prototype.componentWillMount).toHaveProperty('callCount', 1);
  });
test('functions', () => {
    expect(Dashboard.prototype.onChange).toHaveLength(1);
    expect(Dashboard.prototype.loadMore).toHaveLength(1);
    expect(Dashboard.prototype.onChange).toBeInstanceOf(Function);
    expect(Dashboard.prototype.loadMore).toBeInstanceOf(Function);
    expect(Dashboard.prototype.loadMoreButton).toBeInstanceOf(Function);
  });

// test('simulate click events', () => {
//   sinon.spy(Dashboard.prototype, 'loadMoreButton');
//
//   const wrapper = mount(
//     <BrowserRouter>
//       <Dashboard history={[]} />
//     </BrowserRouter>
//   );
//
//   wrapper.setState({ skip: 0, length: 100 });
//
// });
