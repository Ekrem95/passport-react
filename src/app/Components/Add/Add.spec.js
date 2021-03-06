import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Add from './Add';

const wrapper = mount(<Add history={[]} />);

test('Full Rendering API', () => {
    sinon.spy(Add.prototype, 'componentWillMount');
    const wrapper = mount(<Add history={[]} />);
    expect(Add.prototype.componentWillMount.calledOnce).toEqual(true);
  });

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
  expect(wrapper.ref('title').props().type).toEqual('text');
  expect(wrapper.ref('desc').props().placeholder).toEqual('Description');
  expect(wrapper.ref('src').prop('placeholder')).toEqual('Image Source');
});

test('check up', () => {
  const header =  wrapper.find('h1');
  const input =  wrapper.find('input');
  const description =  wrapper.ref('desc');
  const imageSource =  wrapper.ref('src');
  const button =  wrapper.find('button');
  const container = wrapper.find('div.add');

  expect(header.text()).toBe('Add');

  expect(input.props().type).toEqual('text');
  expect(wrapper.ref('title')).toEqual(input);
  expect(input.props().placeholder).toEqual('Title');

  expect(description.props().placeholder).toEqual('Description');
  expect(imageSource.props().placeholder).toEqual('Image Source');

  expect(button.text()).toBe('Add');
  expect(button.type()).toBe('button');

  expect(wrapper.containsAllMatchingElements([
    <h1>Add</h1>,
    <form>
      <input />
      <textarea></textarea>
      <textarea></textarea>
      <button>Add</button>
    </form>,
  ])).toEqual(true);
});

test('Simulate Function', () => {
  sinon.spy(Add.prototype, 'add');
  const wrapper = mount(<Add history={[]} />);
  const button =  wrapper.find('button');
  button.simulate('click');
  expect(Add.prototype.add.calledOnce).toEqual(true);
});

test('Full Rendering API', () => {
  expect(wrapper.find('div')).toEqual(wrapper.find('.add'));
  expect(wrapper.ref('title').prop('type')).toEqual('text');
});
