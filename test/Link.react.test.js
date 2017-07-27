import React from 'react';
import { shallow } from 'enzyme';
import AddPage from '../src/app/Components/Add';

test('Add has input', () => {
  const add = shallow(
    <AddPage />
  );

  expect(add.find('input')).toExist();
});
