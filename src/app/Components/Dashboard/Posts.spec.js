import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

// import { BrowserRouter } from 'react-router-dom';
import Posts, { loadMoreButton, changepassword } from './Posts';

const data = [
  {
    _id: '0',
    title: '0',
    desc: '0',
    src: '0',
  },
  {
    _id: '1',
    title: '1',
    desc: '1',
    src: '1',
  },
];

const wrapper = mount(
    <Posts
      posts={data}
      history={[]}
     />
);

test('has elements', () => {
  expect(wrapper.find('div')).toHaveLength(data.length * 2 + 1);
  expect(wrapper.find('h3')).toHaveLength(data.length);
  expect(wrapper.find('p')).toHaveLength(data.length);
  expect(wrapper.find('img')).toHaveLength(data.length);
  expect(wrapper.find('div.post')).toHaveLength(data.length);
  expect(wrapper.find('div.buttons')).toHaveLength(data.length);
  expect(wrapper.find('button')).toHaveLength(data.length * 2);
  expect(wrapper.find('button[type="button"]')).toHaveLength(data.length * 2);
});

test('Simulate click', () => {
  const onButtonClick = sinon.spy();
  const detailsButton =  wrapper.find('button').at(0);
  const editButton =  wrapper.find('button').at(1);

  // expect(detailsButton).toHaveProp('onClick');
  detailsButton.simulate('click');
  editButton.simulate('click');
});
