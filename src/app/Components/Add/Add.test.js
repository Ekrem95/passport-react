import React from 'react';
import { shallow } from 'enzyme';
import Add from './Add';

const add = shallow(
  <Add history={[]} />
);

test('has props', () => {
  expect(add.find('div')).toHaveLength(1);
  expect(add.find('h1')).toHaveLength(1);
  expect(add.find('form')).toHaveLength(1);
  expect(add.find('input')).toHaveLength(1);
  expect(add.find('textarea')).toHaveLength(2);
  expect(add.find('button')).toHaveLength(1);
});

test('has child props', () => {
  expect(add.find('div')).toHaveProperty('complexSelector');
  // expect(add.find('input')).hasOwnProperty('type', 'text');
  // expect(add.find('input')).hasOwnProperty('id', 'title');
  // expect(add.find('input')).hasOwnProperty('placeholder', 'eko');
});
