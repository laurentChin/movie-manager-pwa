import React from 'react';
import { shallow } from 'enzyme';

import Format from './Format';

test('Format properly render the label props', () => {
  const component = shallow(
    <Format label="labelTest"/>
  );

  expect(component.text()).toEqual('labelTest');
});