import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Format from './Format';

test('Format properly render the label props', () => {
  const component = shallow(
    <Format label="labelTest"/>
  );

  expect(component.text()).toEqual('labelTest');
});