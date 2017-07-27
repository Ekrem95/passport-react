import React from 'react';
import { shallow } from 'enzyme';
import Add from './Add';

const wrapper = shallow(
  <Add history={[]} />
);

test('has props', () => {
  expect(wrapper.find('div.add')).toHaveLength(1);
  expect(wrapper.find('h1')).toHaveLength(1);
  expect(wrapper.find('form')).toHaveLength(1);
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('textarea')).toHaveLength(2);
  expect(wrapper.find('button')).toHaveLength(1);
});

test('toEqual', () => {
  expect(wrapper.find('div')).toEqual(wrapper.find('.add'));
  expect(wrapper.find('[type="text"]')).toEqual(wrapper.find('#title'));
  expect(wrapper.find('[placeholder="Description"]')).toEqual(wrapper.find('#desc'));
  expect(wrapper.find('[placeholder="Image Source"]')).toEqual(wrapper.find('#src'));
});

test('click', () => {
  const title = 'Title';
  const desc = 'Description';
  const src = 'Image Source';

  wrapper.find('button').simulate('click');
});
